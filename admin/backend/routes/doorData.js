const { 
  setDoorData, 
  getDoorData, 
  removeDoorData, 
  updateDoorData, 
  approveDoor, 
  generateDoorDesign,
  getDoorDesigns,
  removeDoorDesign
} = require("../controllers/doorDataController")
const { verifiedFunction: ensureAuth } = require("../middlewares/verifyJwtToken")
const { imageUpload, pdfUpload } = require('../config/multer')
/* eslint-disable no-underscore-dangle */
const router = require("express").Router()

router.route("/setDoorData").post(imageUpload.single("door-image"), setDoorData)
router.route("/getDoorData").get(ensureAuth, getDoorData)
router.route("/updateDoorData").post(ensureAuth, updateDoorData)
router.route("/approvedDoor").post(ensureAuth, approveDoor)
router.route("/removeDoorData/:_id").delete(ensureAuth, removeDoorData)

router.route("/design").post(pdfUpload.single('pdf'), generateDoorDesign)
router.route("/design").get(ensureAuth, getDoorDesigns)
router.route("/design/:id").delete(ensureAuth, removeDoorDesign)

module.exports = router
