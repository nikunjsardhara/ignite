const Admin = require("../models/Admin.js")
const {
  registerValidation,
  userEditValidation,
} = require("../utils/validation")
/**
 *  Get all documents of a Model
 *  @param {Object} req.params
 *  @returns {Object} Results with pagination
 */
const validation = {
  register: registerValidation,
  editUser: userEditValidation,
}

const handleValidation = (body, type) => {
  const { error } = validation[type](body)
  if (error) {
    return error.details[0].message
  } else {
    return null
  }
}

exports.list = async (req, res) => {
  if(!req.user.isSuperAdmin) return res.status(401).json({
    success: false,
    message: 'Not authorized'
  })
  const page = req.query.page || 1
  const limit = parseInt(req.query.items) || 10
  const skip = page * limit - limit
  try {
    //not equal condition is used for remove logged in user data from user list
    //  Query the database for a list of all results
    const resultsPromise = Admin.find({ removed: false, _id:{$ne : req.user._id} })
      .skip(skip)
      .limit(limit)
      .sort({ created: "desc" })
      .populate("role", "name permissions")
      .select('-password')

    // Counting the total documents
    const countPromise = Admin.countDocuments({ removed: false, _id:{$ne : req.user._id} })
    // Resolving both promises
    const [result, count] = await Promise.all([resultsPromise, countPromise])
    // Calculating total pages
    const pages = Math.ceil(count / limit)

    // Getting Pagination Object
    const pagination = { page, pages, count }
    if (count > 0) {
      return res.status(200).json({
        success: true,
        result,
        pagination,
        message: "Successfully found all data",
      })
    } else {
      return res.status(203).json({
        success: false,
        result: [],
        pagination,
        message: "Collection is Empty",
      })
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      result: [],
      message: "Oops there is an Error",
      e: e,
    })
  }
}

/**
 *  Creates a Single document by giving all necessary req.body fields
 *  @param {object} req.body
 *  @returns {string} Message
 */

exports.create = async (req, res) => {
  try {
    if(!req.user.isSuperAdmin) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    let { email, password } = req.body
    const msg = await handleValidation(req.body, "register")
    if (msg) {
      return res.status(400).json({
        success: false,
        result: null,
        message: msg,
      })
    }
    const existingAdmin = await Admin.findOne({ email: email })
    if (existingAdmin)
      return res.status(400).json({
        success: false,
        result: null,
        message: "An account with this email already exists.",
      })

    let newAdmin = new Admin()
    req.body.password = newAdmin.generateHash(password)

    let result = await new Admin(req.body).save()

    if (!result) {
      return res.status(403).json({
        success: false,
        result: null,
        message: "document couldn't save correctly",
      })
    }
    result = await result
      .populate("role", "name permissions")
      .execPopulate()
    return res.status(200).send({
      success: true,
      result: {
        _id: result._id,
        enabled: result.enabled,
        email: result.email,
        name: result.name,
        surname: result.surname,
        role: result.role,
      },
      message: "Admin document save correctly",
    })
  } catch (e) {
    return res.status(500).json({ success: false, message: e })
  }
}

/**
 *  Updates a Single document
 *  @param {object, string} (req.body, req.params.id)
 *  @returns {Document} Returns updated document
 */

exports.update = async (req, res) => {
  try {
    if(!req.user.isSuperAdmin) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    let { email, role, name, surname } = req.body
    const msg = await handleValidation(req.body, "editUser")
    if (msg) {
      return res.status(400).json({
        success: false,
        result: null,
        message: msg,
      })
    }
    const existingAdmin = await Admin.findOne({
      _id: { $ne: req.params.id },
      email: email,
    })
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." })
    }

    let updates = { role, email, name, surname }

    // Find document by id and updates with the required fields
    const result = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updates },
      {
        new: true, // return the new result instead of the old one
      }
    )
      .select('-password')
      .populate("role", "name permissions")
      .exec()

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No result found with given data",
      })
    }
    return res.status(200).json({
      success: true,
      result: result,
      message: "Admin data updated successfully",
    })
  } catch (e) {
    console.log("Error in update admin", e.message)
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
    })
  }
}

exports.deleteAdmin = async (req, res) => {
  try {
    if(!req.user.isSuperAdmin) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    var isRemoved = req.body.isDelete || false
    const user = await Admin.find({ _id: req.params.id }).exec()
    if (user.length) {
      isEnabled = req.body.isDelete ? false : !user[0].enabled
    }
    // Find the document by id and delete it
    const result = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      { removed: isRemoved, enabled: isEnabled },
      { new: true }
    )
      .select('-password')
      .exec()
    // If no results found, return document not found
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No Data found",
        // message: "No document found by this id: " + req.params.id,
      })
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: "Successfully Deleted",
      })
    }
  } catch {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
    })
  }
}

exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await Admin
      .findOne({ _id: req.user._id })
      .select('-password')
      .populate('role', 'name permissions')
    return res.status(200).json({ data: user })
  } catch (err) {
    return res.status(500).json({ error_msg: err.message })
  }
}

exports.getSingleUser = async (req, res) => {
  try {
    if(!req.user.isSuperAdmin) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    const user = await Admin.findOne({ _id: req.params.id })
      .select('-password')
      .populate('role', 'name permissions')
    if(!user) return res.status(404).json({ success: false, message: 'User not found' })
    return res.status(200).json({ data: user })
  } catch (err) {
    return res.status(500).json({ error_msg: err.message })
  }
}