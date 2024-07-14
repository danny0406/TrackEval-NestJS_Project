import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    text: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAnswerDto)
    @ArrayMinSize(1)
    answers: CreateAnswerDto[];
  }
  