
module.exports  = function(err, req, res, next) {  

    errorLog(err)

    let response = {}

    response.status  = err.status || 500

    if      (typeof err.msg == 'string')    response.msg = err.msg || 'Sorry there was a system error, details of this error were sent to the technical team'
    else if (Array.isArray(err.msg))        response.msg = err.msg
    else                                    response.msg = 'Unknown Error Occurred'
    
    response.data = res.payload?.data ? res.payload?.data : res.payload || ''

    if (getConfig('debug')) response.error = err.error

    res.status(202).json(response)

    return next();
}