import { User } from './../../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from 'src/games/entities/game.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  alert: boolean;

  @Column({ nullable: true })
  publishedOn: Date;

  @Column({ default: false })
  published: boolean;

  @ManyToOne(() => Game, (game) => game.posts)
  game: Game;

  @ManyToOne(() => User)
  createdBy: User;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
