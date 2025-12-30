import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ImageToPostDto {
  
  @IsString()
  @IsNotEmpty()
  photoSrc: string;

  @IsString()
  @IsNotEmpty()
  userName: string;
}

export class LikeChangeDto {

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsString()
  @IsNotEmpty()
  userName: string;
}   
export class PhotoId {

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  constructor(postId: number){
    this.postId = postId
  }
}