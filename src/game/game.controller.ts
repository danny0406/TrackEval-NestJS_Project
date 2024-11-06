import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Game')
@ApiBearerAuth()
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all games' })
  @ApiResponse({ status: 200, description: 'Games retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.gameService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({ status: 201, description: 'Game created successfully.' })
  @ApiResponse({ status: 409, description: 'Pin already exists.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'No quiz found with the given ID.' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a game by ID' })
  @ApiResponse({ status: 200, description: 'Game retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'No game found with the given ID.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Delete(':id')
  @Roles(Role.Teacher)
  @ApiOperation({ summary: 'Delete a game by ID' })
  @ApiResponse({ status: 200, description: 'Game deleted successfully.' })
  @ApiResponse({ status: 404, description: 'No game found with the given ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  remove(@Param('id') id: string) {
    return this.gameService.remove(id);
  }

  @Post(':id/start')
  @Roles(Role.Teacher)
  @ApiOperation({ summary: 'Start a game by ID' })
  @ApiResponse({ status: 201, description: 'Game started successfully.' })
  @ApiResponse({ status: 404, description: 'No game found with the given ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  start(@Param('id') id: string) {
    return this.gameService.startGame(id);
  }
}
