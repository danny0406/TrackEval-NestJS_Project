import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JoinGameDto {
  @ApiProperty()
  @IsString()
  pin: string;

  @ApiProperty()
  @IsString()
  nickname: string;
}
