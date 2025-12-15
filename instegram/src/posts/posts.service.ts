import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { response } from 'express';
import { Likes } from 'src/database/likesEntity';
import { Posts } from 'src/database/postsEntity';
import { Users } from 'src/database/usersEntity';
import { In, Not, Repository } from 'typeorm';


@Injectable()
export class PostsService {

            constructor(
            @InjectRepository(Users)
            private userRepo: Repository<Users>,
    
            @InjectRepository(Posts)
            private postRepo: Repository<Posts>,
                    
            @InjectRepository(Likes)
            private likeRepo: Repository<Likes>,
        ){}

   async findAllExceptMyPosy(userName : string){

        //find all posts of all withouth the user name
        const posts = await this.postRepo
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .where('post.userName != :userName', { userName})
        .getMany();
        
        const postsIds = posts.map(post => post.id);

        //liek group by posts
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
        .where('like.userName = :userName', { userName})
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

    async postImage(imgToPost : {photoSrc : string, userName: string}){

        return await this.postRepo.save({
        photoSrc: imgToPost.photoSrc,
        userName: imgToPost.userName,
        });
    }

    async postLike(postId : number, userName:string){
        return this.likeRepo.save({
            postId: postId,
            userName: userName
        })
    }

    async removeLike(postId : number, userName:string){
        return this.likeRepo.delete({
            postId:  postId,
            userName: userName
        })

    }
}
