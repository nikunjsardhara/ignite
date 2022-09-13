const express = require("express");
const router = express.Router();

//controllers:
const { newCourse ,allcourses,purchaseCourse} = require("../controllers/course/courses");

// path -> /auth/signin
router.get("/", allcourses);
router.post("/new-course", newCourse);
router.post('/purchase-course', purchaseCourse);

module.exports = router;
