import { Entity, Column, Unique, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


@Unique(['email'])
@Entity('user_entity')
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