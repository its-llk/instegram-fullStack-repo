export const GLOBAL_CURRENT_USER = 'eden_pancake'
export type Post = {
  id: number;
  userName: string;
  profileUrl: string;
  postImg: string;
  createdDate: string;
  likes: number;
  meLike: boolean;
};