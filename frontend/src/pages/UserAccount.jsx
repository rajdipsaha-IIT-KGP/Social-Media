import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaUsers,
  FaUserFriends,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";

import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../Components/PostCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserAccount = ({ user: loggedInUser }) => {
  const { logOut } = UserData();
  const { posts } = PostData();

  const { id } = useParams();

  const [user, setUser] = useState(null);          
  const [selectedIndex, setSelectedIndex] = useState(null);

  // ================= FETCH USER =================
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/users/${id}` 
        );
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, [id]); 
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  const isOwnProfile = loggedInUser?._id === user._id;

  const myPosts = posts?.filter(
    (post) => post.owner?._id === user._id
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black px-4 py-10 text-white min-h-screen">

      {/* ================= PROFILE CARD ================= */}
      <div className="max-w-sm mx-auto bg-gray-800 rounded-2xl shadow-xl p-6 pt-20 mb-12 relative">
        {/* Avatar */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <img
            src={user.profilePic?.url}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-gray-700 object-cover shadow-lg bg-gray-800"
          />
        </div>

        {/* Info */}
        <div className="text-center space-y-2 mt-4">
          <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
            <FaUser className="text-blue-400" />
            {user.name}
          </h2>

          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            <FaEnvelope />
            {user.email}
          </p>
        </div>

        <div className="border-t border-gray-700 my-5"></div>

        {/* Stats */}
        <div className="flex justify-around text-center">
          <div>
            <p className="text-lg font-semibold">
              {user.followers?.length || 0}
            </p>
            <p className="text-xs text-gray-400">Followers</p>
          </div>

          <div>
            <p className="text-lg font-semibold">
              {user.followings?.length || 0}
            </p>
            <p className="text-xs text-gray-400">Following</p>
          </div>

          <div>
            <p className="text-lg font-semibold">
              {myPosts?.length || 0}
            </p>
            <p className="text-xs text-gray-400">Posts</p>
          </div>
        </div>

       
        {isOwnProfile && (
          <div className="mt-6 space-y-3">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium">
              <FaEdit />
              Edit Profile
            </button>

            <button
              onClick={logOut}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-medium"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* ================= POSTS GRID ================= */}
      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Posts
        </h3>

        {myPosts && myPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {myPosts.map((post, index) => (
              <div
                key={post._id}
                onClick={() => setSelectedIndex(index)}
                className="cursor-pointer"
              >
                <div className="aspect-square bg-gray-800 overflow-hidden rounded">
                  <img
                    src={post.post?.url}
                    alt="post"
                    className="w-full h-full object-cover hover:opacity-80 transition"
                  />
                </div>

                {post.caption && (
                  <p className="mt-1 text-sm text-gray-300 line-clamp-2 font-semibold">
                    {post.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            No Posts Yet
          </p>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center overflow-hidden">

          {/* Close */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white text-3xl cursor-pointer z-50"
          >
            ✕
          </button>

          {/* Prev */}
          {selectedIndex > 0 && (
            <button
              onClick={() => setSelectedIndex((i) => i - 1)}
              className="absolute left-4 sm:left-10 text-white text-5xl cursor-pointer z-50"
            >
              ‹
            </button>
          )}

          {/* Scrollable Post */}
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <PostCard value={myPosts[selectedIndex]} />
          </div>

          {/* Next */}
          {selectedIndex < myPosts.length - 1 && (
            <button
              onClick={() => setSelectedIndex((i) => i + 1)}
              className="absolute right-4 sm:right-10 text-white text-5xl cursor-pointer z-50"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAccount;
