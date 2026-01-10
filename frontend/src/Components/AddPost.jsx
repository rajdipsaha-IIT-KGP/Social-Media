import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddPost = ({ type }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [filePrev, setFilePrev] = useState(null);

  const changeFileHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // File size check (2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }

    setFile(selectedFile);
    setFilePrev(URL.createObjectURL(selectedFile));
  };

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (filePrev) URL.revokeObjectURL(filePrev);
    };
  }, [filePrev]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!caption.trim()) {
      toast.error("Caption is required");
      return;
    }

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    // TODO: API call here
    console.log({ caption, file });

    toast.success("Post added successfully!");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-6 animate-fade-in">
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          {type === "edit" ? "Edit Post" : "Create New Post"}
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          
          {/* Caption */}
          <input
            type="text"
            placeholder="Enter caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg outline-none border border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Preview */}
          {filePrev && (
            <div className="relative group">
              <img
                src={filePrev}
                alt="preview"
                className="w-full h-56 object-cover rounded-lg border border-gray-700"
              />
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setFilePrev(null);
                }}
                className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition"
              >
                Remove
              </button>
            </div>
          )}

          {/* File Upload */}
          {!filePrev && (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition">
              <span className="text-gray-400 text-sm mb-1">
                Upload Image
              </span>
              <span className="text-xs text-gray-500">
                PNG, JPG, JPEG (max 2MB)
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={changeFileHandler}
              />
            </label>
          )}

          {/* Button */}
          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/40"
          >
            {type === "edit" ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddPost;
