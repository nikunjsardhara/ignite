const Door = require("../models/Door")
const DesignedDoor = require('../models/DesignedDoor')
const { wasabiBucket } = require('../config/wasabi')
const generateFileName = require('../helpers/generateFilename')
var mongoose = require('mongoose');
const wasabiBucketName = process.env.WASABI_BUCKET_NAME
const sendEmail = require('../helpers/sendEmail')
const fs = require('fs')

const { setDoorValidation, updateDoorValidation, approveDoorValidation } = require("../utils/validation");
const { DOOR_SUBMISSION_READ, DOOR_SUBMISSION_UPDATE, DOOR_SUBMISSION_DELETE } = require("../utils/permissions");

const validation = {
  setDoor: setDoorValidation,
  updateDoor: updateDoorValidation,
  approveDoor: approveDoorValidation
}

const handleValidation = (body, type) => {
  const { error } = validation[type](body)
  if (error) return error.details[0].message
  return null
}

const doorPermissionsMap = {
  'read': [DOOR_SUBMISSION_READ, DOOR_SUBMISSION_UPDATE, DOOR_SUBMISSION_DELETE],
  'update': [DOOR_SUBMISSION_UPDATE],
  'delete': [DOOR_SUBMISSION_DELETE],
  'approve': [DOOR_SUBMISSION_UPDATE],
}

const isPermitted = (action, permissions) => {
  const neededPermissions = doorPermissionsMap[action]
  return neededPermissions.some(perm => permissions.includes(perm))
}

const setDoorData = async (req, res) => {
  try {
    if(!req.file) return res.status(400).json({ success: false, message: 'Image file is required.' })

    const error = await handleValidation(req.body, "setDoor")
    if (error) {
      return res.status(400).json({
        success: false,
        result: null,
        message: error,
      })
    }
    const fileName = generateFileName(req.file)
    const { Location: filePath } = await wasabiBucket.upload({
      Key: fileName,
      Body: req.file.buffer,
      Bucket: `${wasabiBucketName}/doors`,
      ACL: 'public-read'
    }).promise()
    const data = {
      fileName,
      attributes: JSON.parse(req.body.attributes),
      email: req.body.email,
      filePath
    }
    const door = new Door(data)
    await door.save()
    return res.status(200).json({ success: true, message: "Door data was submitted." })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ success: false, message: 'There is an error while uploading door data.' })
  }
}
const getDoorData = async (req, res) => {
  const { isSuperAdmin, permissions } = req.user
  if(!isSuperAdmin && !isPermitted('read', permissions)) return res.status(401).json({
    success: false,
    message: 'Not authorized'
  })
  const page = req.query.page || 1
  const limit = parseInt(req.query.items) || 5
  const skip = page * limit - limit
  try {
    //  Query the database for a list of all results
    const resultsPromise = await Door.find({ removed: false })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
    // Counting the total documents
    const countPromise = await Door.countDocuments({ removed: false })
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
const removeDoorData = async (req, res) =>{
  try {
    const { isSuperAdmin, permissions } = req.user
    if(!isSuperAdmin && !isPermitted('read', permissions)) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    if(!req.params._id) return res.status(400).json({success:false, message: 'Door data id not found.'})
    const updateDoc = {
      $set: {
        removed: true
      },
    };
    await Door.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params._id)}, updateDoc, { upsert: false })
    return res.status(200).json({success:true, message: 'Door Data Removed'})
  } catch (e) {
    return res.status(500).json({
      success: false,
      result: [],
      message: "Oops there is an Error",
      e: e,
    })
  }
}
const updateDoorData = async (req, res) =>{
  try {
    const { isSuperAdmin, permissions } = req.user
    if(!isSuperAdmin && !isPermitted('read', permissions)) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })

    const error = await handleValidation(req.body, 'updateDoor')
    if(error) return res.status(400).json({
      success: false,
      message: error
    })
    const updateDoc = {
      $set: {
        attributes : req.body.attributes
      },
    };

    //find document by id 
    // if document is available then update it otherwise send res.
    const document = await Door.find({_id: mongoose.Types.ObjectId(req.body._id)});
    if(!document.length) return res.status(400).json({success:false, message: 'Document not found with this id.'})
    
    await Door.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body._id) }, 
      updateDoc, 
      { upsert: false, new: true }
    ).exec((err, data)=> {
      if(err){
        return res.status(400).json({success:false, message: 'Attributes are not update.', error: err})
      }else{
        return res.status(200).json({success:true,result : data, message: 'Door Data updated.'})
      }
    }) 
  } catch (e) { 
    return res.status(500).json({
      success: false,
      result: [],
      message: "Oops there is an Error",
    })
  }
}
const approveDoor = async (req, res) =>{
  try {
    const { isSuperAdmin, permissions } = req.user
    if(!isSuperAdmin && !isPermitted('read', permissions)) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })

    const error = await handleValidation(req.body, 'approveDoor')
    if(error) return res.status(400).json({
      success: false,
      message: error
    })
    
    let isApproved = req.body.isApproved === 'true' ? 'Approved' : 'Disapproved'
    const updateDoc = {
      $set: {
        isApproved : req.body.isApproved === 'true' ? true : false
      },
    };
    //find document by id 
    // if document is available then update it otherwise send res.
    const document = await Door.find({_id: mongoose.Types.ObjectId(req.body._id)});
    if(!document.length) return res.status(400).json({success:false, message: 'Document not found with this ID.'})
    await Door.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body._id) }, 
      updateDoc, 
      { upsert: false, new: true }
    ).exec((err, data) => {
      if(err){
        return res.status(400).json({success:false, message: `Error in ${isApproved} the door.`, error: err})
      }else{
        return res.status(200).json({success:true,result : data, message: `Successfully ${isApproved} the door.`})
      }
    })
  } catch (e) { 
    return res.status(500).json({
      success: false,
      result: [],
      message: "Oops there is an Error",
    })
  }
}

