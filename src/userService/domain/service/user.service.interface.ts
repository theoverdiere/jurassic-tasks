import { User } from "../model/user.model";

export interface UserServiceInterface {
  
  create(user: User): Promise<User>;
  
  findByEmail(email: string): Promise<User | undefined>;

}