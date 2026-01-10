import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEllipsisV,
  FaHeart,
  FaRegHeart,
  FaRegComment,
} from "react-icons/fa";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const PostCard = ({ value }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(value.likes.length);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(value.comments || []);
  const [loading, setLoading] = useState(false);
  const {user} = UserData()
  const {likePost} = PostData()
  useEffect(()=>{
     for(let i = 0 ; i < value.likes.length ; i++){
       if(value.likes[i] === user._id){
 setLiked(value.likes.includes(user._id));
  setLikes(value.likes.length);
       }
     
     }
  },[value,user._id])
  /* =========================
     LIKE / UNLIKE
  ========================= */
  const toggleLike = async () => {
    if (liked) {
    setLikes((prev) => prev - 1);
  } else {
    setLikes((prev) => prev + 1);
  }

  setLiked(!liked);
  likePost(value._id);
  };

  /* =========================
     ADD COMMENT
  ========================= */
  const submitComment = async (e) => {
    e.preventDefault();
    // if (!comment.trim()) return;

    // try {
    //   const { data } = await axios.post(
    //     `http://localhost:3000/api/posts/${value._id}/comment`,
    //     { comment },
    //     { withCredentials: true }
    //   );

    //   setComments(data.comments);
    //   setComment("");
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="flex justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 py-6 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-4">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={value.owner.profilePic?.url}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-700"
            />
            <div>
              <p className="text-white font-medium">
                {value.owner.name}
              </p>
              <p className="text-gray-500 text-xs">
                {new Date(value.createdAt).toLocaleString()}(IST)
              </p>
            </div>
          </div>

          <button className="p-2 rounded-full text-gray-400 hover:bg-gray-800">
            <FaEllipsisV />
          </button>
        </div>

        {/* ================= CAPTION ================= */}
        {value.caption && (
          <p className="text-gray-300 text-sm mb-3">
            {value.caption}
          </p>
        )}

        {/* ================= IMAGE ================= */}
        <img
          src={value.post.url}
          alt="post"
          className="w-full h-60 object-cover rounded-xl border border-gray-800"
        />

        {/* ================= ACTIONS ================= */}
        <div className="mt-4 px-1">
          <div className="flex items-center gap-6">
            <button
              onClick={toggleLike}
              className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition"
            >
              {liked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
              <span className="text-sm">{likes}</span>
            </button>

            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition"
            >
              <FaRegComment />
              <span className="text-sm">
                {comments.length} Comment
              </span>
            </button>
          </div>

          {/* ================= COMMENT INPUT ================= */}
          {showCommentBox && (
            <form
              onSubmit={submitComment}
              className="mt-3 flex items-center gap-2"
            >
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Write a comment..."
                className="flex-1 bg-gray-800 text-white px-4 py-2.5 rounded-xl outline-none border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium"
              >
                Post
              </button>
            </form>
          )}

          {/* ================= COMMENTS ================= */}
          <hr className="my-4 border-gray-800" />
          <p className="text-gray-400 text-sm font-semibold mb-3">
            Comments
          </p>

          <div className="max-h-48 overflow-y-auto space-y-3 pr-1">
            {comments.length > 0 ? (
              comments.map((c) => (
                <Comment
                  key={c._id}
                  avatar={c.user.profilePic?.url}
                  name={c.user.name}
                  text={c.comment}
                  time={new Date(c.createdAt).toLocaleTimeString()}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No comments yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================
   COMMENT COMPONENT
========================= */
const Comment = ({ avatar, name, text, time }) => {
  return (
    <div className="flex items-start gap-3">
      <img
        src={avatar}
        alt="user"
        className="w-9 h-9 rounded-full object-cover border border-gray-700"
      />
      <div className="bg-gray-800 px-4 py-2.5 rounded-2xl max-w-[85%]">
        <div className="flex items-center gap-2">
          <p className="text-white text-sm font-semibold">
            {name}
          </p>
          <span className="text-gray-500 text-xs">
            {time}
          </span>
        </div>
        <p className="text-gray-300 text-sm mt-0.5">
          {text}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
