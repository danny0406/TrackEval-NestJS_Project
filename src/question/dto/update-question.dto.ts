import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { ArrayMinSize, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdateAnswerDto } from 'src/answer/dto/update-answer.dto';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuestionDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiPropertyOptional()
    @IsString()
    text: string;
  
    @ApiPropertyOptional({type:'array',items:{example:{"id":0,"text":"string","isCorrect":true}}})
    @ValidateNested({ each: true })
    @Type(() => UpdateAnswerDto)
    @ArrayMinSize(1)
    answers?: UpdateAnswerDto[];
  }
