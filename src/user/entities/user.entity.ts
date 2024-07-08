import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer'

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  lastname: string;

  @Exclude()
  @Column({ type: 'varchar', length: 15, unique: true })
  username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 40})
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Exclude()
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



  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password)
  }
}