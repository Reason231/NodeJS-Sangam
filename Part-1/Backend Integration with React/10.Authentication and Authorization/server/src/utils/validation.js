const Joi=require("joi")
const Regex=require('regex')




const validateRegistration=(data)=>{
    const schema=Joi.object({
        username:Joi.string().min(3).max(15).required(),
        email:Joi.string().min(5).max(35).pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password:Joi.string().min(3).max(15).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/).required()
    })

    return schema.validate(data)
}

const validateLogin=(data)=>{
    const schema=Joi.object({
         email:Joi.string().max(35).pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password:Joi.string().min(3).max(15).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/).required()
    })

    return schema.validate(data)
}

module.exports={validateRegistration,validateLogin}