import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = this.answerRepository.create(createAnswerDto);
    return this.answerRepository.save(answer);
  }

  findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }

  findOne(id: number): Promise<Answer> {
    return this.answerRepository.findOne({where: {id},});
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    await this.answerRepository.update(id, updateAnswerDto);
    return this.answerRepository.findOne({where: {id},});
  }

  async remove(id: number): Promise<void> {
    await this.answerRepository.delete(id);
  }
}

