import React, { useEffect, useState } from "react";
import {
  FaEllipsisH,
  FaHeart,
  FaRegHeart,
  FaRegComment,
} from "react-icons/fa";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import toast from "react-hot-toast";

const PostCard = ({ value }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const { user } = UserData();
  const { likePost, addComment } = PostData();

  useEffect(() => {
    setLiked(value.likes.includes(user._id));
    setLikes(value.likes.length);
  }, [value.likes, user._id]);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    likePost(value._id);
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Comment cannot be empty");
    addComment(value._id, comment);
    setComment("");
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-lg bg-[#0f172a] border border-gray-800 rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <img
              src={value.owner.profilePic?.url}
              className="w-11 h-11 rounded-full object-cover border border-gray-700"
              alt="avatar"
            />
            <div>
              <p className="text-white font-semibold">
                {value.owner.name}
              </p>
              <p className="text-gray-400 text-xs">
                {new Date(value.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <FaEllipsisH />
          </button>
        </div>

        {/* CAPTION */}
        {value.caption && (
          <p className="px-5 pb-3 text-gray-300 text-sm leading-relaxed">
            {value.caption}
          </p>
        )}

        {/* IMAGE */}
        <div className="relative">
          <img
            src={value.post.url}
            className="w-full max-h-[420px] object-cover"
            alt="post"
          />
        </div>

        {/* ACTION BAR */}
        <div className="flex items-center gap-6 px-5 py-4">
          <button
            onClick={toggleLike}
            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition"
          >
            {liked ? (
              <FaHeart className="text-red-500 scale-110" />
            ) : (
              <FaRegHeart className="scale-110" />
            )}
            <span className="text-sm font-medium">
              {likes}
            </span>
          </button>

          <button
            onClick={() => setShowCommentBox(!showCommentBox)}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition"
          >
            <FaRegComment className="scale-110" />
            <span className="text-sm font-medium">
              {value.comments.length}
            </span>
          </button>
        </div>

        {/* COMMENT INPUT */}
        {showCommentBox && (
          <form
            onSubmit={submitComment}
            className="px-5 pb-4 flex gap-3"
          >
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-[#020617] border border-gray-700 text-white px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full font-medium"
            >
              Post
            </button>
          </form>
        )}

        {/* COMMENTS */}
        <div className="px-5 pb-5 space-y-4 max-h-64 overflow-y-auto">
          {value.comments.length > 0 ? (
            value.comments.map((c) => (
              <div key={c._id} className="flex gap-3">
                <img
                  src={c.user.profilePic?.url}
                  className="w-9 h-9 rounded-full object-cover"
                  alt="user"
                />
                <div className="bg-[#020617] px-4 py-2.5 rounded-2xl">
                  <p className="text-white text-sm font-medium">
                    {c.user.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {c.comment}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              No comments yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
