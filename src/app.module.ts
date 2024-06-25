import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './userService/infrastructure/persistence/entity/userEntity';
import { UserServiceModule } from './userService/userService.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'admin',
      database: 'user_service',
      entities: [UserEntity],
      logging: true
    }),
    UserServiceModule,
  ],

})
export class AppModule {

  
}