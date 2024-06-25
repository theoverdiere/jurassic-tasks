import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KeycloakConnectModule, KeycloakConnectOptions } from 'nest-keycloak-connect';
import keycloakConfig from './configuration/keycloak.config';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);  
    await app.listen(3000);

}


bootstrap();
