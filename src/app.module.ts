import { Module } from '@nestjs/common';
import { UserServiceModule } from './userService/userService.module';
import { DatabaseModule } from './database.module';
import { AuthenticationConfigurationModule } from './authentifcation.configuration.module';


@Module({
  imports: [
    DatabaseModule,
    AuthenticationConfigurationModule,
    UserServiceModule
  ],

})
export class AppModule {


}