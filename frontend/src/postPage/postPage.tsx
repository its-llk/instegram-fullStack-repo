import './postPage.css'
import { useState } from "react";
import { Navbar } from '../navbar/navbar'
import { TopBar } from '../filterTopBar/topBar'
import { postImage } from '../api/postsAPI';
import { GLOBAL_CURRENT_USER } from '../api/globals';

export function PostPage() {
  const [photoUrl, setPhotoUrl] = useState("");

  const createpost = (photoSrc: string)=>{
    try{
      postImage(photoSrc,GLOBAL_CURRENT_USER);
    }catch(err){
      console.error('cant post shit',err)
    }

  }
  return (
    <>
    <TopBar name='Create new post' isCreateImg/>
    
    <div className="upload-container">


      <input
        type="text"
        className="upload-input"
        placeholder="Photo url"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <p className="upload-description">
        Create a new post with specified url
      </p>

      <button onClick={() => createpost(photoUrl)} className="upload-button">
        Create Post
      </button>
    </div>

    <Navbar/>
    </>
  )
}
