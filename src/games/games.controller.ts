import { PostsService } from './../posts/posts.service';
import { Game } from './entities/game.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { CheckCode } from './models/check-code.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('games')
export class GamesController {
  constructor(
    private gamesService: GamesService,
    private postsService: PostsService,
  ) {}

  @Get('check-code')
  async checkGameCode(@Query('gameCode') gameCode: string): Promise<CheckCode> {
    return this.gamesService.findByCode(gameCode);
  }

  @Get(':gameId')
  async getGame(@Param('gameId') gameId: number): Promise<Game> {
    return this.gamesService.getGameWithPosts(gameId);
  }

  @Get(':gameId/posts')
  async getGamePosts(@Param('gameId') gameId: number) {
    const game = await this.gamesService.findOne({ id: gameId });
    return this.postsService.getPublishedPosts(game);
  }
}
