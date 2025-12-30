import "./postPage.css";
import { useState } from "react";
import { Navbar } from "../navbars/buttom-navbar/navbar";
import { TopBar } from "../navbars/top-navbar/topBar";
import { postImage } from "../api/postsAPI";
import { useAtom } from "jotai";
import { currentUserAtom } from "../api/atoms";

export function PostPage() {
  const [photoUrl, setPhotoUrl] = useState("");
  const [currentUser] = useAtom(currentUserAtom);

  const createpost = (photoSrc: string) => {
    try {
      postImage(photoSrc, currentUser);
    } catch (err) {
      console.error("cant post shit", err);
    }
    setPhotoUrl("");
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

        <button onClick={() => createpost(photoUrl)} className="upload-button">
          Create Post
        </button>
      </div>

      <Navbar />
    </>
  );
}
