import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FindAllExceptMyPost {

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  profileUrl: string;
  
  @IsString()
  @IsNotEmpty()
  postImg: string;
  
  @IsString()
  @IsNotEmpty()
  createdDate: string;

  @IsNumber()
  @IsNotEmpty()
  likes: number;

  @IsBoolean()
  meLike: boolean;

}   

export class UrlDto {
      
  @IsString()
  @IsNotEmpty()
  profileUrl: string;

  constructor(profileUrl: string){
    this.profileUrl = profileUrl
  }
}


export class PostImage {
      
  @IsString()
  @IsNotEmpty()
  photoSrc: string;
  

  constructor(photoSrc: string){
    this.photoSrc = photoSrc
  }
}
