import {
  ArrayMinSize,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateQuestionDto } from 'src/question/dto/update-question.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuizDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ type: [UpdateQuestionDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  @ArrayMinSize(1)
  @IsOptional()
  questions?: UpdateQuestionDto[];
}
