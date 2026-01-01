import { useMutation } from "@tanstack/react-query";
import { postImage } from "../api/postsAPI";

export const useCreatePost = (photoSrc: string, currentUser: string) => {
  return useMutation({
    mutationFn: () => postImage(photoSrc, currentUser),
    mutationKey: ["createPost", photoSrc, currentUser],
  });
};
