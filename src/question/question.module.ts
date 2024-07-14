import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Question } from './entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz,Question,Answer])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
