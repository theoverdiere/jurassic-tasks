import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './userService/domain/service/userService';
import { UserController } from './userService/infrastructure/client/controller/userController';
import { UserEntity } from './userService/infrastructure/persistence/entity/userEntity';
import { UserRepository } from './userService/infrastructure/persistence/repository/userRepository';
import { UserServiceModule } from './userService/userService.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'jurassic_tasks',
      entities: [UserEntity],
      logging: true
    }),
    UserServiceModule
  ],

})
export class AppModule {

  
}