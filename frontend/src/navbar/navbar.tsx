import './navbar.css'
//import React from 'react'
import { Link } from "react-router-dom"
import { AiFillHome, AiOutlinePlusCircle  } from 'react-icons/ai';
import { getProfilepicture } from '../api/userAPI';
import { GLOBAL_CURRENT_USER } from '../api/globals';
import { useEffect,useState } from 'react';

export function Navbar() {
    const [profileUrl, setProfileUrl] = useState("h");



    //when page gets renderd
  useEffect(() => {
    async function fetchProfile() {
      try {
        const url = await getProfilepicture(GLOBAL_CURRENT_USER);
        setProfileUrl(url);
      } catch (err) {
        console.error("Failed to fetch profile picture", err);
      }
    }

    if (GLOBAL_CURRENT_USER) {
      fetchProfile();
    }
  }, []);



  return (
    <>
    <div className='navbarMain'>
        <Link to="/" className='linkNavbar'>
            <AiFillHome size={45} />
        </Link>
        <Link to="/postPage" className='linkNavbar'>
        <AiOutlinePlusCircle size={45}/>
        </Link>
        <Link to={`/profilePage/${GLOBAL_CURRENT_USER}/${profileUrl}`} className='linkNavbar'>
        <img
        src={profileUrl}
        alt="Profile"
        style={{ width: 45, height: 45, borderRadius: "50%" }}
      />
        </Link>

    </div>
    </>
  )
}
