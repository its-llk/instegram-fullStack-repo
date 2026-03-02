import "./profilePage.css";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../stores/atoms";
import { PostTable } from "../../components/postTable/postComponents/postTable";
import { useFindAllUserPosts } from "../../hooks/useFindAllUserPosts";
import { ErrorPopUp } from "../../components/errorPopUp/errorPopUp";

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
  } = useFindAllUserPosts(userId!, currentUser);
  return (
    <>
      <div className="profile-header">
        <img src={profileUrl} alt={userId} className="image-header-profile" />
        <strong>{userId}</strong>
      </div>

      {isLoading && <div>is loading....</div>}
      {!isLoading && error && <ErrorPopUp message={error.message} />}
      {!isLoading && !error && isSuccess && (
        <PostTable posts={userProfilePosts} />
      )}
    </>
  );
}
