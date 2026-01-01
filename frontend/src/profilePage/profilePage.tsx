import "../homePage/homePage.css";
import { Navbar } from "../navbars/buttom-navbar/navbar";
import { TopBar } from "../navbars/top-navbar/topBar";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUserAtom } from "../api/atoms";
import { PostDiv } from "../postComponents/PostDiv";
import { useFindAllMyPosts } from "../hooks/useFindAllMyPosts";
import { ErrorPopUp } from "../errorPopUp/errorPopUp";

export function ProfilePage() {
  const { userId, "*": profileUrl } = useParams<{
    userId: string;
    "*": string;
  }>();
  const [currentUser] = useAtom(currentUserAtom);
  const {
    data: userProfilePosts,
    isLoading,
    isSuccess,
    error,
  } = useFindAllMyPosts(userId!, currentUser);

  return (
    <>
      <TopBar name={`${userId}`} isCreateImg={false} />
      <div className="profile-header">
        <img src={profileUrl} alt={userId} className="image-header-profile" />
        <strong>{userId}</strong>
      </div>

      {isLoading && <div>is loading....</div>}
      {!isLoading && error && <ErrorPopUp message={error.message} />}
      {!isLoading && !error && isSuccess && (
        <PostDiv posts={userProfilePosts} />
      )}

      <Navbar />
    </>
  );
}
