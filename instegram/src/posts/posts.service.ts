import { Injectable } from '@nestjs/common';
import { DBUtil } from '../database/db-util';
import { ImageToPostDto, LikeChangeDto, PhotoId } from 'src/dto/postDto';
import { UserDto } from 'src/dto/userDto';
import { FindAllExceptMyPost, PostImage } from 'src/dto/outputDto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(private readonly dbutil: DBUtil) {}

  async findAllExceptMyPosy(userdto : UserDto    
  ):Promise<FindAllExceptMyPost[]>{
    // fetch posts
    const posts = await this.dbutil.findAllPostsExceptUser(userdto.userName);
    const postsIds = posts.map((p) => p.id);
    
    // fetch likes
    const likesSum = await this.dbutil.countLikesForPosts(postsIds);
    const likesMap = likesSum.reduce((acc, curr) => {
        acc[curr.postId] = Number(curr.numOfLikes)
        return acc;
        }, {} as Record<number, number>);
    // fetch posts liked by current user
    const didUserLike = await this.dbutil.findPostsLikedByUser(userdto.userName);
    
    const didUserLikeIds = didUserLike.map(like => like.postId);

    // assemble final response
    const response:FindAllExceptMyPost[] = posts.map((post) => ({
      id: post.id,
      userName: post.userName,
      profileUrl: post.user.avatarSrc,
      postImg: post.photoSrc,
      createdDate: new Date(post.createdAt).toLocaleDateString(),
      likes: likesMap[post.id] ?? 0,
      meLike: didUserLikeIds.includes(post.id),
    }));
    return response
  }

  async postImage(imgToPost: ImageToPostDto
      ):Promise<PostImage>{
     const imageData = this.dbutil.savePost(imgToPost.photoSrc, imgToPost.userName);
     return new PostImage((await imageData).photoSrc)
  }

  async deleteImage(photoId: PhotoId
      ):Promise<DeleteResult>{
     return this.dbutil.deletePost(photoId.postId);
  }
  
  async postLike(likeChangeDto:LikeChangeDto
    ):Promise<LikeChangeDto>{
    return this.dbutil.saveLike(likeChangeDto.postId, likeChangeDto.userName);
  }

  async removeLike(likeChangeDto:LikeChangeDto
    ):Promise<DeleteResult>{
    return this.dbutil.deleteLike(likeChangeDto.postId, likeChangeDto.userName);
  }

}
