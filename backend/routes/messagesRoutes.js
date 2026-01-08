const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const {
  sendMessage,
  getAllMessages,
  getAllChats
} = require('../controllers/messageControllers');

router.post('/', isAuth, sendMessage);
router.get('/chats', isAuth, getAllChats);
router.get('/:id', isAuth, getAllMessages);

module.exports = router;
