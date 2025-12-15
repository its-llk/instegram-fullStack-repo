import { Injectable } from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/usersEntity';
import { Posts } from 'src/database/postsEntity';
import { Likes } from 'src/database/likesEntity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

        constructor(
        @InjectRepository(Users)
        private userRepo: Repository<Users>,

        @InjectRepository(Posts)
        private postRepo: Repository<Posts>,
                
        @InjectRepository(Likes)
        private likeRepo: Repository<Likes>,
    ){}


    async getProfileInfo(userName : string, currentUser : string){

        //find all posts of all withouth the user name
        const posts = await this.postRepo
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .where('post.userName = :userName', { userName})
        .getMany();
        const postsIds = posts.map(post => post.id);

        //likes group by posts
        const sumLikes = await this.likeRepo
        .createQueryBuilder('likes')
        .select('likes.postId', 'postId')
        .addSelect('COUNT(*)', 'numOfLikes')
        .where('likes.postId IN (:...postsIds)', { postsIds})
        .groupBy('likes.postId')
        .getRawMany();

        const likesMap = sumLikes.reduce((acc, curr) => {
        acc[curr.postId] = Number(curr.numOfLikes);
        return acc;
        }, {} as Record<number, number>);
        
        //find if the current user did like or didnt each posts already
        const didUserLike = await this.likeRepo
        .createQueryBuilder('like')
        .select('like.postId', 'postId')
        .where('like.userName = :currentUser', { currentUser})
        .getRawMany();


        const didUserLikeIds = didUserLike.map(like => like.postId);
        
        //unit everything under one JSON
        const response = (await posts).map(post=>({
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

    async getProfilepicture(userName: string){
        const userPictureUrl = await this.userRepo.findOne({where: {name: userName}}) //users.find( user => user.name === userName)
        if (!userPictureUrl) throw new NotFoundException('User not found');
        return userPictureUrl.avatarSrc
    }
}
 