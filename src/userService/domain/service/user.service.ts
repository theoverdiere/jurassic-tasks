import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './user.service.interface';
import { User } from '../model/user.model';
import { UserRepository } from 'src/userService/infrastructure/persistence/repository/userRepository';

@Injectable()
export class UserService implements UserServiceInterface {

  constructor(private readonly userRepository: UserRepository) { }

  async create(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
}