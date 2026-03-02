import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../features/homePage/homePage.tsx";
import { PostPage } from "../features/postPage/postPage.tsx";
import { ProfilePage } from "../features/profilePage/profilePage.tsx";
import NotFoundPage from "../404 error/page404.tsx";
import Layout from "../components/layout.tsx";

export const instegramRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "PostPage", element: <PostPage /> },
      { path: "ProfilePage/:userId/*", element: <ProfilePage /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);
