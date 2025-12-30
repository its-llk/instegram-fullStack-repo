import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Likes } from './likesEntity';
import { Posts } from './postsEntity';

@Entity('users')
export class Users {
  @PrimaryColumn()
  name: string;

  @Column({ nullable: false })
  avatarSrc: string;

  @OneToMany(() => Posts, post => post.user)
  posts: Posts[];

  @OneToMany(() => Likes, like => like.user)
  likes: Likes[];
}
