import "./postComponent.css";
import { PostContainer } from "./postContainer/postContainer";
import type { Post } from "../../../models/Post";

interface PostDivProps {
  posts: Post[];
}

export function PostTable({ posts }: PostDivProps) {
  console.log("posts in postTable", posts);
  return (
    <div className="container">
      {posts.map((post) => (
        <PostContainer
          key={post.id}
          postId={post.id}
          userName={post.userName}
          profileUrl={post.profileUrl}
          postImg={post.postImg}
          createdDate={post.createdDate}
          likes={post.likes}
          meLike={post.meLike}
        />
      ))}
    </div>
  );
}
