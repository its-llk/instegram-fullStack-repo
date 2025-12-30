import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Posts } from './postsEntity';
import { Users } from './usersEntity';

@Entity('likes')
export class Likes {
  @PrimaryColumn({ type: 'int' })
  postId: number;

  @PrimaryColumn({ type: 'varchar' })
  userName: string;

  @ManyToOne(() => Posts, post => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Posts;

  @ManyToOne(() => Users, user => user.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userName', referencedColumnName: 'name' })
  user: Users;
}
