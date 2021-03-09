import { Game } from 'src/games/entities/game.entity';
export class CheckCode {
  id: number;
  title: string;
  gameCode: string;
  host: {
    id: number;
    creatorName: string;
  };

  constructor(partial: Partial<Game>) {
    Object.assign(this, partial);
  }
}
