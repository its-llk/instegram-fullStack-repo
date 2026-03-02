import "./navbar.css";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlinePlusCircle } from "react-icons/ai";
import { getProfilepicture } from "../../../api/userAPI";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../../stores/atoms";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function Navbar() {
  const [currentUser] = useAtom(currentUserAtom);
  const queryClient = useQueryClient();

  const { data: currentUserprofileUrl, isLoading } = useQuery({
    queryFn: () => getProfilepicture(currentUser),
    queryKey: ["userHasChanged"],
  });
  const profileUrl = isLoading
    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-udL_-Me4EZSeIPL_RFegnzJ6a9WKGLP2YQ&s"
    : currentUserprofileUrl.profileUrl;

  return (
    <>
      <div className="navbarMain">
        <Link to="/" className="linkNavbar">
          <AiFillHome size={45} />
        </Link>
        <Link to="/PostPage" className="linkNavbar">
          <AiOutlinePlusCircle size={45} />
        </Link>
        <Link
          to={
            isLoading
              ? `/ProfilePage/${currentUser}/${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-udL_-Me4EZSeIPL_RFegnzJ6a9WKGLP2YQ&s"}`
              : `/ProfilePage/${currentUser}/${currentUserprofileUrl.profileUrl}`
          }
          className="linkNavbar"
        >
          <img
            src={profileUrl}
            alt="Profile"
            style={{ width: 45, height: 45, borderRadius: "50%" }}
          />
        </Link>
      </div>
    </>
  );
}
