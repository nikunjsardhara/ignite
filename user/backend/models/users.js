const mongoose = require("mongoose");

/* UsersSchema will correspond to a collection in your MongoDB database. */
const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a username."],
      maxlength: [60, "Username cannot be more than 60 characters"],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"]
    },
    password: {
      type: String,
      required: [true, "Please provide a password."]
    },
    mobileNumber: {
      type: Number,
      required: [true, "Please provide a mobile number."],
      trim: true,
      min: [10, "Please provide at least 10 character."]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UsersSchema);
