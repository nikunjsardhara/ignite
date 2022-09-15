const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const designedDoorSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model('DesignedDoor', designedDoorSchema)