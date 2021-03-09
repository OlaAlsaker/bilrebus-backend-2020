import { Game } from './entities/game.entity';
import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  findByCode(gameCode: string) {
    return this.gamesRepository.findOne({
      where: { gameCode },
      relations: ['host'],
    });
  }

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  findAll(options?: DeepPartial<Game>): Promise<Game[]> {
    return this.gamesRepository.find({ relations: ['teams'] });
  }

  findOne(options?: DeepPartial<Game>): Promise<Game> {
    return this.gamesRepository.findOne(options);
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }

  async getGameWithPosts(gameId: number) {
    return this.gamesRepository.findOne({
      where: { id: gameId },
      relations: ['posts', 'host'],
    });
  }
}
