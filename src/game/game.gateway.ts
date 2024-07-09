// src/game/game.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({ namespace: 'game' })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('joinGame')
  handleJoinGame(@MessageBody() data: { gameId: number }, @ConnectedSocket() client: Socket): void {
    client.join(`game_${data.gameId}`);
    client.emit('joinedGame', { message: 'You have joined the game' });
  }

  @SubscribeMessage('answerQuestion')
  handleAnswerQuestion(
    @MessageBody() data: { gameId: number; questionId: number; answerId: number },
    @ConnectedSocket() client: Socket,
  ): void {
    this.server.to(`game_${data.gameId}`).emit('questionAnswered', data);
  }
}
