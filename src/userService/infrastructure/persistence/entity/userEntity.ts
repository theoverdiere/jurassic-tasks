import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('user_entity')
@Unique(['email'])
export class UserEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'birth_date'})
  birthDate: Date;

  @Column({name: 'email'})
  email: string;

  @Column({name: 'first_name'})
  firstName: string;

  @Column({name: 'last_name'})
  lastName: string;
}