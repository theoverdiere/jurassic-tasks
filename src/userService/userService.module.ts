import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './domain/service/userService';
import { UserController } from './infrastructure/client/controller/userController';
import { UserEntity } from './infrastructure/persistence/entity/userEntity';
import { UserRepository } from './infrastructure/persistence/repository/userRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService], 
})
export class UserServiceModule {}