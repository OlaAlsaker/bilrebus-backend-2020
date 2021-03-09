import { Game } from './../games/entities/game.entity';
import { Exclude, Transform, Type } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  creatorName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Game, (game) => game.host)
  games: Game[];
}
