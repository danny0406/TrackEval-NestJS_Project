import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; 

  @Column()
  pin: string;

  @Column()
  quizId: number;  

  @Column({ default: false })
  started: boolean;

  @OneToMany(() => Player, player => player.game)
  players: Player[];
}
