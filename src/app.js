const express           = require('express')
  ,   app               = express()
  ,   helmet            = require('helmet')
  ,   compression       = require('compression')
  ,   cors              = require('cors')
require('express-async-errors');


// const RateLimit = require("express-rate-limit");
// const RedisStore = require("rate-limit-redis");

// const limiter = new RateLimit({
// store: new RedisStore({
//     // see Configuration
// }),
// max: 100, // limit each IP to 100 requests per windowMs
// delayMs: 0, // disable delaying - full speed until the max limit is reached
// });


app
    .disable('x-powered-by')
    .enable ('trust proxy' )

    .use(express.urlencoded({extended:true}))
    .use(express.json({limit:'100kb'}))
    .use(cors())
    .use(helmet())
    .use(compression())
    .use(require('./middleware/JSONValidation'))
    .use(require('./middleware/httpLogger'))
    // .use(limiter)
    
    .use(express.static('static'))

    .use('/', require('./routes'))
    .use('*', require('./middleware/response'))
    .use(     require('./middleware/error'))


const port   = process.env.PORT || getConfig('PORT') || 3000;
const server = app.listen(port,() => {
    logger.info(`${getConfig('welcomeMessage')} ${port}`)
})

module.exports = server;