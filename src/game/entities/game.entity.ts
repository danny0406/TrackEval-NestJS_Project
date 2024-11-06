import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Player } from './player.entity';
import { MinLength } from 'class-validator';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  @MinLength(4)
  pin: string;

  @Column()
  quizId: number;

  @Column({ default: false })
  started: boolean;

  @OneToMany(() => Player, (player) => player.game)
  players: Player[];
}
