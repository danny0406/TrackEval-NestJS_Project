import { ArrayMinSize, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateQuestionDto } from 'src/question/dto/update-question.dto';

export class UpdateQuizDto {
    @IsString()
    @IsOptional()
    title?: string;
  
    @ValidateNested({ each: true })
    @Type(() => UpdateQuestionDto)
    @ArrayMinSize(1)
    @IsOptional()
    questions?: UpdateQuestionDto[];
  }