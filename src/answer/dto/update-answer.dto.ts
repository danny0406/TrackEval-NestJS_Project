import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiPropertyOptional()
    text?: string;

    @ApiPropertyOptional()
    isCorrect?: boolean;
}
