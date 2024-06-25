import { User } from "src/userService/domain/model/user.model";
import { UserDto } from "../dto/user.dto";
import { CreateUserDto } from "../dto/createUser.dto";

export class UserApiMapper {

  public static userToUserDTO(user: User): UserDto {
    const userDto = {
      email: user.email,
      birthDate: user.birthDate,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return userDto;
  }

  public static userDtoToUser(userDto: UserDto): User {
    const user = {
      email: userDto.email,
      birthDate: userDto.birthDate,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
    };

    return user;
  }


  public static createUserDtoToUser(createUserDto: CreateUserDto): User {
    const user = {
      email: createUserDto.email,
      birthDate: createUserDto.birthDate,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
    };
  
    return user;
  }
  
}