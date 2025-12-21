import { atom } from 'jotai';


export const currentUserAtom = atom('eden_pancake')

export type Post = {
  id: number;
  userName: string;
  profileUrl: string;
  postImg: string;
  createdDate: string;
  likes: number;
  meLike: boolean;
};