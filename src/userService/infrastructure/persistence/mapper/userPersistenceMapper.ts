import { User } from "src/userService/domain/model/user.model";
import { UserEntity } from "../entity/userEntity";

export class UserPersistenceMapper {

  public static userToUserEntity(user: User): UserEntity {
    const userEntity = {
      email: user.email,
      birthDate: user.birthDate,
      firstName: user.firstName,
      lastName: user.lastName
    };

    return userEntity;
  }

  public static userEntityToUser(userEntity: UserEntity): User {
    const user = {
      email: userEntity.email,
      birthDate: userEntity.birthDate,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
    };

    return user;
  }
}