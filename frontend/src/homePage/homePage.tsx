import './homePage.css'
//import React from 'react'
import { Navbar } from '../navbars/buttom-navbar/navbar'
import { TopBar } from '../navbars/top-navbar/topBar'
// import { PostComponents } from '../postComponents/postComponents/postComponents'
// import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { findAllExceptMyPost } from '../api/postsAPI'
import { useAtom } from 'jotai'
import { currentUserAtom } from '../api/globals'
import { PostDiv } from '../postComponents/PostDiv'

export function HomePage() {
  const [currentUser] = useAtom(currentUserAtom)

  const {data: NewPosts, isLoading} = useQuery({
    queryFn: () => findAllExceptMyPost(currentUser),
    queryKey: ['HompageRefresh']

  })
  


  return (
    <>
    <TopBar name='HomePage' isCreateImg={false} />
    {!isLoading && <PostDiv posts={NewPosts}/>}
    {isLoading && 
    <div>
      {'is loading....'}
    </div>
    }

    <Navbar/>
    </>
  )
}
