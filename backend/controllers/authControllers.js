const generateToken = require('../utils/generateToken');
const getDataUrl = require('../utils/urlGenerator');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const TryCatch = require('../utils/TryCatch');
const cloudinary = require('cloudinary').v2;

const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    const file = req.file;

    if (!name || !email || !password || !gender || !file) {
      return res.status(400).json({ message: "All fields required" });
    }

    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const fileURL = getDataUrl(file);

    const hashedPassword = await bcrypt.hash(password, 10);

    const myCloud = await cloudinary.uploader.upload(fileURL.content);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      profilePic: {
        id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    generateToken(user._id, res);

    user.password = undefined;

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error in registering user",
    });
  }
};

const loginUser = TryCatch(async(req,res)=>{
  const{email,password}=req.body;
  const user = await User.findOne({email})
  if(!user)
    return res.status(400).json({message:"Invalid email or password"});
  const isPasswordValid = await bcrypt.compare(password,user.password);
  if(!isPasswordValid)
    return res.status(400).json({message:"Invalid email or password"});
  generateToken(user._id,res)
  res.status(201).json({
     message:"Successfully Signed Up!",
     user,
  })
})

const logoutUser = TryCatch(async(req,res)=>{
  res.cookie("token","",{maxAge:0})
  res.json({
    message:"Logged Out Successfully"
  })
})

module.exports = { registerUser,loginUser,logoutUser };
