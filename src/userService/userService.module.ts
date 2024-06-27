import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './domain/service/user.service';
import { UserController } from './infrastructure/api/controller/user.controller';
import { UserEntity } from './infrastructure/persistence/entity/userEntity';
import { UserRepository } from './infrastructure/persistence/repository/userRepository';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationConfigurationModule } from 'src/authentifcation.configuration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/configuration/.env',
    }),
    AuthenticationConfigurationModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository,
  ],
  exports: [UserService],
})
export class UserServiceModule { }