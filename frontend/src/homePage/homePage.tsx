import './homePage.css'
//import React from 'react'
import { Navbar } from '../navbar/navbar'
import { PostComponents } from './postComponents/postComponents'
import { TopBar } from '../filterTopBar/topBar'
import { useEffect, useState } from 'react'
import { findAllExceptMyPost } from '../api/postsAPI'
import { GLOBAL_CURRENT_USER } from '../api/globals'
import type { Post } from '../api/globals'

export function HomePage() {
const [posts, setPosts] = useState<Post[]>([]);

useEffect( ()=>{
    async function fetchNewPostData(){
        try{
        const postNewData = await findAllExceptMyPost(GLOBAL_CURRENT_USER);
        setPosts(postNewData);
        console.log(postNewData)
        } catch(err){
            console.error("failed to fetch posts",err)
        }
    }

    if (GLOBAL_CURRENT_USER){
        fetchNewPostData()
    }
},[])
  return (
    <>
    <TopBar name='HomePage' isCreateImg={false} />
        <div className='container'>   
            {posts.map((post) => (
                  <PostComponents
                    key={post.id}
                    postId={post.id}
                    userName = {post.userName}
                    profileUrl= {post.profileUrl}
                    postImg= {post.postImg}
                    createdDate= {post.createdDate}
                    meLike= {post.meLike}
                    likes={post.likes}
                  />

            ))}
        </div> 
    <Navbar/>
    </>
  )
}
