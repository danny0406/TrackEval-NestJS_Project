import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, NotFoundException, Injectable } from '@nestjs/common';
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

      if (game) {
        client.join(game.id.toString());
        const player = await this.gamesService.addPlayer(
          game.id,
          payload.nickname,
        );
        this.server.to(game.id.toString()).emit('playerJoined', player);
      } else {
        client.emit('error', { message: 'Game not found' });
      }
    } catch (error) {
      this.logger.error(`Error in handleJoinGame: ${error.message}`);
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('startGame')
  async handleStartGame(client: Socket, payload: { gameId: string }) {
    try {
      const game = await this.gamesService.findOne(payload.gameId);
      if (!game) {
        throw new NotFoundException('Game not found');
      }

      const quiz = await this.quizService.findOne(game.quizId);
      if (!quiz) {
        throw new NotFoundException('Quiz not found');
      }

      if (quiz.questions.length > 0) {
        this.sendQuestion(client, quiz.questions[0], payload.gameId);
      }
      this.server.to(payload.gameId).emit('gameStarted', 'Start the Game');
    } catch (error) {
      this.logger.error(`Error in handleStartGame: ${error.message}`);
      client.emit('error', { message: error.message });
    }
  }

  private sendQuestion(client: Socket, question: any, gameId: string) {
    this.server.to(gameId).emit('newQuestion', question);
  }

  @SubscribeMessage('submitAnswer')
  async handleSubmitAnswer(
    client: Socket,
    payload: { gameId: string; questionId: string; answer: string },
  ) {
    const { gameId, questionId, answer } = payload;

    try {
      const game = await this.gamesService.findOne(gameId);
      if (!game) {
        throw new NotFoundException('Game not found');
      }

      const quiz = await this.quizService.findOne(game.quizId);
      if (!quiz) {
        throw new NotFoundException('Quiz not found');
      }

      const question = quiz.questions.find((q) => q.id === parseInt(questionId));
      if (!question) {
        throw new NotFoundException('Question not found');
      }

      const selectedAnswer = question.answers.find((a) => a.text === answer);
      if (!selectedAnswer) {
        throw new NotFoundException('Answer not found');
      }

      const isCorrect = selectedAnswer.isCorrect;
      client.emit('answerResult', { success: true, isCorrect });

      // Emitir a todos los jugadores que esta pregunta ha sido respondida
      this.server.to(gameId).emit('answerSubmitted', { questionId, isCorrect });

      // Encontrar el índice de la pregunta actual y enviar la siguiente si existe
      const currentQuestionIndex = quiz.questions.findIndex(q => q.id === parseInt(questionId));
      if (currentQuestionIndex < quiz.questions.length - 1) {
        this.sendQuestion(client, quiz.questions[currentQuestionIndex + 1], gameId);
      } else {
        // Si no hay más preguntas, finalizar el juego
        this.server.to(gameId).emit('gameEnded', 'Game has ended');
      }
    } catch (error) {
      this.logger.error(`Error in handleSubmitAnswer: ${error.message}`);
      client.emit('answerResult', {
        success: false,
        message: error.message,
      });
    }
  }
}
