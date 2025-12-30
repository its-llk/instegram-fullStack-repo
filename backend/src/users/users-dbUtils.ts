import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Likes } from 'src/database/likesEntity';
import { Posts } from 'src/database/postsEntity';
import { Users } from 'src/database/usersEntity';

@Injectable()
export class UsersDbUtils {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,

    @InjectRepository(Posts)
    private postRepo: Repository<Posts>,

    @InjectRepository(Likes)
    private likeRepo: Repository<Likes>,
  ) {}

  async findAllPostsOfUser(userName: string) {
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

  //find user exsist like
  async findUserExistLike(userName: string) {
    return this.userRepo.findOne({ where: { name: userName } });
  }

  async getProfileUrl(userName: string) {
    console.log('DataSource initialized:');
    return this.userRepo.findOne({ where: { name: userName } });
  }
}
