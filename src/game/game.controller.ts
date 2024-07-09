import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Game> {
    return this.gameService.findOne(id);
  }

  @Post()
  create(@Body() game: Game): Promise<Game> {
    return this.gameService.create(game);
  }
}
