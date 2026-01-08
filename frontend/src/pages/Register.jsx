import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaVenusMars, FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState(null);
  const [loading,setLoading] = useState(false)
  // Handle file input change
  const changeFileHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Optional: check file size (max 2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }

    setFile(selectedFile); 
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !gender || !file) {
      toast.error("Please fill in all required fields!");
      return;
    }

    // Use FormData to send file + text fields
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("file", file); // must match multer key

    try {
        setLoading(true)
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Account created successfully!");
     
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Try again.");
    }
    finally{
        setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
            {/* Profile Picture Preview */}
{file && (
  <div className="flex justify-center mb-4">
    <img
      src={URL.createObjectURL(file)}
      alt="Profile Preview"
      className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
    />
  </div>
)}

          {/* Name */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Gender */}
          <div className="relative">
            <FaVenusMars className="absolute top-3 left-3 text-gray-400" />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Profile Pic */}
          <div className="relative">
            <FaImage className="absolute top-3 left-3 text-gray-400" />
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="w-full pl-10 py-2 bg-gray-700 text-white rounded-lg cursor-pointer"
              required
            />
          </div>

          {/* Submit Button */}
          <button
  type="submit"
  disabled={loading}
  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center ${
    loading ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      Registering...
    </>
  ) : (
    "Register"
  )}
</button>


        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
