/* eslint-disable no-useless-return */
/* eslint-disable no-underscore-dangle */

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {
  loginValidation,
  tokenValidation,
  ensureEmailValidation,
  passwordResetValidation,
  passwordChangeValidation,
} = require("../utils/validation")
const randomTokenGen = require("../utils/generateToken")
const passwordEncrypt = require("../utils/passwordEncrypt")
const { getToken } = require("../services/Token.services")
const Admin = require("../models/Admin")

const validation = {
  login: loginValidation,
  verifyUser: tokenValidation,
  ensureEmail: ensureEmailValidation,
  passwordReset: passwordResetValidation,
  passwordChange: passwordChangeValidation,
}

const handleValidation = (body, type) => {
  const { error } = validation[type](body)
  if (error) {
    return error.details[0].message
  } else {
    return null
  }
}

const loginUser = async (req, res) => {
  // Validate data before creating a user
  const msg = await handleValidation(req.body, "login")
  if (msg) {
    return res.status(400).json({
      success: false,
      result: null,
      message: msg,
    })
  }

  try {
    //   Checking if the user is already in the db
    const user = await Admin.findOne({ removed: false, enabled: true, email: req.body.email}).populate('role', 'name permissions')
    if (!user) return res.status(400).json({ error: "User not found or deactivated." })
    
    //   Password check
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).json({ error_msg: "Invalid password" })
    //   Create and assign a token
    const { name, permissions } = user.role
    const token = jwt.sign(
      { _id: user._id, role: name, permissions, isSuperAdmin: user.isSuperAdmin },
      process.env.TOKEN_SECRET
    )
    return res.status(200).json({ access_token: token })
  } catch (err) {
    // return res.status(400).json({ error_msg: err.message });
    return res.status(500).json({ success: false, message: err })
  }
}

const verifyUserRegistration = async (req, res) => {
  // Validate the incoming data
  handleValidation(req.body, "verifyUser")
  try {
    const token = await getToken({ token: req.body.token })
    const user = await Admin.findOne({ email: req.body.email })

    if (user.isActive) {
      return res.status(400).json({ error_msg: "User already verified" })
    }

    // This should not even happen. I am checking if the user email matches the user id in the token
    if (!(token._userId !== user._id)) {
      return res.status(400).json({ error_msg: "Token does not match user" })
    }

    user.isActive = true
    await user.save()
    await token.remove()
    return res.status(200).json({ data: "success" })
  } catch (err) {
    return res.status(400).json({ error_msg: err.message })
  }
}

const resendVerificationToken = async (req, res) => {
  try {
    handleValidation(req.body, "ensureEmail")

    const { email } = req.body
    const user = await Admin.findOne({ email })
    if (user.isActive) {
      return res
        .status(400)
        .json({ error_msg: "This user is already verified" })
    }
    // Generate and send token
    const token = await randomTokenGen(user)
    // send email using the token to user
    return res.status(200).json({ data: "success" })
  } catch (err) {
    return res.status(400).json({ error_msg: err.message })
  }
}

const sendPasswordResetToken = async (req, res) => {
  try {
    handleValidation(req.body, "ensureEmail")

    const { email } = req.body
    const user = await Admin.findOne({ email })
    // Generate and send token
    const token = await randomTokenGen(user)
    // send email to user
    return res.status(200).json({ data: token })
  } catch (err) {
    return res.status(400).json({ error_msg: err.message })
  }
}

const passwordReset = async (req, res) => {
  try {
    handleValidation(req.body, "passwordReset")
    const { email, token: reqToken, password: newPassword } = req.body
    const token = await getToken({ token: reqToken })
    // User confimation
    const user = await Admin.findOne({ email })

    // Ensure new password not equals to old password
    const passwordCompare = await bcrypt.compare(newPassword, user.password)

    if (passwordCompare) {
      return res
        .status(400)
        .json({ error_msg: "You can't use this password again" })
    }
    user.password = await passwordEncrypt(req.body.password)
    await user.save()
    // Delete token if user is verified
    await token.remove()
    // Send an email to the user telling the password change successful
    return res.status(200).json({ data: "Success" })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error_msg: err.message })
  }
}

const changePassword = async (req, res) => {
  try {
    const { newPassword, oldPassword, admin } = req.body
    const user = await Admin.findOne({ _id: req.user._id })
    if (user.role === "admin") {
      return res.status(401).json({ error_msg: "Nice try" })
    }
    if (admin) {
      user.password = await passwordEncrypt(newPassword)
    } else {
      handleValidation(req.body, "passwordChange")

      if (newPassword === oldPassword) {
        return res.status(400).json({
          error_msg: "New and Current password is the same, use a new password",
        })
      }

      // Ensure old password is equal to db pass
      const validPass = await bcrypt.compare(oldPassword, user.password)

      if (!validPass) {
        return res.status(400).json({ error_msg: "Current password is wrong" })
      }
      user.password = await passwordEncrypt(newPassword)
    }
    // Ensure new password not equals to old password
    await user.save()
    return res.json("Success")
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error_msg: err.message })
  }
}

module.exports = {
  loginUser,
  verifyUserRegistration,
  resendVerificationToken,
  sendPasswordResetToken,
  passwordReset,
  changePassword,
}
