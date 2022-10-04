const mongoose = require("mongoose");

/* UsersSchema will correspond to a collection in your MongoDB database. */
const UserCourses = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Types.ObjectId,
      required: [true, "Course id is not empty!"],
      ref: "Courses",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: [true, "User id is not empty!"],
      ref: "Users",
    },
    orderCreationId: {
      type: String,
      required: [true, "Order id is not empty!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserCourses", UserCourses);
