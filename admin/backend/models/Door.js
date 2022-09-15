const mongoose = require("mongoose")
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const doorSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  attributes: {},
  removed: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
},
{timestamps:true})

module.exports = mongoose.model("Door", doorSchema)
