import { IUser } from "./IUser";

export interface IUserInteractor {
  signUpUser(email: string, password: string): Promise<string>;
  loginUser(email: string, password: string): Promise<any>;
}
