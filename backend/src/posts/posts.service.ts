import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostsDBUtil } from './posts-dbUtils';
import { ImageToPostDto, LikeChangeDto, PhotoId } from './postDto';
import { UserDto } from 'src/users/userDto';
import { err } from 'src/globals/types';
import { Posts } from 'src/database/postsEntity';
import { returnPost } from 'src/globals/types';

@Injectable()
export class PostsService {
  constructor(private readonly postsDBUtil: PostsDBUtil) {}

  async findAllExceptMyPosts(userdto: UserDto): Promise<returnPost[]> {
    //find user exist
    const findUser = await this.postsDBUtil.findUserExistLike(userdto.userName);
    if (!findUser) {
      throw new NotFoundException(err.USER_NOT_FOUND);
    }

    // fetch posts
    const posts: Posts[] = await this.postsDBUtil.findAllPostsExceptUser(
      userdto.userName,
    );
    const postsIds = posts.map((p) => p.id);

    // fetch likes
    const likesSum = await this.postsDBUtil.countLikesForPosts(postsIds);
    const likesMap = likesSum.reduce(
      (acc, curr) => {
        acc[curr.postId] = Number(curr.numOfLikes);
        return acc;
      },
      {} as Record<number, number>,
    );
    // fetch posts liked by current user
    const didUserLike = await this.postsDBUtil.findPostsLikedByUser(
      userdto.userName,
    );

    const didUserLikeIds = didUserLike.map((like) => like.postId);

    // assemble final response
    const response: returnPost[] = posts.map((post) => ({
      id: post.id,
      userName: post.userName,
      profileUrl: post.user.avatarSrc,
      postImg: post.photoSrc,
      createdDate: new Date(post.createdAt).toLocaleDateString(),
      likes: likesMap[post.id] ?? 0,
      meLike: didUserLikeIds.includes(post.id),
    }));
    return response;
  }

  async postImage(imgToPost: ImageToPostDto): Promise<string> {
    // find user exist
    throw new NotFoundException(err.USER_NOT_FOUND);
    const findUser = await this.postsDBUtil.findUserExistLike(
      imgToPost.userName,
    );
    if (!findUser) {
      throw new NotFoundException(err.USER_NOT_FOUND);
    }

    // save post
    const imageData = await this.postsDBUtil.savePost(
      imgToPost.photoSrc,
      imgToPost.userName,
    );
    if (imageData) {
      return err.success;
    }
    throw new InternalServerErrorException(err.saveFailed);
  }

  async deleteImage(photoId: PhotoId): Promise<string> {
    // check if post exists
    const findPost = await this.postsDBUtil.findPost(photoId.postId);
    if (!findPost) {
      throw new NotFoundException(err.POST_NOT_FOUND);
    }

    // delete post
    const result = await this.postsDBUtil.deletePost(photoId.postId);
    if (result.affected) {
      return err.success;
    }
    throw new InternalServerErrorException(err.saveFailed);
  }

  async postLike(likeChangeDto: LikeChangeDto): Promise<string> {
    // check if user exists
    const findUser = await this.postsDBUtil.findUserExistLike(
      likeChangeDto.userName,
    );
    if (!findUser) {
      throw new NotFoundException(err.USER_NOT_FOUND);
    }

    // check if post exists
    const findPost = await this.postsDBUtil.findPost(likeChangeDto.postId);
    if (!findPost) {
      throw new NotFoundException(err.POST_NOT_FOUND);
    }

    // save like
    const result = await this.postsDBUtil.saveLike(
      likeChangeDto.postId,
      likeChangeDto.userName,
    );
    if (result) {
      return err.success;
    }
    throw new InternalServerErrorException(err.saveFailed);
  }

  async removeLike(likeChangeDto: LikeChangeDto): Promise<string> {
    // check if user exists
    const findUser = await this.postsDBUtil.findUserExistLike(
      likeChangeDto.userName,
    );
    if (!findUser) {
      throw new NotFoundException(err.USER_NOT_FOUND);
    }

    // check if post exists
    const findPost = await this.postsDBUtil.findPost(likeChangeDto.postId);
    if (!findPost) {
      throw new NotFoundException(err.POST_NOT_FOUND);
    }

    // delete like
    const result = await this.postsDBUtil.deleteLike(
      likeChangeDto.postId,
      likeChangeDto.userName,
    );
    if (result.affected) {
      return err.success;
    }
    throw new InternalServerErrorException(err.saveFailed);
  }
}
