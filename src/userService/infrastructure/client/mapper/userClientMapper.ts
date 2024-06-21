import { User } from "src/userService/domain/model/user.model";
import { UserDto } from "../dto/user.dto";

export class UserClientMapper {

	public static userToUserDTO(user: User): UserDto {
		const userDto = {
			email: user.email,
			birthDate: user.birthDate,
			firstName: user.firstName,
			lastName: user.lastName,
		};

		return userDto;
	}

	public static userDtoToUser(userDto: UserDto): UserDto {
		const user = {
			email: userDto.email,
			birthDate: userDto.birthDate,
			firstName: userDto.firstName,
			lastName: userDto.lastName,
		};

		return user;
	}
}