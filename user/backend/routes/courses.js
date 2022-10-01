const express = require("express");
const router = express.Router();

//controllers:
const {
  newCourse,
  allcourses,
  purchaseCourse,
  singleCourse,
  orders,
  success
} = require("../controllers/course/courses");

// path -> /auth/signin
router.get("/", allcourses);
router.get("/single", singleCourse);
router.post("/new-course", newCourse);
router.post("/purchase-course", purchaseCourse);
router.post("/orders", orders);
router.post("/orders-success", success);

module.exports = router;
