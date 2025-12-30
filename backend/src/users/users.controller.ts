import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserOtherUserDto } from 'src/users/userDto';
import { FindAllExceptMyPost, UrlDto } from 'src/dto/outputDto';
import { returnPost } from 'src/globals/types';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userName') // gets us the profile picture
  async getProfilepicture(@Param() UserDto: UserDto): Promise<UrlDto> {
    const profileUrl: UrlDto =
      await this.usersService.getProfilepicture(UserDto);
    return profileUrl;
  }

  @Get(':userName/:currentUser') // give us profile detailes, post and likes
  async getProfileInfo(
    @Param() userOtherUserDto: UserOtherUserDto,
  ): Promise<returnPost[]> {
    const profileInfo: returnPost[] =
      await this.usersService.getProfileInfo(userOtherUserDto);
    return profileInfo;
  }
}
