/* eslint-disable no-underscore-dangle */
const router = require("express").Router();
const {
  verifiedFunction: ensureAuth
} = require("../middlewares/verifyJwtToken");

const { addCourses ,updateCourses,deleteCourses} = require("../controllers/coursesControllers");

//Add New Courses
router.post("/add", ensureAuth, addCourses);
router.post("/update", ensureAuth, updateCourses);
router.post("/delete", ensureAuth, deleteCourses);
module.exports = router;
