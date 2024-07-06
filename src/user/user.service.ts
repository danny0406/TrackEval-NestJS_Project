import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where:{
        username:user.username
      }
    })
    if(userFound){
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
    const hash = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, hash);
  
    const newUser = this.userRepository.create({ ...user, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number){
    const userFound = await this.userRepository.findOne({where:{ id }})
    if(!userFound){
      throw new NotFoundException(`No user found with id: ${id}`);
      //throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  return userFound;
  }

  async findByUsername(username: string){
    const userFound = await this.userRepository.findOne({where:{ username }})
    if(!userFound){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  return userFound;
  }


  async update(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({where:{ id }})
    if(!userFound){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
    const updateUser = Object.assign(userFound,user)
    return this.userRepository.save(updateUser);
  }

 async remove(id: number) {
    const userFound = await this.userRepository.findOne({where:{ id }})
    if(!userFound){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return this.userRepository.delete({id});
  }
}
