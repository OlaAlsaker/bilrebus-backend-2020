import { Game } from './entities/game.entity';
import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), PostsModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
