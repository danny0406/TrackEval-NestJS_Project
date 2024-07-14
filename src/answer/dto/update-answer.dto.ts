import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
    @IsNumber()
    @IsOptional()
    id?: number;
}
