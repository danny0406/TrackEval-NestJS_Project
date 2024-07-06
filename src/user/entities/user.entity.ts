import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  lastname: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 40})
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['t', 's', 'g'] })
  /**
   * t - teacher
   * s - student
   * g - guest
   */
  usertype: string;

  @Column({ type: 'enum', enum: ['m', 'f'] })
  /**
   * m - male
   * f - feminine
   */
  gender: string;
}