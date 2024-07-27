import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateGameDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  pin: string;

  @ApiProperty()
  @IsInt()
  quizId: number;
}
