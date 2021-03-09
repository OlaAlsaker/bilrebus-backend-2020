import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Game } from 'src/games/entities/game.entity';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsBoolean()
  alert: boolean;

  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @IsNotEmpty()
  game: Game;
}
