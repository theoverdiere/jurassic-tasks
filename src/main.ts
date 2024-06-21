import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as YAML from 'yaml';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const file = fs.readFileSync('./src/api/api.yaml', 'utf8');
    const swaggerDocument = YAML.parse(file);


  
  await app.listen(3000);

}


bootstrap();
