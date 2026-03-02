import "../postComponent.css";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { currentUserAtom } from "../../../../stores/atoms";
import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { IconContext } from "react-icons";
import { useDeletePost } from "../../../../hooks/useDeletePost";
import { useDeleteLike } from "../../../../hooks/useRemoveLike";
import { useAddLike } from "../../../../hooks/useAddLike";

interface PostContainerPropms {
  postId: number;
  userName: string;
  profileUrl: string;
  postImg: string;
  createdDate: string;
  likes: number;
  meLike: boolean;
}

export function PostContainer(promps: PostContainerPropms) {
  const [liked, setLiked] = useState(promps.meLike);
  const likeCount = promps.likes + (liked ? 1 : 0) - (promps.meLike ? 1 : 0);
  const [currentUser] = useAtom(currentUserAtom);
  const queryClient = useQueryClient();
  const { mutate: deletePostMutation } = useDeletePost(promps.postId);
  const { mutate: deleteLikeMutation } = useDeleteLike(
    promps.postId,
    currentUser,
  );
  const { mutate: addLikeMutation } = useAddLike(promps.postId, currentUser);

  const deleteThePost = () => {
    deletePostMutation();
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ["RefreshProfilePage"],
      });
    }, 100);
  };

  const toggleLike = () => {
    if (liked === false) {
      console.log("postLike");
      addLikeMutation();
    } else {
      console.log("deleteLike");
      deleteLikeMutation();
    }
    setLiked(!liked);
  };
  return (
    <div className="post">
      <div className="post-header">
        {currentUser === promps.userName ? (
          <button className="delete-btn" onClick={deleteThePost}>
            <IconContext.Provider
              value={{ color: "gray", className: "contactIcon" }}
            >
              <FaTrash size={18} color="gray" />
            </IconContext.Provider>
          </button>
        ) : (
          <div className="delete-placeholder"></div>
        )}
        <div className="post-header-spacer">
          <Link
            to={`/profilePage/${promps.userName}/${promps.profileUrl}`}
            className="post-header-link"
          >
            <strong>{promps.userName}</strong>
            <img
              src={promps.profileUrl}
              alt={promps.userName}
              className="post-avatar"
            />
          </Link>
        </div>
      </div>
      <img src={promps.postImg} alt="Post" className="post-image" />
      <div className="post-actions">
        <div className="like-components">
          <button onClick={toggleLike} className="like-button">
            {liked ? (
              <AiFillHeart color="red" size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
          </button>
          <span className="like-count">{likeCount}</span>
        </div>
        <div className="outer-date">
          <span className="post-date">{promps.createdDate}</span>
        </div>
      </div>
    </div>
  );
}
