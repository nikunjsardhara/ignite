// Modals
// Path: admin/backend/modals/coursesModals.js
const Courses = require("../models/Courses");
const { addCourseValidation } = require("../utils/validation");

// addCourseValidation
const validation = {
  addCourses: addCourseValidation
};

const handleValidation = (body, type) => {
  const { error } = validation[type](body);
  if (error) {
    return error.details[0].message;
  } else {
    return null;
  }
};

exports.addCourses = async (req, res) => {
  try {
    const { title } = req.body;

    const error = await handleValidation(req.body, "addCourses");
    if (error) {
      return res.status(400).json({
        success: false,
        message: error
      });
    }
    // Check Course already exists or not
    const found = await Courses.find({ title: title });

    if (found && found.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Course already exists" });
    }

    const newCourse = new Courses(req.body);
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
    const id = req.body.id;
    delete req.body.id;
    const resp = await Courses.findOneAndUpdate({ _id: id }, req.body);
    if (!resp) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found" });
    }
    return res.status(200).json({ success: true, message: "Course updated" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.deleteCourses = async (req, res) => {
  try {
    const course = await Courses.findOne({ _id: req.body.id });

    if (!course)
      return res.status(404).json({
        success: true,
        message: "No course found"
      });

    await course.deleteOne();
    console.log(course);

    return res.status(200).json({ success: true, message: "Course deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const { limit } = req.body;
    let skip = Number(limit) - 10;
    const courses = await Courses.find({}).limit(10).skip(skip);
    if (!courses) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found" });
    }
    return res.status(200).json({ success: true, courses });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.getCoursesById = async (req, res) => {
  try {
    const { id } = req.body;
    const courses = await Courses.find({ _id: id });
    if (!courses) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found" });
    }
    return res.status(200).json({ success: true, courses });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.searchCourses = async (req, res) => {
  try {
    const { word } = req.body;

    if (word.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No courses found" });
    }
    const courses = await Courses.find({
      title: {
        $regex: new RegExp(word, "i")
      }
    });

    if (!courses) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found" });
    }
    return res.status(200).json({ success: true, courses });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};
