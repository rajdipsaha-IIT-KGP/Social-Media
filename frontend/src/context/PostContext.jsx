import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";

const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {

const[posts,setPosts] = useState([])

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
    posts
  };
 
  return (
    <PostContext.Provider value={value}>
      {children}
      <Toaster />
    </PostContext.Provider>
  );
};

export const PostData = () => useContext(PostContext);
