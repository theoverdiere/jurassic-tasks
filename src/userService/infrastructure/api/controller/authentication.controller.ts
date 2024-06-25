import { Post, Body, Controller } from "@nestjs/common";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserService } from "src/userService/domain/service/user.service";
import { KeycloakClient } from "../../client/authentication.client";
import { UserApiMapper } from "../mapper/userApi.mapper";
import { UserDto } from "../dto/user.dto";
import { Unprotected } from "nest-keycloak-connect";

@Controller('register')
export class AuthenticationController {

    constructor(private readonly userService: UserService, private readonly authenticationClient: KeycloakClient) {}

    @Post()
    @Unprotected()
    async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {

      console.log('register : createUserDto', createUserDto);

      // TODO: voir comment rollback si la création via keycloak n'abouti pas
      const userCreated =  await this.userService.create(UserApiMapper.createUserDtoToUser(createUserDto));
      
      // await this.authenticationClient.createUserInKeycloak(createUserDto.email, createUserDto.email);

      return UserApiMapper.userToUserDTO(userCreated);
    }

}