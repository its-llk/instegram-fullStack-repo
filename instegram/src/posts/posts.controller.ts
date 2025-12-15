import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor( private readonly postService: PostsService) { }

    @Get(':userName')// get all posts for HomePage
    findAllExceptMyPost(@Param('userName',) userName : string){
        console.log('heyyyyy')
        return this.postService.findAllExceptMyPosy(userName)
    }

    @Post()
    postImage(@Body() postImg:{photoSrc : string, userName: string}){
        console.log(postImg)
        return this.postService.postImage(postImg)

    }
    
    @Post(':postId/:userName')// doing like on post
    postLike(@Param('postId',ParseIntPipe) postId : number, @Param('userName') userName : string){
        return this.postService.postLike(postId,userName)
    }

    @Delete(':postId/:userName')// deleting like from post
    removeLike(@Param('postId',ParseIntPipe) postId : number, @Param('userName') userName : string){
        return this.postService.removeLike(postId,userName)    
    }


}
