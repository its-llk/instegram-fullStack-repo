import './postComponents.css';
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteLike, postLike } from '../../api/postsAPI';
import { GLOBAL_CURRENT_USER } from '../../api/globals';


export function PostComponents({
  postId,
  userName,
  profileUrl,
  postImg,
  createdDate,
  likes,
  meLike
}: {
  postId:number;
  userName: string;
  profileUrl: string;
  postImg: string;
  createdDate: string;
  likes: number;
  meLike: boolean;
}) {
  const [liked, setLiked] = useState(meLike);
  const [likeCount, setLikeCount] = useState(likes);
  console.log(liked)
   const toggleLike = () => {
    try{
      if (liked === false){
        console.log('postLike')
         postLike(postId, GLOBAL_CURRENT_USER);
      }else{
       console.log('deleteLike')
       deleteLike(postId, GLOBAL_CURRENT_USER); 
      }
      setLiked(!liked);
    }catch(err){
      console.error('cant make like',err)
    }
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
  
    <div className="post">
      {/* Header */}
      <Link to={`/profilePage/${userName}/${profileUrl}`} className="post-header">
        <strong>{userName}</strong>
        <img src={profileUrl} alt={userName} className="post-avatar" />
     
      </Link>

      {/* Image */}
      <img src={postImg} alt="Post" className="post-image" />

      {/* Actions */}
      <div className="post-actions">
        <div className='like-components'>
        <button onClick={toggleLike} className="like-button">
          {liked ? <AiFillHeart color="red" size={24}  /> : <AiOutlineHeart size={24} />}
        </button>
        <span className='like-count'>{likeCount} {likeCount === 1 ? "like" : "likes"}</span>
        </div>
        <div className='outer-date'>
            <span className="post-date">{createdDate}</span>
        </div>
      </div>
    </div>
  );
}
