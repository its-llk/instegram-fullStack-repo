import {Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor( private readonly usersService: UsersService) { }
    
    @Get(':userName')// gets us the profile picture
    getProfilepicture(@Param('userName') userName: string){
        console.log(userName)
        return this.usersService.getProfilepicture(userName)
    }

    @Get(':userName/:currentUser')// give us profile detailes, post and likes
    getProfileInfo(@Param('userName') userName:  string, @Param('currentUser') currentUser :  string){
        return this.usersService.getProfileInfo(userName,currentUser)
    }

    
}
