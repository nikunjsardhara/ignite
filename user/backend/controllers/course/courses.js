// models
const Courses = require("../../models/courses");
const Users = require("../../models/users");
const UserCourses = require("../../models/userCourses");

exports.newCourse = async (req, res) => {
  try {
    const { title } = req.body;

    const found = await Courses.find({ title: title });

    if (found && found.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Course already exists" });
    }

    const staticCourse = {
      title: "Socket.io 2022",
      description: "Socket.io Description",
      price: 399,
      thumbnail:
        "https://i.ytimg.com/vi/ZKEqqIO7n-k/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDMU5Rccu5RLsr9ZyuJMg9N8X_j0g",
      playlist: [
        {
          title: "Introduction-2",
          video: "https://www.youtube.com/embed/7nafaH9SddU",
          resources: [
            "https://www.clickdimensions.com/links/TestPDFfile.pdf",
            "https://www.clickdimensions.com/links/TestPDFfile.pdf"
          ],
          time_duration: "1:00",
          description: "Introduction to NodeJS"
        },
        {
          title: "Introduction-2",
          video: "https://www.youtube.com/embed/7nafaH9SddU",
          resources: [],
          time_duration: "1:30",
          description: "Introduction to NodeJS"
        }
      ],
      authors: "John Doe",
      languages: "English"
    };

    const newCourse = new Courses(staticCourse);
    newCourse.save();
    return res.status(200).json({ success: true, message: "New course added" });
  } catch (e) {
    console.log("CATCH => ", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.singleCourse = async (req, res) => {
  try {
    const { id } = req.query;

    const courses = await Courses.find({ _id: id });
    if (!courses || courses.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Course not found" });
    }
    return res.status(200).json(courses[0]);
  } catch (e) {
    console.log("CATCH => ", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

exports.allcourses = async (req, res) => {
  try {
    const courses = await Courses.find({});
    return res.status(200).json({ success: true, courses });
  } catch (e) {
    console.log("CATCH => ", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};
exports.purchaseCourse = async (req, res) => {
  try {
    const { _id } = req.body;
    const course = await UserCourses.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "course_id",
          foreignField: "_id",
          as: "courses"
        }
      }
    ]);

    return res.status(200).json({ success: true, course });
  } catch (e) {
    console.log("CATCH => ", e);
    return res.status(500).json({ success: false, message: e.message });
  }
};
