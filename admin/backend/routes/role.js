const router = require('express').Router()
const { verifiedFunction: ensureAuth } = require("../middlewares/verifyJwtToken")

const { 
  addRole, 
  getRole, 
  getAllRoles, 
  editRole,
  deleteRole
} = require('../controllers/roleController')

router.get('', ensureAuth, getAllRoles)

router.post('/', ensureAuth, addRole)

router.get('/:id', ensureAuth, getRole)

router.put('/:id', ensureAuth, editRole)

router.delete('/:id', ensureAuth, deleteRole)

module.exports = router