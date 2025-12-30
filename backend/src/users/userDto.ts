import { IsNotEmpty, IsString } from "class-validator";
export class UserOtherUserDto {
  
  @IsString()
  @IsNotEmpty()
  userName: string;
  
  @IsString()
  @IsNotEmpty()
  currentUser: string;
}

export class UserDto {
    
  @IsString()
  @IsNotEmpty()
  userName: string
}
