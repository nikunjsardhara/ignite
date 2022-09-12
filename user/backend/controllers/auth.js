const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// models
const Users = require("../models/users");

// Validation methods
const {
  loginValidation,
  signUpValidation
} = require("../utils/validators/validation");

const validation = {
  login: loginValidation,
  signup: signUpValidation
};

const handleValidation = (body, type) => {
  const { error } = validation[type](body);
  if (error) {
    return error.details[0].message;
  } else {
    return null;
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let error_validation = handleValidation(req.body, "login");

    if (error_validation) {
      return res
        .status(400)
        .json({ success: false, message: error_validation });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong password" });
    }
    user.password = null;
    const token = jwt.sign({ ...user }, `${process.env.JWT_TOKEN_SECRET}`);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      timestamp: Date.now()
    });
  } catch (error) {
    console.log("CATCH => ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;
    let error_validation = handleValidation(req.body, "signup");

    if (error_validation) {
      return res
        .status(400)
        .json({ success: false, message: error_validation });
    }

    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with email: " + email
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      name,
      email,
      password: hashPassword,
      mobileNumber
    });

    await newUser.save();
    newUser.password = null;
    const token = jwt.sign({ ...newUser }, `${process.env.JWT_TOKEN_SECRET}`);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      token: token,
      timestamp: Date.now()
    });
  } catch (error) {
    console.log("CATCH => ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
