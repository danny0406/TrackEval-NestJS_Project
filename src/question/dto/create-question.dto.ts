import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    text: string;
    
    @ApiProperty({type:'array',items:{example:{"text":"string","isCorrect":true}}})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAnswerDto)
    @ArrayMinSize(1)
    answers: CreateAnswerDto[];
  }
  