import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Game } from './game.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @ManyToOne(() => Game, game => game.questions)
  game: Game;

  @OneToMany(() => Answer, answer => answer.question)
  answers: Answer[];
}
