import { IsNotEmpty, IsString } from "class-validator"

export class SignInAuthDto {

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    username: string
}
