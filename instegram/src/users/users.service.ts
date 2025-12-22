
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { DBUtil } from '../database/db-util';
import { UserDto, UserOtherUserDto } from 'src/dto/userDto';
import { FindAllExceptMyPost, UrlDto } from 'src/dto/outputDto';

@Injectable()
export class UsersService {

    constructor(private readonly dbutil: DBUtil) {}



    async getProfileInfo(userOtherUserDto: UserOtherUserDto
        ):Promise<FindAllExceptMyPost[]> {
        //find all posts of all withouth the user name
        const posts = await this.dbutil.findAllPostsOfUser(userOtherUserDto.userName)
        const postsIds = posts.map(post => post.id);
        
        //likes group by posts
        const sumLikes = await this.dbutil.countLikesForPosts(postsIds)

        const likesMap = sumLikes.reduce((acc, curr) => {
        acc[curr.postId] = Number(curr.numOfLikes);
        return acc;
        }, {} as Record<number, number>);
        
        //find if the current user did like or didnt each posts already
        const didUserLike = await this.dbutil.findPostsLikedByUser(userOtherUserDto.currentUser)


        const didUserLikeIds = didUserLike.map(like => like.postId);
        console.log(didUserLikeIds)
        //unit everything under one JSON
        const response: FindAllExceptMyPost[] = posts.map(post=>({
            id: post.id,
            userName: post.userName,
            profileUrl: post.user.avatarSrc ,
            postImg: post.photoSrc,
            createdDate: new Date(post.createdAt).toLocaleDateString(),
            likes: likesMap[post.id]?? 0,
            meLike: didUserLikeIds.includes(post.id),

        }))
        return response
    }

    async getProfilepicture(userDto: UserDto){
        const userPictureUrl = await this.dbutil.getProfileUrl(userDto.userName)
        if (!userPictureUrl) throw new NotFoundException('User not found');
        return new UrlDto(userPictureUrl.avatarSrc)
    }
}
 