const path = require('path')
const getTimestamp = () => new Date().getTime()
const getUniqueId = () => Math.random().toString(36).split('.')[1]

module.exports = (file) => {
  const [_, extension] = file.mimetype.split("/")
  const ext = path.extname(file.originalname)
  return `${getTimestamp()}-${getUniqueId()}${ext ? ext : `.${extension}`}`
}