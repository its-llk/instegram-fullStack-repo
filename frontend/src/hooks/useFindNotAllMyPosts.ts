import { useQuery } from "@tanstack/react-query";
import { findAllExceptMyPost } from "../api/postsAPI";

export const useFindNotAllMyPosts = (currentUser: string) => {
  return useQuery({
    queryFn: () => findAllExceptMyPost(currentUser),
    queryKey: ["HompageRefresh"],
  });
};
