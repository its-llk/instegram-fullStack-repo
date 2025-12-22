
// @Controller('users')
// export class UsersController {

//     constructor( private readonly usersService: UsersService) { }
    
//     @Get(':userName')// gets us the profile picture
//     async getProfilepicture(@Param('userName') UserDto: UserDto
//     ):Promise<UrlDto>{
//         const profileUrl: UrlDto = await this.usersService.getProfilepicture(UserDto.userName)
//         return profileUrl
//     }

//     @Get(':userName/:currentUser')// give us profile detailes, post and likes
//     async getProfileInfo(@Param() userOtherUserDto: UserOtherUserDto
//     ):Promise<ImgUserOutputDto[]> {
//         const profileInfo: ImgUserOutputDto[] = await this.usersService.getProfileInfo(userOtherUserDto)
//         return profileInfo

//     }

import {Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto,UserOtherUserDto } from 'src/dto/userDto';
import { FindAllExceptMyPost, UrlDto } from 'src/dto/outputDto';

@Controller('users')
export class UsersController {

    constructor( private readonly usersService: UsersService) { }
    
    @Get(':userName')// gets us the profile picture
    async getProfilepicture(@Param() UserDto: UserDto
    ):Promise<UrlDto>{
        const profileUrl: UrlDto = await this.usersService.getProfilepicture(UserDto)
        return profileUrl
    }

    @Get(':userName/:currentUser')// give us profile detailes, post and likes
    async getProfileInfo(@Param() userOtherUserDto: UserOtherUserDto
    ):Promise<FindAllExceptMyPost[]> {
        const profileInfo: FindAllExceptMyPost[] = await this.usersService.getProfileInfo(userOtherUserDto)
        return profileInfo

    }

    
}

