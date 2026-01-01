import "./postPage.css";
import { useState } from "react";
import { Navbar } from "../navbars/buttom-navbar/navbar";
import { TopBar } from "../navbars/top-navbar/topBar";
import { useCreatePost } from "../hooks/useCreatePost";
import { useAtom } from "jotai";
import { currentUserAtom } from "../api/atoms";
import { ErrorPopUp } from "../errorPopUp/errorPopUp";

export function PostPage() {
  const [photoUrl, setPhotoUrl] = useState("");
  const [currentUser] = useAtom(currentUserAtom);
  const {
    mutate: createpost,
    error,
    isError,
  } = useCreatePost(photoUrl, currentUser);

  const createPostOnClick = () => {
    setPhotoUrl("");
    createpost();
  };
  return (
    <>
      <TopBar name="Create new post" isCreateImg />

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

        <button onClick={() => createPostOnClick()} className="upload-button">
          Create Post
        </button>
      </div>

      {isError && error && <ErrorPopUp message={error.message} />}

      <Navbar />
    </>
  );
}
