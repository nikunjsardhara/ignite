const Role = require('../models/Role')
const { roleAddEditValidation } = require('../utils/validation')

const validator = {
  roleAdd: roleAddEditValidation,
  roleEdit: roleAddEditValidation
}

const handleValidation = (body, type) => {
  const { error } = validator[type](body)
  if (error) {
    return error.details[0].message
  } else {
    return null
  }
}

exports.addRole = async (req, res) => {
  try {
    if(!req.user.isSuperAdmin) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    const error = handleValidation(req.body, 'roleAdd')
    if(error) return res.status(400).json({
      success: false,
      result: null,
      message: error,
    })

    let newRole = await new Role(req.body).save()
    return res.status(201).json({
      success: true,
      result: newRole,
      message: 'Role added successfully'
    })
  } catch (e) {
    return res.status(500).json({ success: false, message: e })
  }
}

exports.getRole = async (req, res) => {
  try {
    if(!req.user.isSuperAdmin) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    const role = await Role
      .findOne({ _id: req.params.id })
      .select('-__v')

    return res.status(200).json({
      success: true,
      result: role,
      message: 'Role found'
    })    
  } catch (e) {
    return res.status(500).json({ success: false, message: e })
  }
}

exports.getAllRoles = async (req, res) => {
  try {
    if(!req.user.isSuperAdmin) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    const page = req.query.page || 1
    const limit = parseInt(req.query.items) || 5
    const skip = page * limit - limit
    //  Query the database for a list of all results
    const resultsPromise = await Role.find().select('-__v')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
    // Counting the total documents
    const countPromise = await Role.countDocuments()
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
    return res.status(500).json({ success: false, message: e })
  }
}

exports.editRole = async (req, res) => {
  try {
    if(!req.user.isSuperAdmin) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    const error = handleValidation(req.body, 'roleEdit')
    if(error) return res.status(400).json({
      success: false,
      result: null,
      message: error,
    })
    let { id: _id } = req.params
    let { name, permissions } = req.body
    let updatedRole = await Role
      .findOneAndUpdate({ _id }, { $set: { name, permissions } }, { new: true })
      .select('-__v')
      
    if(!updatedRole) return res.status(200).json({
      success: true,
      message: 'No role found'
    })

    return res.status(200).json({
      success: true,
      result: updatedRole,
      message: 'Role updated successfully'
    })
  } catch (e) {
    return res.status(500).json({ success: false, message: e })
  }
}

exports.deleteRole = async (req, res) => {
  try {
    if(!req.user.isSuperAdmin) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    const { id: _id } = req.params
    const { deletedCount } = await Role.deleteOne({ _id })
    return res.status(200).json({
      success: true,
      message: deletedCount ? 'Role deleted successfully' : 'No role found'
    })
  } catch (e) {
    return res.status(500).json({ success: false, message: e })
  }
}