import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  findAll(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['answers'] });
  }

  findOne(id: number): Promise<Question> {
    return this.questionRepository.findOne({where:{id},  relations: ['answers'] });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    await this.questionRepository.update(id, updateQuestionDto);
    return this.questionRepository.findOne({where:{id},  relations: ['answers'] });
  }

  async remove(id: number): Promise<void> {
    await this.questionRepository.delete(id);
  }
}
