const mongoose = require("mongoose");

/* UsersSchema will correspond to a collection in your MongoDB database. */
const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title."],
      unique: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: [true, "Please provide a price."]
    },
    thumbnail: {
      type: String
    },
    playlist: Array,
    authors: {
      type: String
    },
    languages: {
      type: String
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model("Courses", CourseSchema);
