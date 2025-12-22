import '../postComponents.css';
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteLike, deletePost, postLike } from '../../api/postsAPI';
import { currentUserAtom } from '../../api/globals';
import {useAtom} from 'jotai'
import { useQueryClient } from '@tanstack/react-query';
import { IconContext } from 'react-icons';

interface PostComponentsPropms{ 
  postId:number;
  userName: string;
  profileUrl: string;
  postImg: string;
  createdDate: string;
  likes: number;
  meLike: boolean;
}

export function PostComponents(promps: PostComponentsPropms) {
  const [liked, setLiked] = useState(promps.meLike)
  const [likeCount, setLikeCount] = useState(promps.likes)
  const [currentUser] = useAtom(currentUserAtom)
  const queryClient = useQueryClient();
   const deleteThePost = () => {
    try{
      console.log('delete Post')  
      deletePost(promps.postId)
    }catch(err){  
      console.error('cant make like',err)
    }
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ['getProfileUser'],
      });
    }, 100);
   }
   const toggleLike = () => {
    try{
      if (liked === false){
        console.log('postLike')
         postLike(promps.postId, currentUser)
      }else{
       console.log('deleteLike')
       deleteLike(promps.postId, currentUser) 
      }
      setLiked(!liked);
    }catch(err){
      console.error('cant make like',err)
    }
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  };

  return (
  
    <div className="post">
      {/* Header for the current user */}
      {(promps.userName == currentUser) &&
      <div className='post-header'>
         <button className="delete-btn" onClick={deleteThePost}>
          <IconContext.Provider value={{ color: "gray", className: "contactIcon" }}>
               <FaTrash size={18} color='gray' />
            </IconContext.Provider>
        </button>
        <Link to={`/profilePage/${promps.userName}/${promps.profileUrl}`} className="post-header-link">
          <strong>{promps.userName}</strong>
          <img src={promps.profileUrl} alt={promps.userName} className="post-avatar" />
        </Link>
      </div>}

      {/* Header for the other user */}
      {(promps.userName != currentUser) &&
        <Link to={`/profilePage/${promps.userName}/${promps.profileUrl}`} className="post-header-link">
          <strong>{promps.userName}</strong>
          <img src={promps.profileUrl} alt={promps.userName} className="post-avatar" />
        </Link>}

      {/* Image */}
      <img src={promps.postImg} alt="Post" className="post-image" />

      {/* Actions */}
      <div className="post-actions">
        <div className='like-components'>
        <button onClick={toggleLike} className="like-button">
          {liked ? <AiFillHeart color="red" size={24}  /> : <AiOutlineHeart size={24} />}
        </button>
        <span className='like-count'>{likeCount} {likeCount === 1 ? "like" : "likes"}</span>
        </div>
        <div className='outer-date'>
            <span className="post-date">{promps.createdDate}</span>
        </div>
      </div>
    </div>
  )
}
