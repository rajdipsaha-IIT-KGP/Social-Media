import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PostData } from "../context/PostContext";
import { ImagePlus, Loader2, X } from "lucide-react";

const AddPost = ({ type }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [filePrev, setFilePrev] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addPost } = PostData();

  const changeFileHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }

    setFile(selectedFile);
    setFilePrev(URL.createObjectURL(selectedFile));
  };

  useEffect(() => {
    return () => {
      if (filePrev) URL.revokeObjectURL(filePrev);
    };
  }, [filePrev]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!caption.trim()) {
      toast.error("Caption is required");
      return;
    }

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("file", file);

    try {
      setLoading(true);
      await addPost(formData, setCaption, setFile, setFilePrev);
    } catch {
      toast.error("Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-6 animate-fade-in">

        {/* Loader Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
            <Loader2 size={40} className="text-blue-500 animate-spin" />
          </div>
        )}

        <h2 className="text-xl font-semibold text-white mb-5 text-center">
          {type === "edit" ? "Edit Post" : "Create New Post"}
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">

          {/* Caption */}
          <input
            type="text"
            placeholder="Enter caption..."
            value={caption}
            disabled={loading}
            onChange={(e) => setCaption(e.target.value)}
            className="bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-xl outline-none border border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Image Preview */}
          {filePrev && (
            <div className="relative group">
              <img
                src={filePrev}
                alt="preview"
                className="w-full h-56 object-cover rounded-xl border border-gray-700 transition-transform duration-300 hover:scale-[1.02]"
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setFile(null);
                  setFilePrev(null);
                }}
                className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Upload Box */}
          {!filePrev && (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-800/40 transition-all duration-300">
              <ImagePlus size={32} className="text-gray-400 mb-2" />
              <span className="text-gray-300 text-sm">Upload Image</span>
              <span className="text-xs text-gray-500 mt-1">
                PNG, JPG, JPEG (max 2MB)
              </span>
              <input
                type="file"
                accept="image/*"
                disabled={loading}
                className="hidden"
                onChange={changeFileHandler}
              />
            </label>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300
              ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
              }`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <ImagePlus size={18} />
                {type === "edit" ? "Update Post" : "Add Post"}
              </>
            )}
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
