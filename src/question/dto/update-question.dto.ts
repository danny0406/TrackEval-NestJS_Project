import {
  ArrayMinSize,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateAnswerDto } from 'src/answer/dto/update-answer.dto';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  text: string;

  @ApiPropertyOptional({
    type: [UpdateAnswerDto],
    description: 'Array of answers for the question',
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerDto)
  @ArrayMinSize(1)
  @IsOptional()
  answers?: UpdateAnswerDto[];
}
