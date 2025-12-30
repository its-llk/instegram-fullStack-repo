import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database/usersEntity';
import { Posts } from 'src/database/postsEntity';
import { Likes } from 'src/database/likesEntity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsDBUtil } from './posts-dbUtils';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Posts, Likes]), // ← חובה!!
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsDBUtil],
})
export class PostsModule {}
