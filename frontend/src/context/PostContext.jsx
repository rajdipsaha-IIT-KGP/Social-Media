import { createContext, useContext, useEffect, useState } from "react";
import { Toaster,toast } from "react-hot-toast";
import axios from "axios";

const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {

const[posts,setPosts] = useState([])


async function likePost(id) {
  try{
  const {data} = await axios.post('http://localhost:3000/api/posts/like/'+id)
  toast.success(data.message)
  fetchPost()
  }
  catch(err){
    toast.error(err.response.data.message)
  }
}
async function addPost(formData,setCaption,setFile,setFilePrev) {
  try{
    const {data} = await axios.post('http://localhost:3000/api/posts/new',formData)
    toast.success("Post added")
    fetchPost()
    setFile('')
    setCaption('')
    setFilePrev('')
  }
  catch(err){
   toast.error(err.response.data.message)
  }
}
async function fetchPost(){
    try{
   const {data} = await axios.get('http://localhost:3000/api/posts/all')
   setPosts(data.posts)
    }
    catch(err){
        console.log(err)
    }
}
useEffect(()=>{
  fetchPost()
},[])
  const value = {
    // add state & functions later
    posts,
    addPost,
    likePost
  };
 
  return (
    <PostContext.Provider value={value}>
      {children}
      <Toaster />
    </PostContext.Provider>
  );
};

export const PostData = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostData must be used inside PostContextProvider");
  }
  return context;
};
