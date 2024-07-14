import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from '../../question/entities/question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar'})
  title: string;

  @OneToMany(() => Question, (question) => question.quiz,{cascade:true})
  questions: Question[];
}
