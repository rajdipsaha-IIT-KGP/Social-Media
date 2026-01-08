const express = require('express')
const isAuth = require('../middlewares/isAuth')
const {
  newPost,
  deletePost,
  getAllPosts,
  likeUnlikePost,
  commentPost,
  deleteComment,
  editCpation
} = require('../controllers/postController')
const uploadFile = require('../middlewares/multer')

const router = express.Router()

// 1️⃣ Static routes
router.post('/new', isAuth, uploadFile, newPost)
router.get('/all', isAuth, getAllPosts)

// 2️⃣ Action routes
router.post('/like/:id', isAuth, likeUnlikePost)
router.post('/comment/:id', isAuth, commentPost)
router.delete('/comment/:id', isAuth, deleteComment)

// 3️⃣ Generic ID routes (LAST)
router.delete('/:id', isAuth, deletePost)
router.put('/:id', isAuth, editCpation)

module.exports = router
