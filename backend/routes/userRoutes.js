const express = require('express')
const isAuth = require('../middlewares/isAuth')
const {
  myProfile,
  userProfile,
  followUnfollowUser,
  userFollowerandFollowingData,
  updateProfile,
  updatePassword,
  getAllUsers
} = require('../controllers/userControllers')
const uploadFile = require('../middlewares/multer')

const router = express.Router()

// 1️⃣ Specific routes first
router.get('/me', isAuth, myProfile)
router.get('/followdata/:id', isAuth, userFollowerandFollowingData)

// 2️⃣ Discovery / search routes
router.get('/all', isAuth, getAllUsers)   

// 3️⃣ Action-based routes
router.post('/follow/:id', isAuth, followUnfollowUser)

// 4️⃣ Generic dynamic routes LAST
router.get('/:id', isAuth, userProfile)
router.post('/:id', isAuth, updatePassword)
router.put('/:id', isAuth, uploadFile, updateProfile)

module.exports = router
