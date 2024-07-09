import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  findAll(): Promise<Game[]> {
    return this.gameRepository.find({ relations: ['questions', 'questions.answers'] });
  }

  findOne(id: number): Promise<Game> {
    return this.gameRepository.findOne({
        where: {id}, 
        relations: ['questions', 'questions.answers'],
    });
  }

  create(game: Game): Promise<Game> {
    return this.gameRepository.save(game);
  }
}
