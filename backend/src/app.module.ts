import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/db.config';

@Module({
  imports: [  TypeOrmModule.forRoot({
      ...databaseConfig,
    }),UsersModule, PostsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
