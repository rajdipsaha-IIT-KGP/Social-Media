import React from 'react'

import PostCard from '../Components/PostCard'
import { PostData } from '../context/PostContext'

const Home = () => {
  const  {posts} = PostData();
  return (
    <div>
      
      
      {
        posts && posts.length > 0 ? posts.map((e)=>{
         return (
         <PostCard value={e} key={e._id} type={"post"}/>

         )
        }) : "No Posts Yet "
      }
      
    </div>
  )
}

export default Home
