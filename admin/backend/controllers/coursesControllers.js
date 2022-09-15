// Modals
// Path: admin/backend/modals/coursesModals.js
const Courses = require("../models/Courses");

exports.addCourses = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // Check Course already exists or not
    const found = await Courses.find({ title: title });

    if (found && found.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Course already exists" });
    }

    const newCourse = new Courses({
      title,
      description,
      price
    });
    const course = await newCourse.save();
    return res
      .status(200)
      .json({ success: true, message: "New course added", course });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.updateCourses = async (req, res) => {
  try {
    console.log("Updating");
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.deleteCourses = async (req, res) => {
  try {
    console.log("Deleting");
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};
