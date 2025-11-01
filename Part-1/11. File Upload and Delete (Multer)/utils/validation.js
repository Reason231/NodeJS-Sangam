const Joi=require('joi')

const validateRegistration=(data)=>{
    const schema=Joi.object({
        username:Joi.string().required().alphanum().min(3).max(30).messages({
            "string.empty":"Username is required",
            "string.min":"Username should be must at 3 characters long",
            "string.max":"Username cannot exceed 30 characters",
            "string.pattern.base":"Username can only contain letters, number and underscores"
        }),
        email:Joi.string().email({tlds:{allow:['com','net']}}).required().messages({
            "string.empty":"Password is required",
            "string.email":"Please enter a valid email"
        }),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({
            "string.empty":"Password is empty",
            "string.pattern.base":"Password must at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
        })
    })

    return schema.validate(data)
}

const validateLogin=(data)=>{
    const schema=Joi.object({
        email:Joi.string().email({tlds:{allow:['com','net']}}).required().messages({
            "string.empty":"Password is required",
            "string.email":"Please enter a valid email"
        }),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({
            "string.empty":"Password is empty",
            "string.pattern.base":"Password must at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
        })
    })

    return schema.validate(data)
}


module.exports={validateRegistration,validateLogin}