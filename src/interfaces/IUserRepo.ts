import { IUser } from "./IUser";

export interface IUserRepo {
  addUser(email: string, password: string): Promise<string>;
  findByEmail(email: string): Promise<string | null>;
  updateUser(email: string, password: string): Promise<string>;
}
