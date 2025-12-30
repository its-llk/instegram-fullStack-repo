export interface returnPost {
  id: number;
  userName: string;
  profileUrl: string;
  postImg: string;
  createdDate: string;
  likes: number;
  meLike: boolean;
}

export interface ErrTypes {
  USER_NOT_FOUND: string;
  POST_NOT_FOUND: string;
  LIKE_NOT_FOUND: string;
  deleteFailed: string;
  success: string;
  saveFailed: string;
}

export const err = {
  USER_NOT_FOUND: 'User not found',
  POST_NOT_FOUND: 'Post not found',
  LIKE_NOT_FOUND: 'Like not found',
  deleteFailed: 'Delete operation failed',
  success: 'Operation successful',
  saveFailed: 'Save operation failed',
};
