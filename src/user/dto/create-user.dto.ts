import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
import { Gender } from 'src/enums/gender.enum';
import { Role } from 'src/enums/role.enum';
  
  export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastname: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    username: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ enum: Role})
    @IsString()
    @IsEnum(Role)
    usertype: string;
  
    @ApiProperty({ enum: Gender})
    @IsString()
    @IsEnum(Gender)
    gender: string;

  }