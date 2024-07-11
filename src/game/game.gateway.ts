// src/game/game.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({ namespace: 'game' })
export class GameGateway 
implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connect ',client.id)
  }
  handleDisconnect(client: any) {
    console.log('Client disconnect ',client.id)
  }

  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('joinGame')
  handleJoinGame(@MessageBody() data: { gameId: number }, @ConnectedSocket() client: Socket): void {
    console.log(data)
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
