/* eslint-disable no-underscore-dangle */
const router = require("express").Router()
const { verifiedFunction: ensureAuth } = require("../middlewares/verifyJwtToken")

const {
  create,
  list,
  update,
  deleteAdmin,
  getLoggedInUser,
  getSingleUser,
} = require("../controllers/adminController")

router.post("/register",ensureAuth, create)

router.get("/list",ensureAuth, list)

router.post("/update/:id",ensureAuth, update)

router.post("/delete/:id",ensureAuth, deleteAdmin)

router.get('/me', ensureAuth, getLoggedInUser)

router.get('/single/:id', ensureAuth, getSingleUser)

module.exports = router
