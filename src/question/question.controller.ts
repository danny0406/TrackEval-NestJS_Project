import { Controller, Post, Body, Get, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
    return await this.questionService.create(createQuestionDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Question> {
    const question = await this.questionService.findOne(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  @Get()
  async findAll(): Promise<Question[]> {
    return await this.questionService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.questionService.remove(id);
  }
}
