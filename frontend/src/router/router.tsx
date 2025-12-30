import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../homePage/homePage.tsx";
import { PostPage } from "../postPage/postPage.tsx";
import { ProfilePage } from "../profilePage/profilePage.tsx";
import NotFoundPage from "../404 error/page404.tsx";

export const instegramRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/postPage",
    element: <PostPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/ProfilePage/:userId/*",
    element: <ProfilePage />,
  },
]);
