const router = require("express").Router();
const authRoute = require("./auth");
const adminRoute = require("./admin");
const roleRoute = require("./role");
const doorDataRoute = require("./doorData");
const docsRoute = require("./docs");
const courses = require("./courses");
router.use("/auth", authRoute);
router.use("/admin", adminRoute);
router.use("/role", roleRoute);
router.use("/v1", docsRoute);
router.use("/doorData", doorDataRoute);
router.use("/courses", courses);

module.exports = router;
