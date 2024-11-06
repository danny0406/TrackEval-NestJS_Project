import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  text?: string;

  @ApiPropertyOptional()
  @IsOptional()
  isCorrect?: boolean;
}
