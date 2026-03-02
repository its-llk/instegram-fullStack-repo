import { useAtom } from "jotai";
import { currentUserAtom } from "../../stores/atoms";
import { PostTable } from "../../components/postTable/postComponents/postTable";
import { useFindNotAllMyPosts } from "../../hooks/useFindNotAllMyPosts";
import { ErrorPopUp } from "../../components/errorPopUp/errorPopUp";

export function HomePage() {
  const [currentUser] = useAtom(currentUserAtom);

  const {
    data: NewPosts,
    isLoading,
    isSuccess,
    error,
  } = useFindNotAllMyPosts(currentUser);

  return (
    <>
      {isLoading && <div>is loading....</div>}
      {!isLoading && error && <ErrorPopUp message={error.message} />}
      {!isLoading && !error && isSuccess && <PostTable posts={NewPosts} />}
    </>
  );
}
