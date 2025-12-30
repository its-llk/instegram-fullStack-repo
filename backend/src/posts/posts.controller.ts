import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ImageToPostDto, LikeChangeDto, PhotoId } from 'src/posts/postDto';
import { UserDto } from 'src/users/userDto';
import { returnPost } from 'src/globals/types';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get(':userName') // get all posts for HomePage
  async findAllExceptMyPost(@Param() userdto: UserDto): Promise<returnPost[]> {
    console.log('In controller');
    const imgUserOutputDto: returnPost[] =
      await this.postService.findAllExceptMyPosts(userdto);
    return imgUserOutputDto;
  }

  @Post('/uploadImage') // post image
  async postImage(@Body() postImg: ImageToPostDto): Promise<string> {
    const imageData: string = await this.postService.postImage(postImg);
    return imageData;
  }

  @Delete('deletePost/:postId')
  async deleteImage(@Param() photoId: PhotoId): Promise<string> {
    return await this.postService.deleteImage(photoId);
  }

  @Post('postLike/:postId/:userName') // doing like on post
  async postLike(@Param() likeChangeDto: LikeChangeDto): Promise<string> {
    const imageData: string = await this.postService.postLike(likeChangeDto);
    return imageData;
  }

  @Delete('deleteLike/:postId/:userName') // deleting like from post
  async removeLike(@Param() likeChangeDto: LikeChangeDto): Promise<string> {
    return await this.postService.removeLike(likeChangeDto);
  }
}
