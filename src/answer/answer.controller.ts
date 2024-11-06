import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Answers')
@ApiBearerAuth()
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @ApiOperation({ summary: 'Create answer' })
  @ApiResponse({
    status: 201,
    description: 'The answer has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all answers' })
  @ApiResponse({ status: 200, description: 'List of answers.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get answer by ID' })
  @ApiResponse({ status: 200, description: 'The found answer.' })
  @ApiResponse({ status: 404, description: 'Answer not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(@Param('id') id: number) {
    return this.answerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update answer' })
  @ApiResponse({
    status: 200,
    description: 'The answer has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Answer not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(@Param('id') id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @Roles(Role.Teacher)
  @ApiOperation({ summary: 'Delete answer' })
  @ApiResponse({
    status: 200,
    description: 'The answer has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Answer not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  remove(@Param('id') id: number) {
    return this.answerService.remove(id);
  }
}
