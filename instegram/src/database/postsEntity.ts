import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Users } from './usersEntity';
import { Likes } from './likesEntity';

@Entity('posts')

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  photoSrc: string;

  @Column({ nullable: false })
  userName: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Users, user => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userName', referencedColumnName: 'name' })
  user: Users;

  @OneToMany(() => Likes, like => like.post)
  likes: Likes[];
}
