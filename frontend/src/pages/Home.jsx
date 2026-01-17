import React from 'react'

import PostCard from '../Components/PostCard'
import { PostData } from '../context/PostContext'
import Navigationbar from '../Components/Navigationbar';

const Home = () => {
  const  {posts} = PostData();
  return (
    <div>
      
      
      {
        posts && posts.length > 0 ? posts.map((e)=>{
         return (
         <PostCard value={e} key={e._id} type={"post"}/>

         )
        }) : (
          <div>No Posts Yet<Navigationbar/></div>
          
        )
      }
      
    </div>
  )
}

export default Home
