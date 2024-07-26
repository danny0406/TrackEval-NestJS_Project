import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { Gender } from 'src/enums/gender.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional()
    name?: string;

    @ApiPropertyOptional()
    lastname?: string;

    @ApiPropertyOptional()
    username?: string;

    @ApiPropertyOptional()
    email?: string;

    @ApiPropertyOptional()
    password?: string;

    @ApiPropertyOptional({ enum: Role })
    usertype?: Role;

    @ApiPropertyOptional({ enum: Gender})
    gender?: Gender;
}
