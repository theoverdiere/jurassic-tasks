import { User } from "../model/user.model";

export interface IUserService {
  
  create(user: User): Promise<User>;
  
  findByEmail(email: string): Promise<User | undefined>;

}