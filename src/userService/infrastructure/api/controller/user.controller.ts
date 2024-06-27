
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserApiMapper } from '../mapper/userApi.mapper';
import { UserService } from 'src/userService/domain/service/user.service';
import { AuthGuard, RoleGuard, Roles } from 'nest-keycloak-connect';


@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/adherent/:email')
  @UseGuards(RoleGuard)
  @Roles({roles :['ADHERENT']})
  async getByEmailAsAdherent(@Param('email') email: string): Promise<UserDto> {
    const user = await this.userService.findByEmail(email);
    return UserApiMapper.userToUserDTO(user);
  }

  @Get('/admin/:email')
  @UseGuards(AuthGuard)
  @Roles({roles :['ADMINISTRATEUR']})
  async getByEmailAsAdmin(@Param('email') email: string): Promise<UserDto> {
    const user = await this.userService.findByEmail(email);
    return UserApiMapper.userToUserDTO(user);
  }

  @Get('/all/:email')
  async getByEmailAsAll(@Param('email') email: string): Promise<UserDto> {
    const user = await this.userService.findByEmail(email);
    return UserApiMapper.userToUserDTO(user);
  } 

}