import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  findAll(){
    return this.gameService.findAll();
  }

  @Public()
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(id);
  }

  @Post(':id/start')
  start(@Param('id') id: string) {
    return this.gameService.startGame(id);
  }
}
