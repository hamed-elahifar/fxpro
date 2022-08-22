
module.exports.sysAdmin = function(req,res,next) {

    if (req.userToken?.role != 'admin')
        return next({status:403,msg:'Forbidden!'});

    return next();
};


