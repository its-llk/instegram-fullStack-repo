import "./postPage.css";
import { useState } from "react";
import { useCreatePost } from "../../hooks/useCreatePost";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../stores/atoms";
import { ErrorPopUp } from "../../components/errorPopUp/errorPopUp";

export function PostPage() {
  const [photoUrl, setPhotoUrl] = useState("");
  const [currentUser] = useAtom(currentUserAtom);
  const {
    mutate: createpost,
    error,
    isError,
  } = useCreatePost(photoUrl, currentUser);

  const createPostOnClick = () => {
    createpost();
    if (isError) {
      console.error("cant create post", error);
    }
    setPhotoUrl("");
  };
  return (
    <>
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
    </>
  );
}
