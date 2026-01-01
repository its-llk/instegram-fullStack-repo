import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../api/postsAPI";

export const useDeleteLike = (postId: number, currentUser: string) => {
  return useMutation({
    mutationFn: () => deleteLike(postId, currentUser),
    mutationKey: ["deleteLike", postId, currentUser],
  });
};
