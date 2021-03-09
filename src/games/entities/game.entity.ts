import { User } from './../../users/user.entity';
import { Team } from './../../teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Transform, Type } from 'class-transformer';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  gameCode: string;

  @OneToMany(() => Team, (team) => team.game)
  teams: Team[];

  @Transform(({ value }) => ({ id: value.id, creatorName: value.creatorName }))
  @ManyToOne(() => User, (user) => user.games)
  @JoinColumn({ name: 'host' })
  host: User;

  @OneToMany(() => Post, (post) => post.game)
  @JoinTable()
  posts: Post[];
}
