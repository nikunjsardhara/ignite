const Joi = require("joi");

// Login validation
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(3).required()
  });

  return schema.validate(data);
};

// SignUp validation
exports.signUpValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(8).required(),
    mobileNumber: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required([true, "Mobile number should not be empty."])
  });

  return schema.validate(data);
};
