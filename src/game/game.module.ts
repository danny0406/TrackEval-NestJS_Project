import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Question, Answer])],
  providers: [GameService, GameGateway],
  controllers: [GameController],
})
export class GameModule {}
