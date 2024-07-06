import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    username: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsEnum(['t', 's', 'g'])
    usertype: string;
  
    @IsString()
    @IsEnum(['m', 'f'])
    gender: string;

  }