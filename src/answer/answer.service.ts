import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = this.answerRepository.create(createAnswerDto);
    return this.answerRepository.save(answer);
  }

  findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }

  async findOne(id: number): Promise<Answer> {
    const answer = await this.answerRepository.findOne({ where: { id } });
    if (!answer) {
      throw new NotFoundException(`Answer with id ${id} not found`);
    }
    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const answer = await this.findOne(id);
    this.answerRepository.merge(answer, updateAnswerDto);
    return this.answerRepository.save(answer);
  }

  async remove(id: number): Promise<void> {
    const answer = await this.findOne(id);
    await this.answerRepository.delete(answer.id);
  }
}
