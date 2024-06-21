import { User } from "src/userService/domain/model/user.model";


export interface IUserRepository {

  create(user: User): Promise<User>;

  findByEmail(email: string): Promise<User | undefined>;
}