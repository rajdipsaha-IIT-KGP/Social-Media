import { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  async function fetchPost() {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/posts/all"
      );
      setPosts(data.posts);
    } catch (err) {
      console.log(err);
    }
  }

  async function addPost(formData, setCaption, setFile, setFilePrev) {
    try {
      await axios.post(
        "http://localhost:3000/api/posts/new",
        formData
      );
      toast.success("Post added");
      fetchPost();
      setCaption("");
      setFile("");
      setFilePrev("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  }

  async function likePost(id) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/posts/like/" + id
      );
      toast.success(data.message);
      fetchPost();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  }

  async function addComment(id, comment) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/posts/comment/" + id,
        { comment }
      );
      toast.success(data.message);
      fetchPost();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <PostContext.Provider
      value={{ posts, addPost, likePost, addComment }}
    >
      {children}
      <Toaster />
    </PostContext.Provider>
  );
};

export const PostData = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error(
      "PostData must be used inside PostContextProvider"
    );
  }
  return context;
};
