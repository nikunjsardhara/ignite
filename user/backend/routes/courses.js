const express = require("express");
const router = express.Router();

//controllers:
const { newCourse ,allcourses,purchaseCourse,singleCourse} = require("../controllers/course/courses");

// path -> /auth/signin
router.get("/", allcourses);
router.get("/single", singleCourse);
router.post("/new-course", newCourse);
router.post('/purchase-course', purchaseCourse);

module.exports = router;
