import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaUsers,
  FaUserFriends,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import { UserData } from "../context/UserContext";

const Account = ({ user }) => {
  const { logOut } = UserData();

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-brfrom-gray-900 to-black px-4">
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-xl p-6 text-white">

        {/* Profile Image */}
        <div className="flex justify-center -mt-20 mb-4">
          <img
            src={user.profilePic.url}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-gray-700 object-cover shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
            <FaUser className="text-blue-400" />
            {user.name}
          </h2>

          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            <FaEnvelope />
            {user.email}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-5"></div>

        {/* Stats */}
        <div className="flex justify-around text-center">
          <div>
            <p className="text-lg font-semibold flex items-center justify-center gap-2">
              <FaUsers className="text-blue-400" />
              {user.followers.length}
            </p>
            <p className="text-xs text-gray-400">Followers</p>
          </div>

          <div>
            <p className="text-lg font-semibold flex items-center justify-center gap-2">
              <FaUserFriends className="text-blue-400" />
              {user.followings.length}
            </p>
            <p className="text-xs text-gray-400">Following</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium">
            <FaEdit />
            Edit Profile
          </button>

          <button
            onClick={logOut}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition py-2 rounded-lg font-medium"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
