const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const verifiedFunction = async(req, res, next)=>{
  // Gather the jwt access token from the request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    const isValidUser = await Admin.find({ removed: false, enabled: true, _id: verified._id})
    if (isValidUser.length < 1) return res.status(400).json({ error: "User not found or deactivated." })
 return next();
  } catch (error) {
    return res.status(400).send('Invalid token');
  }
}

function checkAdmin(req, res, next) {
  // Gather the jwt access token from the request header

  if (req.user.role === 'admin') {
    return next();
  }
  return res.status(401).send('Unauthorized');
}

module.exports = { verifiedFunction, checkAdmin };
