/* eslint-disable no-underscore-dangle */
const router = require("express").Router();
const {
  verifiedFunction: ensureAuth
} = require("../middlewares/verifyJwtToken");

const {
  addCourses,
  updateCourses,
  deleteCourses,
  getCourses,
  getCoursesById
} = require("../controllers/coursesControllers");

//Add New Coursesm
router.get("/getcourses", getCourses);
router.post("/add", ensureAuth, addCourses);
router.post("/update", ensureAuth, updateCourses);
router.post("/delete", ensureAuth, deleteCourses);
router.post("/getcourse", ensureAuth, getCoursesById);
module.exports = router;
