import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameGateway } from './game.gateway';

@Module({
 // imports: [TypeOrmModule.forFeature([Game, Question, Answer])],
  providers: [GameGateway],
})
export class GameModule {}
