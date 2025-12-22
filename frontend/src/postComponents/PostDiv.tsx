import './postComponents.css'
import { PostComponents } from './postComponents/postComponents';
import type { Post } from '../api/globals'


interface PostDivProps{
  posts: Post[];
};

export function PostDiv({ posts }: PostDivProps) {
  return (
    <div className="container">
      
      {posts.map((post) => (
        <PostComponents
          key = {post.id}
          postId = {post.id}
          userName = {post.userName}
          profileUrl = {post.profileUrl}
          postImg = {post.postImg}
          createdDate = {post.createdDate}
          likes = {post.likes}
          meLike = {post.meLike}
           />
              ))}
    </div>
  )
}
