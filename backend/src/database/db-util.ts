import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from 'typeorm';
import { Likes } from 'src/database/likesEntity';
import { Posts } from 'src/database/postsEntity';
import { Users } from 'src/database/usersEntity';

@Injectable()
export class DBUtil {
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
    // return this.postRepo
    //   .createQueryBuilder('post')
    //   .leftJoinAndSelect('post.user', 'user')
    //   .where('post.userName != :userName', { userName })
    //   .getMany();
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

  async findAllPostsOfUser(userName: string) {
    // return this.postRepo
    //   .createQueryBuilder('post')
    //   .leftJoinAndSelect('post.user', 'user')
    //   .where('post.userName = :userName', { userName })
    //   .getMany();

    return this.postRepo.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          name: userName,
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
    // const didUserLike = await this.likeRepo
    //   .createQueryBuilder('like')
    //   .select('like.postId', 'postId')
    //   .where('like.userName = :userName', { userName })
    //   .getRawMany();

    const didUserLike = await this.likeRepo.find({
      select: {
        postId: true,
      },
      where: {
        userName: userName,
      },
    });

    return didUserLike; //.map((like) => like.postId);
  }

  // save a new post
  async savePost(photoSrc: string, userName: string) {
    return this.postRepo.save({ photoSrc, userName });
  }
  async deletePost(photoId: number) {
    return this.postRepo.delete({ id: photoId });
  }
  // save a like
  async saveLike(postId: number, userName: string) {
    return this.likeRepo.save({ postId, userName });
  }

  // remove a like
  async deleteLike(postId: number, userName: string) {
    return this.likeRepo.delete({ postId, userName });
  }

  async getProfileUrl(userName: string) {
    console.log('DataSource initialized:');
    return this.userRepo.findOne({ where: { name: userName } });
  }
}
