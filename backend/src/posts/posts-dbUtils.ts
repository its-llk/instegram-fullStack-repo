import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Likes } from 'src/database/likesEntity';
import { Posts } from 'src/database/postsEntity';
import { Users } from 'src/database/usersEntity';

@Injectable()
export class PostsDBUtil {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    @InjectRepository(Posts)
    private postRepo: Repository<Posts>,

    @InjectRepository(Likes)
    private likeRepo: Repository<Likes>,
  ) {}

  // find all posts excluding a user
  async findAllPostsExceptUser(userName: string) {
    return this.postRepo.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          name: Not(userName),
        },
      },
    });
  }

  // count likes for posts
  async countLikesForPosts(postIds: number[]) {
    return this.likeRepo
      .createQueryBuilder('likes')
      .select('likes.postId', 'postId')
      .addSelect('COUNT(*)', 'numOfLikes')
      .where('likes.postId IN (:...postIds)', { postIds })
      .groupBy('likes.postId')
      .getRawMany();
  }

  // find which posts the user liked
  async findPostsLikedByUser(userName: string) {
    const didUserLike = await this.likeRepo.find({
      select: {
        postId: true,
      },
      where: {
        userName: userName,
      },
    });

    return didUserLike;
  }

  //find user exsist like
  async findUserExistLike(userName: string) {
    return this.userRepo.findOne({ where: { name: userName } });
  }
  // save a new post
  async savePost(photoSrc: string, userName: string) {
    return this.postRepo.save({ photoSrc, userName });
  }

  // delete a post
  async deletePost(photoId: number) {
    return this.postRepo.delete({ id: photoId });
  }

  // find a post
  async findPost(photoId: number) {
    return this.postRepo.findOne({ where: { id: photoId } });
  }

  // save a like
  async saveLike(postId: number, userName: string) {
    return this.likeRepo.save({ postId, userName });
  }

  // remove a like
  async deleteLike(postId: number, userName: string) {
    return this.likeRepo.delete({ postId, userName });
  }

  // find if like exists
  async findLike(postId: number, userName: string) {
    return this.likeRepo.findOne({ where: { postId, userName } });
  }
}
