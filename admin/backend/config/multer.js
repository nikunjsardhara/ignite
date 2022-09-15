const multer = require("multer")
const path = require("path")

const memoryStorage = multer.memoryStorage()
var filesize_limit = 2242880
const fileFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname)

  if (ext == ".png" || ext == ".jpg" || ext == ".gif" || ext == ".jpeg") {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true)
    } else {
      return cb(new Error("Only .gif, .png, .jpg and .jpeg format allowed!"))
    }
  }
}
const imageUpload = multer({
  fileFilter: fileFilter,
  storage: memoryStorage,
  limits: { fileSize: filesize_limit },
})

const pdfFilter = (req, file, cb) => {
  if(file.mimetype !== 'application/pdf') return cb(new Error('Only PDF files are allowed!'))
  return cb(null, true)
}
const pdfUpload = multer({
  storage: memoryStorage,
  fileFilter: pdfFilter
})

module.exports = {
  imageUpload,
  pdfUpload
}