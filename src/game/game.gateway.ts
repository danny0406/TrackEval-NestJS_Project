import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, Injectable } from '@nestjs/common';
import { GameService } from './game.service';
import { QuizService } from 'src/quiz/quiz.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
@Injectable()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GameGateway');

  constructor(
    private readonly gamesService: GameService,
    private readonly quizService: QuizService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinGame')
  async handleJoinGame(
    client: Socket,
    payload: { pin: string; nickname: string },
  ) {
    try {
      const game = await this.gamesService.findByPin(payload.pin);

      if (!game) {
        client.emit('error', { message: 'Game not found' });
        return;
      }

      if (game.started) {
        client.emit('error', { message: 'Cannot join, game already started' });
        return;
      }

      client.join(game.id.toString());
      const player = await this.gamesService.addPlayer(
        game.id,
        payload.nickname,
      );
      this.server.to(game.id.toString()).emit('playerJoined', player);
    } catch (error) {
      this.logger.error(`Error in handleJoinGame: ${error.message}`);
      client.emit('error', {
        message: 'An error occurred while joining the game',
      });
    }
  }

  @SubscribeMessage('startGame')
  async handleStartGame(client: Socket, payload: { gameId: string }) {
    try {
      const game = await this.gamesService.findOne(payload.gameId);
      if (!game) {
        client.emit('error', { message: 'Game not found' });
        return;
      }

      const quiz = await this.quizService.findOne(game.quizId);
      if (!quiz) {
        client.emit('error', { message: 'Quiz not found' });
        return;
      }

      if (game.started) {
        client.emit('error', { message: 'Game already started' });
        return;
      }

      this.server.to(payload.gameId).emit('gameStarted', 'Start the Game');

      if (quiz.questions.length > 0) {
        this.sendQuestion(client, quiz.questions[0], payload.gameId);
      }
    } catch (error) {
      this.logger.error(`Error in handleStartGame: ${error.message}`);
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('nextQuestion')
  async handleNextQuestion(
    client: Socket,
    payload: { gameId: string; currentQuestionId: number },
  ) {
    try {
      const game = await this.gamesService.findOne(payload.gameId);
      if (!game) {
        client.emit('error', { message: 'Game not found' });
        return;
      }

      const quiz = await this.quizService.findOne(game.quizId);
      if (!quiz) {
        client.emit('error', { message: 'Quiz not found' });
        return;
      }

      const currentIndex = quiz.questions.findIndex(
        (q) => q.id === payload.currentQuestionId,
      );
      if (currentIndex === -1) {
        client.emit('error', { message: 'Current question not found' });
        return;
      }

      const nextQuestion = quiz.questions[currentIndex + 1];
      console.log(nextQuestion);
      if (nextQuestion) {
        this.sendQuestion(client, nextQuestion, payload.gameId);
        console.log('if ');
      } else {
        client.emit('lastQuestion', { message: 'This was the last question' });
        console.log('lastQuestion ');
      }
    } catch (error) {
      this.logger.error(`Error in handleNextQuestion: ${error.message}`);
      client.emit('error', {
        message: 'An error occurred while getting the next question',
      });
    }
  }

  @SubscribeMessage('submitAnswer')
  async handleSubmitAnswer(
    client: Socket,
    payload: { gameId: string; questionId: string; answerIds: number[] },
  ) {
    const { gameId, questionId, answerIds } = payload;

    try {
      const game = await this.gamesService.findOne(gameId);
      if (!game) {
        client.emit('error', { message: 'Game not found' });
        return;
      }

      const quiz = await this.quizService.findOne(game.quizId);
      if (!quiz) {
        client.emit('error', { message: 'Quiz not found' });
        return;
      }

      const question = quiz.questions.find(
        (q) => q.id === parseInt(questionId),
      );
      if (!question) {
        client.emit('error', {
          message: `Question not found id: ${questionId}`,
        });
        return;
      }

      const selectedAnswers = question.answers.filter((a) =>
        answerIds.includes(a.id),
      );
      if (selectedAnswers.length !== answerIds.length) {
        client.emit('error', { message: 'One or more answers not found' });
        return;
      }

      client.emit('answerReceived', {
        message: `Answer received ${payload.answerIds}`,
      });
    } catch (error) {
      this.logger.error(`Error in handleSubmitAnswer: ${error.message}`);
      client.emit('error', {
        message: 'An error occurred while submitting the answer',
      });
    }
  }
  @SubscribeMessage('endGame')
  async handleEndGame(client: Socket, payload: { gameId: string }) {
    try {
      const game = await this.gamesService.findOne(payload.gameId);
      if (!game) {
        client.emit('error', { message: 'Game not found' });
        return;
      }

      // Enviar mensaje de finalización a todos los clientes en el juego
      this.server
        .to(payload.gameId)
        .emit('gameEnded', { message: 'The game has ended' });

      // Desconectar a todos los clientes
      const clients = await this.server.in(payload.gameId).fetchSockets();
      clients.forEach((client) => {
        client.disconnect();
      });

      this.logger.log(
        `Game ended and all clients disconnected for gameId: ${payload.gameId}`,
      );
    } catch (error) {
      this.logger.error(`Error in handleEndGame: ${error.message}`);
      client.emit('error', {
        message: 'An error occurred while ending the game',
      });
    }
  }

  private sendQuestion(client: Socket, question: any, gameId: string) {
    this.server.to(gameId).emit('newQuestion', question);
  }
}
