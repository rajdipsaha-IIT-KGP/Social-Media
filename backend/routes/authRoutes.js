const express = require('express')
const { registerUser, loginUser, logoutUser } = require('../controllers/authControllers')
const uploadFile = require('../middlewares/multer')
const router = express.Router()
router.post("/register",uploadFile,registerUser)
router.post('/login',loginUser)
router.get('/logoutUser',logoutUser)
module.exports = router