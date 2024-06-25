import { Module } from '@nestjs/common';
import { UserServiceModule } from './userService/userService.module';
import { DatabaseModule } from './database.module';


@Module({
  imports: [
    DatabaseModule,
    UserServiceModule
  ],

})
export class AppModule {


}