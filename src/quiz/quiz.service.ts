import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Question } from 'src/question/entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  findAll(): Promise<Quiz[]> {
    return this.quizRepository.find({
      relations: ['questions', 'questions.answers'],
    });
  }

  async findOne(id: number): Promise<Quiz> {
    const quizFound = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.answers'],
    });
    if (!quizFound) {
      throw new NotFoundException(`No quiz found with id: ${id}`);
    }
    return quizFound;
  }

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = new Quiz();
    quiz.title = createQuizDto.title;
    quiz.questions = createQuizDto.questions.map((q) => {
      const question = new Question();
      question.text = q.text;
      question.answers = q.answers.map((a) => {
        const answer = new Answer();
        answer.text = a.text;
        answer.isCorrect = a.isCorrect;
        return answer;
      });
      return question;
    });

    return this.quizRepository.save(quiz);
  }

  async update(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quizFound = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.answers'],
    });
    if (!quizFound) {
      throw new NotFoundException(`No quiz found with id: ${id}`);
    }

    quizFound.title = updateQuizDto.title ?? quizFound.title;

    if (updateQuizDto.questions) {
      const updatedQuestions = await Promise.all(
        updateQuizDto.questions.map(async (q) => {
          let question = quizFound.questions.find(
            (existingQuestion) => existingQuestion.id === q.id,
          );
          if (!question) {
            question = new Question();
          }
          question.text = q.text;

          if (q.answers) {
            question.answers = q.answers.map((a) => {
              let answer = question.answers
                ? question.answers.find(
                    (existingAnswer) => existingAnswer.id === a.id,
                  )
                : null;
              if (!answer) {
                answer = new Answer();
              }
              answer.text = a.text;
              answer.isCorrect = a.isCorrect;
              return answer;
            });
          }
          return question;
        }),
      );
      quizFound.questions = updatedQuestions;
    }

    await this.quizRepository.save(quizFound);

    return this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.answers'],
    });
  }

  async remove(id: number) {
    const quizFound = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.answers'],
    });
    if (!quizFound) {
      throw new NotFoundException(`No quiz found with id: ${id}`);
    }

    return this.quizRepository.delete({ id });
  }

  async countQuestions(id: number): Promise<number> {
    const quizFound = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
    if (!quizFound) {
      throw new NotFoundException(`No quiz found with id: ${id}`);
    }
    return quizFound.questions.length;
  }
}
