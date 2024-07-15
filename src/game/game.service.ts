import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { Player } from './entities/player.entity';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  create(createGameDto: CreateGameDto): Promise<Game> {
    const game = new Game();
    game.title = createGameDto.title;
    game.pin = createGameDto.pin;
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

  async remove(id: string): Promise<void> {
    await this.gameRepository.delete(id);
  }
}
