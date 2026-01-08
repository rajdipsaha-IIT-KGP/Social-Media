const Post = require("../models/postModel");
const TryCatch = require("../utils/TryCatch");
const getDataUrl = require("../utils/urlGenerator");
const cloudinary = require("cloudinary");

/* =========================
   CREATE NEW POST / REEL
========================= */
const newPost = TryCatch(async (req, res) => {
  const { caption } = req.body;
  const ownerId = req.user._id;
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: "File is required",
    });
  }

  const fileURL = getDataUrl(file);
  const type = req.query.type || "post";

  const option =
    type === "reel"
      ? { resource_type: "video" }
      : {};

  const myCloud = await cloudinary.v2.uploader.upload(
    fileURL.content,
    option
  );

  const post = await Post.create({
    caption,
    post: {
      id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    type,
    owner: ownerId,
  });

  res.status(201).json({
    message: "Posted Successfully",
    post,
  });
});

/* =========================
   DELETE POST
========================= */
const deletePost = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "No post with this id",
    });
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  const options =
    post.type === "reel"
      ? { resource_type: "video" }
      : {};

  await cloudinary.v2.uploader.destroy(post.post.id, options);
  await post.deleteOne();

  res.json({
    message: "Post deleted",
  });
});

/* =========================
   GET ALL POSTS & REELS
========================= */
const getAllPosts = TryCatch(async (req, res) => {
  const posts = await Post.find({ type: "post" })
    .sort({ createdAt: -1 })
    .populate("owner", "-password")
    .populate({
      path: "comments.user",
      select: "-password",
    });

  const reels = await Post.find({ type: "reel" })
    .sort({ createdAt: -1 })
    .populate("owner", "-password")
    .populate({
      path: "comments.user",
      select: "-password",
    });

  res.json({
    posts,
    reels,
  });
});

/* =========================
   LIKE / UNLIKE POST
========================= */
const likeUnlikePost = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const userId = req.user._id;

  if (post.likes.includes(userId)) {
    // UNLIKE
    post.likes = post.likes.filter(
      (id) => !id.equals(userId)
    );
    await post.save();

    return res.status(200).json({
      message: "Post unliked",
    });
  } else {
    // LIKE
    post.likes.push(userId);
    await post.save();

    return res.status(200).json({
      message: "Post liked",
    });
  }
});

const commentPost = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const { comment } = req.body;

  if (!comment || comment.trim() === "") {
    return res.status(400).json({
      message: "Comment cannot be empty",
    });
  }

  post.comments.push({
    user: req.user._id,
    name: req.user.name, 
    comment: comment.trim(),
  });

  await post.save();

  res.status(200).json({
    message: "Comment added",
    comments: post.comments,
  });
});

const deleteComment = TryCatch(async(req,res)=>{
    const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  if(!req.body.commentId)
    return res.status(404).json({
message:"give Comment id "
})

const commentIndex = post.comments.findIndex(
    item => item._id.toString() === req.body.commentId.toString()
)

if(commentIndex === -1)
    res.status(400).json({
message:"Comment not found"
})

 const comment = post.comments[commentIndex]
  if(post.owner.toString() === req.user._id.toString() || comment.user.toString() === req.user._id.toString()){
   post.comments.splice(commentIndex,1)
await post.save();
return res.status(200).json({
    message:"Comment deleted"
})
  }
  return res.status(400).json({
    message:"Unauthorized"
  })
    
})
const editCpation = TryCatch(async(req,res)=>{
    const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  if(post.owner.toString() !== req.user._id.toString())
    return res.status(403).json({
   message:"You are not owner of this post"
    })

    post.caption = req.body.caption;
    await post.save();
    return res.status(200).json({
        message:"Caption changed"
    })
})
/* =========================
   EXPORTS
========================= */
module.exports = {
  newPost,
  deletePost,
  getAllPosts,
  likeUnlikePost,
  commentPost,
  deleteComment,
  editCpation

};
