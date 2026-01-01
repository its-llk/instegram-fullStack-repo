import { useQuery } from "@tanstack/react-query";
import { findAllExceptMyPost } from "../api/postsAPI";
import { getProfileInfo } from "../api/userAPI";

export const useFindAllMyPosts = (userName: string, currentUser: string) => {
  return useQuery({
    queryFn: () => getProfileInfo(userName, currentUser),
    queryKey: ["findAllMyPosts", userName, currentUser],
  });
};
