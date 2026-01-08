import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserData } from "../context/UserContext";

const Login = () => {

  const navigate = useNavigate();
  const {loginUser} = UserData() 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[showloader,setshowloader] = useState(false)

 

  const submitHandler = async (e) => {
    e.preventDefault();
  loginUser(email,password,navigate)

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <ToastContainer theme="dark" />

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 py-2 bg-gray-700 text-white rounded-lg"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-2 bg-gray-700 text-white rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={showloader}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg ${
              showloader && "opacity-50"
            }`}
          >
            {showloader ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
