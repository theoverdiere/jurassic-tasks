import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/userEntity';
import { UserPersistenceMapper } from '../mapper/userPersistenceMapper';
import { User } from 'src/userService/domain/model/user.model';

@Injectable()
export class UserRepository {

  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
  }

  async create(user: User): Promise<User> {

    if(await this.findByEmail(user.email)){
      throw new ConflictException('Unable to save the user in database. Email already used');
    }

    const userEntity = UserPersistenceMapper.userToUserEntity(user);

    const userEntityCreated = await this.userRepository.save(userEntity);

    return UserPersistenceMapper.userEntityToUser(userEntityCreated);
  }

  async findByEmail(searchedEmail: string): Promise<User | null> {
    const userFound = await this.userRepository.findOne({ where: { email: searchedEmail } });
    return userFound ? UserPersistenceMapper.userEntityToUser(userFound) : null;
  }

}