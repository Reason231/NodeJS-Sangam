const Joi=require("joi")

const validateRegistration=(data)=>{
    const schema=Joi.object({
        username:Joi.string().min(3).max(30).alphanum().required().messages({
            "string.empty":"Username is required",
            "string.min":"Username should at least be 3 characters",
            "string.max":"Username cannot exceed 30 characters",
            "string.pattern.base":"Username can only contain letters,numbers and underscores"
        }),
        email:Joi.string().email({tlds:{allow:['com','net']}}).required().messages({
            "string.empty":"Email is required",
            "string.pattern.base":"Please enter a valid email"
        }),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({
            "string.empty":"Password is empty",
            "string.pattern.base":"Password must be at least 8 characters, one uppercase letter, one lowercase letter, and one number"
        })
    })

    return schema.validate(data)
}

const validateLogin=(data)=>{
      const schema=Joi.object({
        email:Joi.string().email({tlds:{allow:['com','net']}}).required().messages({
            "string.empty":"Email is required",
            "string.pattern.base":"Please enter a valid email"
        }),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({
            "string.empty":"Password is empty",
            "string.pattern.base":"Password must be at least 8 characters, one uppercase letter, one lowercase letter, and one number"
        })
    })

    return schema.validate(data)
}


const validateChangePassword=(data)=>{
   const schema = Joi.object({
    newPassword: Joi.string()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .required()
      .messages({
        "string.empty": "New password is required.",
        "string.pattern.base":
          "New Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
      }),
  }).unknown(true)  // data contains the "oldPassword" which we don't want to validate it so we ignore it;

  return schema.validate(data);
}
module.exports={validateRegistration,validateLogin,validateChangePassword}