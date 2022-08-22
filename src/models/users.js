const mongoose          = require('mongoose')
const {mongoDB}         = require('../startup/mongodb')
const {sign}            = require('jsonwebtoken')
const bcrypt            = require('bcryptjs')
const {v4:uuidv4}       = require('uuid');

const userSchema = new mongoose.Schema({

    userID:{
        type:           String,
        default:        uuidv4,
    },
    username:{
        trim:           true,
        type:           String,
        maxlength:      30,
        unique:         true,
        index:          true,
        lowercase:      true,
        required:       true,
    },
    firstname:{
        trim:           true,
        type:           String,
        maxlength:      30,
        required:       true,
    },
    lastname:{
        trim:           true,
        type:           String,
        maxlength:      30,
        required:       true,
    },
    email:{
        trim:           true,
        type:           String,
        maxlength:      255,
        lowercase:      true,
        required:       true,
        unique:         true
    },
    password:{
        type:           String,
        required:       true,
        select:         false
    },
    role:{
        type:           String,
        enum:           ['admin','user']
    },
    active:{
        type:           Boolean,
        default:        true
    },
    enable:{
        type:           Boolean,
        default:        true
    },
    lastLoginDate:{
        type:           Date,
    },
    changePasswordDate:{
        type:           Date,
    },

},{
    timestamps:          true,
    // toObject:         {virtuals:true},
    toJSON:              {virtuals:true},
});

userSchema.index({userID:1,email:1},{unique:true,background:true});

// hash password
userSchema.pre('save',async function (next){
    if (this.isModified('password')){
        try{

            const salt    = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password,salt);

        } catch(err) {
            next(err)
        }
    }

    next();
});

// userSchema.pre('save',async function (next){});
// userSchema.post('init', function(doc) {});

userSchema.methods.generateAuthToken = function (ip) {
    // this should NOT be an arrow function => ()
    return sign({ 
            userID:         this.userID,
            email:          this.email,
            role:           this.role,
        },
        // privateKey,
        getConfig('jwt_token'),
        {
            expiresIn:      getConfig('jwt_ttl'),
            // algorithm:      'RS256'
        }
    );
}

userSchema.methods.validatePassword = async (password) => {
    return await bcrypt.compare(password,this.password);
}

const   User = mongoDB.model('users',userSchema,'users');

exports.User = User;