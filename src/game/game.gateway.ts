import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // Permitir solicitudes desde esta URL
    methods: ['GET', 'POST'],
    credentials: true
  }
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GameGateway');

  constructor(private readonly gamesService: GameService) {}

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinGame')
  async handleJoinGame(client: Socket, payload: { pin: string, nickname: string }) {

    const game = await this.gamesService.findByPin(payload.pin);

    if (game) {
      client.join(game.id.toString());
      const player = await this.gamesService.addPlayer(game.id, payload.nickname);
      this.server.to(game.id.toString()).emit('playerJoined', player);
    } else {
      client.emit('error', { message: 'Game not found' });
    }
  }

  @SubscribeMessage('startGame')
  async handleStartGame(client: Socket, payload: { gameId: string }) {
    await this.gamesService.startGame(payload.gameId);
    this.server.to(payload.gameId).emit('gameStarted','Start the GAME!!!');
  }

  @SubscribeMessage('submitAnswer')
  async handleSubmitAnswer(client: Socket, payload: { gameId: string, questionId: string, answer: string }) {
    // Procesar la respuesta
  }
}
