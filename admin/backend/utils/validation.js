const Joi = require("@hapi/joi")

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    surname: Joi.string().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().required(),
  })
  return schema.validate(data)
}

// User edit validation
const userEditValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    role: Joi.string().required(),
    surname: Joi.string().required(),
  })

  return schema.validate(data)
}

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })

  return schema.validate(data)
}

// token verifit validation
const tokenValidation = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
  })

  return schema.validate(data)
}

// token resend validation
const ensureEmailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
  })

  return schema.validate(data)
}

// pasword reset validation
const passwordResetValidation = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data)
}

// Password change validator
const passwordChangeValidation = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  })

  return schema.validate(data)
}

const roleAddEditValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().required()
  })
  return schema.validate(data)
}

const setDoorValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    attributes: Joi.string().required()
  })
  return schema.validate(data)
}

const updateDoorValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    attributes: Joi.array().required()
  })
  return schema.validate(data)
}

const approveDoorValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    isApproved: Joi.string().required()
  })
  return schema.validate(data)
}

module.exports = {
  loginValidation,
  registerValidation,
  tokenValidation,
  ensureEmailValidation,
  passwordResetValidation,
  passwordChangeValidation,
  userEditValidation,
  roleAddEditValidation,
  setDoorValidation,
  updateDoorValidation,
  approveDoorValidation
}
