import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/enums/role.enum';

@ApiTags('Quizzes')
@ApiBearerAuth()
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({ status: 200, description: 'List of quizzes.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.quizService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create quiz' })
  @ApiResponse({
    status: 201,
    description: 'The quiz has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz by ID' })
  @ApiResponse({ status: 200, description: 'The found quiz.' })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(@Param('id') id: number) {
    return this.quizService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update quiz' })
  @ApiResponse({
    status: 200,
    description: 'The quiz has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(@Param('id') id: number, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @Roles(Role.Teacher)
  @ApiOperation({ summary: 'Delete quiz' })
  @ApiResponse({
    status: 200,
    description: 'The quiz has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  remove(@Param('id') id: number) {
    return this.quizService.remove(id);
  }
}
