import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "../api/userAPI";

export const useFindAllUserPosts = (userName: string, currentUser: string) => {
  return useQuery({
    queryFn: () => getProfileInfo(userName, currentUser),
    queryKey: ["RefreshProfilePage", userName],
  });
};