const generateDoorDesign = async (req, res) => {
  try {
    if(!req.file) return res.status(400).json({
      success: false,
      message: 'PDF file is required'
    })
    const { email } = req.body
    if(!email) return res.status(400).json({
      success: false,
      message: 'Email is required'
    })

    const { buffer } = req.file
    const fileName = generateFileName(req.file)
    const { Location: filePath } = await wasabiBucket.upload({
      Key: fileName,
      Body: buffer,
      Bucket: `${wasabiBucketName}/designs`,
      ACL: 'public-read'
    }).promise()
    await DesignedDoor.create({
      email,
      fileName,
      filePath
    })

    let emailContent = fs.readFileSync('./assets/email-template.html', { encoding: 'utf-8' })
    emailContent = emailContent.replace('#doorDesignPath', filePath)
    await sendEmail({
      to: [{ email }],
      from: {
        email: process.env.SENDGRID_SENDER_ADDRESS,
        name: process.env.SENDGRID_SENDER_NAME
      },
      subject: 'Designed Door',
      content: [{
        type: 'text/html',
        value: emailContent
      }],
      attachments: [{
        content: buffer.toString('base64'),
        type: 'application/pdf',
        filename: 'a1-garage-door-service.pdf'
      }]
    })

    return res.status(200).json({
      success: true,
      message: 'PDF file received'
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Oops there is an Error",
    })
  }
}

const getDoorDesigns = async (req, res) => {
  try {
    const { isSuperAdmin, permissions } = req.user
    if(!isSuperAdmin && !isPermitted('read', permissions)) return res.status(401).json({
      success: false,
      message: 'Not authorized'
    })
    
    const page = req.query.page || 1
    const limit = parseInt(req.query.items) || 5
    const skip = page * limit - limit
    //  Query the database for a list of all results
    const resultsPromise = await DesignedDoor.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
    // Counting the total documents
    const countPromise = await DesignedDoor.countDocuments()
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
      message: 'Oops there is an error'
    })
  }
}

const removeDoorDesign = async (req, res) => {
  try {
    const { id } = req.params
    const design = await DesignedDoor.findOne({ _id: id })
    if(!design) return res.status(200).json({
      success: true,
      message: 'Door design not found'
    })
    
    await design.deleteOne()

    return res.status(200).json({
      success: true,
      message: 'Design removed successfully'
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: 'Oops there is an error'
    })
  }
}

module.exports = {
  setDoorData,
  getDoorData,
  removeDoorData,
  updateDoorData,
  approveDoor,
  generateDoorDesign,
  getDoorDesigns,
  removeDoorDesign
}
