import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white px-6">
      <div className="text-center animate-fade-in">
        
        {/* Animated Icon */}
        <div className="text-7xl mb-4 animate-float">🚫</div>

        {/* 404 */}
        <h1 className="text-6xl font-extrabold tracking-widest text-blue-500 mb-2">
          404
        </h1>

        {/* Text */}
        <p className="text-gray-400 text-lg mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/40"
        >
          Go Home
        </Link>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
