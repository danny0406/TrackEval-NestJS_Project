import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer'
import { Role } from 'src/enums/role.enum';
import { Gender } from 'src/enums/gender.enum';

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
  @Column({ type: 'enum', enum: Role })
  usertype: string;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password)
  }

  roles: Role[];
}