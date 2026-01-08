const User = require("../models/userModel");
const TryCatch = require("../utils/TryCatch");
const getDataUrl = require("../utils/urlGenerator");
const cloudinary = require('cloudinary')
const bcrypt  = require('bcrypt')
const myProfile = TryCatch(async(req,res)=>{
     const user = await User.findById(req.user._id).select("-password")
     res.json(user)
})
const userProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password")
    if(!user)
        return res.status(404).json({
      message:"User not found"
        })
        return res.json(user);
})
const followUnfollowUser = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  const loggedInUser = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user._id.equals(loggedInUser._id)) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFollowing = user.followers.some(id =>
    id.equals(loggedInUser._id)
  );

  if (isFollowing) {
    loggedInUser.followings = loggedInUser.followings.filter(
      id => !id.equals(user._id)
    );

    user.followers = user.followers.filter(
      id => !id.equals(loggedInUser._id)
    );

    await loggedInUser.save();
    await user.save();

    return res.json({ message: "User Unfollowed" });
  } else {
    loggedInUser.followings.push(user._id);
    user.followers.push(loggedInUser._id);

    await loggedInUser.save();
    await user.save();

    return res.json({ message: "User Followed" });
  }
});

const userFollowerandFollowingData = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate([
      { path: "followers", select: "name email" },
      { path: "followings", select: "name email" }
    ]);

  res.json(user);
});
 const updateProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);
    const {name} = req.body;
    if(name){
        user.name = name;
    }
    const file = req.file;
    if(file){
        const fileURL = getDataUrl(file)
        await cloudinary.v2.uploader.destroy(user.profilePic.id)
        const myCloud = await cloudinary.v2.uploader.upload(fileURL.content)

        user.profilePic.id = myCloud.public_id;
        user.profilePic.url = myCloud.secure_url;
    }
    await user.save();
    return res.json({
        message:"profile updated"
    })
 })

 const updatePassword = TryCatch(async(req,res)=>{
     const { oldPassword, newPassword } = req.body;

    if(!newpassword || !oldpassword)
        return res.status(400).json({
    message:"Please type the new password"
 })

  const user = await User.findById(req.user._id);
  const isPasswordValid = await bcrypt.compare(oldpassword,user.password)
  if(!isPasswordValid)
    return res.status(400).json({
message:"Invalid credentials"
    })
    user.password = await bcrypt.hash(newpassword,10)
    await user.save();
    return res.status(200).json({
        message:"Password updated"
    })
 })
 const getAllUsers = TryCatch(async (req, res) => {
  const search = req.query.search || "";

  const users = await User.find({
    name: {
      $regex: search,
      $options: "i", 
    },
    _id: {
      $ne: req.user._id,
    },
  }).select("-password");

  res.json(users);
});


module.exports = {myProfile,userProfile,followUnfollowUser,userFollowerandFollowingData,updateProfile,updatePassword,getAllUsers}