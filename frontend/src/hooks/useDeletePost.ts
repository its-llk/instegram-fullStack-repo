import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../api/postsAPI";

export const useDeletePost = (postId: number) => {
  return useMutation({
    mutationFn: () => deletePost(postId),
    mutationKey: ["deletePost", postId],
  });
};
