import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ImageToPostDto, LikeChangeDto, PhotoId } from 'src/dto/postDto';
import { UserDto } from 'src/dto/userDto';
import { FindAllExceptMyPost, PostImage } from 'src/dto/outputDto';
import { DeleteResult } from 'typeorm';

@Controller('posts')
export class PostsController {

    constructor( private readonly postService: PostsService) { }

    @Get(':userName')// get all posts for HomePage
    async findAllExceptMyPost(@Param() userdto : UserDto
    ):Promise<FindAllExceptMyPost[]>{
        const imgUserOutputDto:FindAllExceptMyPost[] = await this.postService.findAllExceptMyPosy(userdto)
        return imgUserOutputDto
    }

    @Post()
    async postImage(@Body() postImg: ImageToPostDto
    ):Promise<PostImage>{
        const imageData: PostImage = await this.postService.postImage(postImg)
        return imageData
    }

    @Delete(':postId')
    async deleteImage(@Param() photoId: PhotoId
    ):Promise<DeleteResult>{
        return await this.postService.deleteImage(photoId)
    }
    
    @Post(':postId/:userName')// doing like on post
    async postLike(@Param() likeChangeDto : LikeChangeDto
    ):Promise<LikeChangeDto>{
        const imageData:LikeChangeDto = await this.postService.postLike(likeChangeDto)    
        return imageData
    }

    @Delete(':postId/:userName')// deleting like from post
    async removeLike(@Param() likeChangeDto : LikeChangeDto
    ):Promise<DeleteResult>{
        return await this.postService.removeLike(likeChangeDto)    
    }


}
