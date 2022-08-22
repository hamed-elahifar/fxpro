const router        = require('express').Router()
  ,   Joi           = require('joi')


router.post('/login',async(req,res,next) => {

      const schema  = Joi.object({
        identifier:   Joi.string().required(),
        password:     Joi.string().required(),
      })
      const {error:joiErr} = schema.validate(req.body,{abortEarly:false});
      if (joiErr) return next({status:400,msg:joiErr.details.map(x=>x.message)});
    
      const {identifier,password} = req.body

      // return user from DB
})

router.post('/register',async(req,res,next) => {

  const schema  = Joi.object({
    identifier:   Joi.string().required(),
    password:     Joi.string().required(),
  })
  const {error:joiErr} = schema.validate(req.body,{abortEarly:false});
  if (joiErr) return next({status:400,msg:joiErr.details.map(x=>x.message)});

  const {identifier,password} = req.body

  // return user from DB
})


module.exports = router;
