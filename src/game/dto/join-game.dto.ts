import { IsString } from "class-validator";

export class JoinGameDto {
    @IsString()
    pin: string;
    @IsString()
    nickname: string;
  }
  