const sgMail = require('../config/sendGrid')

const sendEmail = (body) => sgMail.send(body)

module.exports = sendEmail