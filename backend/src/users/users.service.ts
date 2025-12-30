import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { UsersDbUtils } from './users-dbUtils';
import { UserDto, UserOtherUserDto } from './userDto';
import { FindAllExceptMyPost, UrlDto } from 'src/dto/outputDto';
import { returnPost } from 'src/globals/types';

@Injectable()
export class UsersService {
  constructor(private readonly usersDbUtils: UsersDbUtils) {}

  async getProfileInfo(
    userOtherUserDto: UserOtherUserDto,
  ): Promise<returnPost[]> {
    //find is user exist
    const findUser = await this.usersDbUtils.findUserExistLike(
      userOtherUserDto.userName,
    );
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    //find all posts of all withouth the user name
    const posts = await this.usersDbUtils.findAllPostsOfUser(
      userOtherUserDto.userName,
    );
    const postsIds = posts.map((post) => post.id);

    //likes group by posts
    const sumLikes = await this.usersDbUtils.countLikesForPosts(postsIds);

    const likesMap = sumLikes.reduce(
      (acc, curr) => {
        acc[curr.postId] = Number(curr.numOfLikes);
        return acc;
      },
      {} as Record<number, number>,
    );

    //find if the current user did like or didnt each posts already
    const didUserLike = await this.usersDbUtils.findPostsLikedByUser(
      userOtherUserDto.currentUser,
    );

    const didUserLikeIds = didUserLike.map((like) => like.postId);
    console.log(didUserLikeIds);

    //unit everything under one JSON
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

  async getProfilepicture(userDto: UserDto): Promise<UrlDto> {
    const userPictureUrl = await this.usersDbUtils.getProfileUrl(
      userDto.userName,
    );
    if (!userPictureUrl) throw new NotFoundException('User not found');
    return new UrlDto(userPictureUrl.avatarSrc);
  }
}
