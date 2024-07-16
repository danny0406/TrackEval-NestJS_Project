import { IsInt, IsString } from "class-validator";

export class CreateGameDto {

    @IsString()
    title: string;
    
    @IsString()
    pin: string;

    @IsInt()
    quizId: number;
  }
  