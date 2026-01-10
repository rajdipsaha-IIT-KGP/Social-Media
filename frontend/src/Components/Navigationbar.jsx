import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaPlus,
  FaBars,
  FaTimes,
  FaSearch,
  FaComments,
} from "react-icons/fa";

const Navigationbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const activeClass = (path) =>
    location.pathname === path
      ? "bg-gray-800 text-blue-400"
      : "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 bg-gray-900 text-white rounded-full shadow-lg"
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Slidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 z-50
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <h2 className="text-white text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="mt-4 flex flex-col gap-1 px-3">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg ${activeClass("/")}`}
          >
            <FaHome />
            <span>Home</span>
          </Link>

          <Link
            to="/search"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg ${activeClass("/search")}`}
          >
            <FaSearch />
            <span>Search</span>
          </Link>

          <Link
            to="/chat"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg ${activeClass("/chat")}`}
          >
            <FaComments />
            <span>Chat</span>
          </Link>

          <Link
            to="/create"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg ${activeClass("/create")}`}
          >
            <FaPlus />
            <span>Create</span>
          </Link>

          <Link
            to="/account"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg ${activeClass("/account")}`}
          >
            <FaUser />
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navigationbar;
