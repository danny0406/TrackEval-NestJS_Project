import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { Player } from './entities/player.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { QuizService } from 'src/quiz/quiz.service';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    private quizService: QuizService,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const quiz = await this.quizService.findOne(createGameDto.quizId);
    if (!quiz) {
      throw new NotFoundException(`No quiz found with id: ${createGameDto.quizId}`);
    }
    const game = new Game();
    game.title = createGameDto.title;
    const findPin = await this.findByPin(createGameDto.pin);
    if (findPin) {
      throw new ConflictException('Pin already exists.');
    }
    game.pin = createGameDto.pin;
    game.quizId = createGameDto.quizId; 

    return this.gameRepository.save(game);
  }

  findOne(id: string): Promise<Game> {
    return this.gameRepository.findOneBy({ id: Number(id) });
  }

  findByPin(pin: string): Promise<Game> {
    return this.gameRepository.findOneBy({ pin });
  }

  async startGame(id: string): Promise<void> {
    const game = await this.gameRepository.findOneBy({ id: Number(id) });
    if (game) {
      game.started = true;
      await this.gameRepository.save(game);
    }
  }

  async addPlayer(gameId: number, nickname: string): Promise<Player> {
    const game = await this.findOne(gameId.toString());
    if (game) {
      const player = new Player();
      player.nickname = nickname;
      player.game = game;
      return this.playersRepository.save(player);
    }
    throw new Error('Game not found');
  }

  findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.gameRepository.delete(id);
  }
}
