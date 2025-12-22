import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from 'src/database/usersEntity';
import { Posts } from 'src/database/postsEntity';
import { Likes } from 'src/database/likesEntity';
import { DBUtil } from 'src/database/db-util';

@Module({
      imports: [
    TypeOrmModule.forFeature([Users, Posts, Likes])  // ← חובה!!
  ],
    controllers:[UsersController],
    providers:[UsersService,DBUtil]
})
export class UsersModule {}
