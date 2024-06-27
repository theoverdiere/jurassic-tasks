import { Module } from '@nestjs/common';
import { AuthGuard, KeycloakConnectModule, KeycloakConnectOptions, PolicyEnforcementMode, RoleGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationTestController } from './authentication-test.controller';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'configuration/.env',
    }),
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) : KeycloakConnectOptions => ({
        authServerUrl: configService.get<string>('KEYCLOAK_URL'),
        realm: configService.get<string>('KEYCLOAK_REALM'),
        clientId: configService.get<string>('KEYCLOAK_CLIENT_ID'),
        secret: configService.get<string>('KEYCLOAK_CLIENT_SECRET'), 
        bearerOnly: configService.get<boolean>('KEYCLOAK_BEARER_ONLY'),
        useNestLogger: configService.get<boolean>('KEYCLOAK_NEST_LOGGING_ENABLED'), // Utilise le logger Nest pour les messages Keycloak
        // Activer l'interception des requêtes pour vérifier les rôles et les permissions
        // TODO voir pour variabiliser cela
        policyEnforcement: PolicyEnforcementMode.ENFORCING  
      })
    })
  ],
  providers: [
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
  controllers: [AuthenticationTestController],
  exports: [KeycloakConnectModule],
})
export class AuthenticationConfigurationModule { }