import { useMutation } from "@tanstack/react-query";
import { postLike } from "../api/postsAPI";

export const useAddLike = (postId: number, currentUser: string) => {
  return useMutation({
    mutationFn: () => postLike(postId, currentUser),
    mutationKey: ["postLike", postId, currentUser],
  });
};
