import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Player } from './entities/player.entity';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Player]),QuizModule],
  providers: [GameService, GameGateway],
  controllers: [GameController],
})
export class GameModule {}
