import '../homePage/homePage.css'
//import React from 'react'
import { Navbar } from '../navbar/navbar'
import { useParams } from 'react-router-dom'
import { TopBar } from '../filterTopBar/topBar';
import { PostComponents } from '../homePage/postComponents/postComponents';
import { useEffect, useState } from 'react';
import { GLOBAL_CURRENT_USER } from '../api/globals';
import { getProfileInfo } from '../api/userAPI';
import type { Post } from '../api/globals'


export function ProfilePage() {
const { userId, "*": profileUrl } = useParams<{ userId: string; "*": string }>();
console.log(userId,profileUrl)
const [posts, setPosts] = useState<Post[]>([]);

useEffect( ()=>{
    async function fetchNewPostData(){
        try{
        const postNewData = await getProfileInfo(userId!,GLOBAL_CURRENT_USER);
        setPosts(postNewData);
        console.log(postNewData)
        } catch(err){
            console.error("failed to fetch posts",err)
        }
    }

    if (GLOBAL_CURRENT_USER){
        fetchNewPostData()
    }
},[userId])
  return (
    <>
    <TopBar name= {`${userId}`} isCreateImg={false} />
        <div className='profile-header'>
           <img src={profileUrl} alt={userId} className='image-header-profile' />
           <strong>{userId}</strong>
        </div>
        <div className='container'>   

            {posts.map((post) => (
                  <PostComponents
                    key={post.id}
                    postId={post.id}
                    userName = {post.userName}
                    profileUrl= {post.profileUrl}
                    postImg= {post.postImg}
                    createdDate= {post.createdDate}
                    likes={post.likes}
                    meLike= {post.meLike}
                  />
    
            ))}
        </div> 


    <Navbar/>
    </>
  )
}
