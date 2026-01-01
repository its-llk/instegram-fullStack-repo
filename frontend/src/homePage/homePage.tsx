import "./homePage.css";
import { Navbar } from "../navbars/buttom-navbar/navbar";
import { TopBar } from "../navbars/top-navbar/topBar";
import { useAtom } from "jotai";
import { currentUserAtom } from "../api/atoms";
import { PostDiv } from "../postComponents/PostDiv";
import { useFindNotAllMyPosts } from "../hooks/useFindNotAllMyPosts";
import { ErrorPopUp } from "../errorPopUp/errorPopUp";

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
      <TopBar name="HomePage" isCreateImg={false} />
      {isLoading && <div>is loading....</div>}
      {!isLoading && error && <ErrorPopUp message={error.message} />}
      {!isLoading && !error && isSuccess && <PostDiv posts={NewPosts} />}
      <Navbar />
    </>
  );
}
