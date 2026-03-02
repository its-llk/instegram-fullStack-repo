import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "./navbars/top-navbar/topBar";
import { Navbar } from "./navbars/buttom-navbar/navbar";
import { useAtom } from "jotai";
import { currentUserAtom } from "../stores/atoms";

const Layout = () => {
  const isCreateImg = useLocation().pathname === "/PostPage";
  const [currentUser] = useAtom(currentUserAtom);
  return (
    <div className="layout">
      <TopBar name={currentUser} isCreateImg={isCreateImg} />

      <div className="content">
        <Outlet />
      </div>

      <Navbar />
    </div>
  );
};

export default Layout;
