const express = require("express");
const router = express.Router();

//controllers:
const { signIn, signUp } = require("../controllers/auth");

// path -> /auth/signin
router.post("/signin", signIn);
router.post("/signup", signUp);

module.exports = router;
