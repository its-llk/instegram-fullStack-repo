import './navbar.css'
//import React from 'react'
import { Link } from "react-router-dom"
import { AiFillHome, AiOutlinePlusCircle  } from 'react-icons/ai';
import { getProfilepicture } from '../../api/userAPI';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../../api/globals';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function Navbar() {
  const [currentUser/*, setCurrentUser*/] = useAtom(currentUserAtom)
  const queryClient = useQueryClient();

    //when page gets renderd
  const { data: currentUserprofileUrl, isLoading } = useQuery({
     queryFn: () => getProfilepicture(currentUser),
     queryKey: ['userHasChanged'],
  })
  const profileUrl = isLoading 
    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-udL_-Me4EZSeIPL_RFegnzJ6a9WKGLP2YQ&s'
    : currentUserprofileUrl.profileUrl

  const renderProfileInfo = () => {
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ['getProfileUser'],
      });
    }, 100);
  }


  return (
    <>
    <div className='navbarMain'>
        <Link to="/" className='linkNavbar'>
            <AiFillHome size={45} />
        </Link>
        <Link to="/postPage" className='linkNavbar'>
        <AiOutlinePlusCircle size={45}/>
        </Link>
        <Link 
         to={isLoading ?   'http://localhost:5173/' : `/profilePage/${currentUser}/${currentUserprofileUrl.profileUrl}` }
        className='linkNavbar' onClick={renderProfileInfo}>
        <img
        src={ profileUrl }
        alt="Profile"
        style={{ width: 45, height: 45, borderRadius: "50%" }}
      />
        </Link>

    </div>
    </>
  )
}
