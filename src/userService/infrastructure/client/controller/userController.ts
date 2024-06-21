
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from 'src/userService/domain/service/userService';
import { UserClientMapper } from '../mapper/userClientMapper';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() userDto: UserDto): Promise<UserDto> {
    const user = UserClientMapper.userDtoToUser(userDto);
    return this.userService.create(user);
  }


  @Get(':email')
  async getByEmail(@Param('email') email: string): Promise<UserDto> {
    const user = await this.userService.findByEmail(email);
    return UserClientMapper.userToUserDTO(user);
  }
}