const express = require('express')
const router = express.Router()
const { getUsers, getUser, registerUser, updateUser, deleteUser, loginUser, getMe } = require('../controllers/userController')

router.get('/', getUsers)
router.post('/login', loginUser)
router.get('/me', getMe)
router.get('/:id', getUser)
router.post('/', registerUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router