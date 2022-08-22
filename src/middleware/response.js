
module.exports = async(req,res,next)=>{

    if (!res.payload){
        res.status(404).json({
            success: false,
            status:  404,
            msg:    'Route not found, nor payload provided.'
        })

        return next();
    }

    let response = {}

    response.status         = res.payload.status || 200,
    response.msg            = res.payload.msg    || ''
    response.body           = res.payload.body   || res.payload.data || res.payload

    // delete response.data?.status
    // delete response.data?.msg

    res.status(200).json(response)

    return next();
}
