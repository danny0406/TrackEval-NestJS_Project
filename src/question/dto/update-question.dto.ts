import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { ArrayMinSize, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdateAnswerDto } from 'src/answer/dto/update-answer.dto';
import { Type } from 'class-transformer';

export class UpdateQuestionDto {
    @IsNumber()
    @IsOptional()
    id?: number;
  
    @IsString()
    text: string;
  
    @ValidateNested({ each: true })
    @Type(() => UpdateAnswerDto)
    @ArrayMinSize(1)
    answers: UpdateAnswerDto[];
  }
