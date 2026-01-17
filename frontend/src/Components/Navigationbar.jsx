import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaComments,
  FaUser,
} from "react-icons/fa";

const Navigationbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-white"
      : "text-gray-400 hover:text-white";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800">
      <div className="flex justify-around items-center h-14">
        
        <Link to="/" className={`text-xl ${isActive("/")}`}>
          <FaHome />
        </Link>

        <Link to="/search" className={`text-xl ${isActive("/search")}`}>
          <FaSearch />
        </Link>

        <Link to="/create" className={`text-2xl ${isActive("/create")}`}>
          <FaPlusSquare />
        </Link>

        <Link to="/chat" className={`text-xl ${isActive("/chat")}`}>
          <FaComments />
        </Link>

        <Link to="/account" className={`text-xl ${isActive("/account")}`}>
          <FaUser />
        </Link>

      </div>
    </nav>
  );
};

export default Navigationbar;
