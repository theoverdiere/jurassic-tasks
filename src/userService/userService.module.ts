import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './domain/service/user.service';
import { UserController } from './infrastructure/api/controller/user.controller';
import { UserEntity } from './infrastructure/persistence/entity/userEntity';
import { UserRepository } from './infrastructure/persistence/repository/userRepository';
import { AuthenticationController } from './infrastructure/api/controller/authentication.controller';
import { KeycloakClient } from './infrastructure/client/authentication.client';
import { AuthGuard, KeycloakConnectModule, RoleGuard } from 'nest-keycloak-connect';
import keycloakConfig from 'src/configuration/authentication/keycloak.config';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/configuration/.env',
    }),
    TypeOrmModule.forFeature([UserEntity]),
    KeycloakConnectModule.register(keycloakConfig),
  ],
  controllers: [UserController, AuthenticationController],
  providers: [UserService, UserRepository, KeycloakClient,
    
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the 
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },

    // TODO : voir s'il est nécessaire d'utiliser cette config de "resource"
    // // This adds a global level resource guard, which is permissive.
    // // Only controllers annotated with @Resource and 
    // // methods with @Scopes
    // // are handled by this guard.
    // {
    //   provide: APP_GUARD,
    //   useClass: ResourceGuard,
    // },


  ],
  exports: [UserService],
})
export class UserServiceModule { }