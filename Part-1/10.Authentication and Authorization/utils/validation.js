const Joi = require('joi');

const validateRegistration = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(5)
      .max(30)
      .pattern(/^[a-zA-Z0-9_]{5,20}$/)
      .required()
      .messages({
        "string.empty": "Username is required.",
        "string.min": "Username must be at least 5 characters long.",
        "string.max": "Username cannot exceed 30 characters.",
        "string.pattern.base": "Username can only contain letters, numbers, and underscores."
      }),

    email: Joi.string()
      .email()   // built-in email regex
      .required()
      .messages({
        "string.empty": "Email is required.",
        "string.email": "Please enter a valid email address."
      }),

    password: Joi.string()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .required()
      .messages({
        "string.empty": "Password is required.",
        "string.pattern.base":
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
      }),
  });

  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.empty": "Email is required.",
        "string.email": "Please enter a valid email address."
      }),

    password: Joi.string()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .required()
      .messages({
        "string.empty": "Password is required.",
        "string.pattern.base":
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
      }),
  });

  return schema.validate(data);
};

module.exports = { validateRegistration, validateLogin };
