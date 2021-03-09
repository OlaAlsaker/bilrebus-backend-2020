import { Player } from './../../players/entities/player.entity';
import { Game } from './../../games/entities/game.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Game, (game) => game.teams)
  game: Game;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @OneToOne(() => Player)
  @JoinColumn()
  creator: Player;
}
