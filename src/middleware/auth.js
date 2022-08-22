const jwt       = require('jsonwebtoken');

module.exports  = function (req, res, next) {
    
    let token = req.header('token') ? req.header('token') :   
                req.body.token      ? req.body.token      : null

    if (!token) return next({status:401,msg:'Unauthorized!, No Token Provided'});
    
    try {
        req.userToken = jwt.verify(token,getConfig('jwt_token'))
    }
    catch (ex) {
        // console.log(ex)
        return next({status:401,msg:'Unauthorized!, Invalid Token'})
    }

    // if (req.userinfo.ip != req.ip) return next({status:401,msg:'Your ip address has changed, please log-in again.'})

    return next();
};
