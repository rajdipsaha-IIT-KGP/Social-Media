const Chat = require("../models/chatModel");
const Messages = require("../models/Messages");
const TryCatch = require("../utils/TryCatch");

const sendMessage = TryCatch(async (req, res) => {
  const { receiverId, message } = req.body;
  const senderId = req.user._id;

  if (!receiverId || !message) {
    return res.status(400).json({
      message: "receiverId and message are required",
    });
  }

  let chat = await Chat.findOne({
    users: { $all: [senderId, receiverId] },
  });

  if (!chat) {
    chat = await Chat.create({
      users: [senderId, receiverId],
    });
  }

  const newMessage = await Messages.create({
    chatId: chat._id,
    sender: senderId,
    text: message,
  });

  chat.latestmessage = {
    text: message,
    sender: senderId,
  };

  await chat.save();

  return res.status(201).json(newMessage);
});

const getAllMessages = TryCatch(async (req, res) => {
  const { id } = req.params; // other user's id
  const userId = req.user._id;

  const chat = await Chat.findOne({
    users: { $all: [userId, id] },
  });

  if (!chat) {
    return res.status(404).json({
      message: "No chat found with this user",
    });
  }

  const messages = await Messages.find({ chatId: chat._id })
    .sort({ createdAt: 1 });

  return res.json(messages);
});

const getAllChats = TryCatch(async (req, res) => {
  const userId = req.user._id;

  const chats = await Chat.find({
    users: userId,
  }).sort({ updatedAt: -1 }).populate(
    {
        path:"users",
        select:"name profilePic"
    }

  );
   chats.forEach((e)=>{
    e.users = e.users.filter((user)=>user._id.toString() !== req.user._id)
   })
  return res.status(200).json(chats);
});

module.exports = {sendMessage,getAllMessages,getAllChats}