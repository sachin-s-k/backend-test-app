import { User } from "../entities/userEntity";
import { IUser } from "../interfaces/IUser";
import { IUserRepo } from "../interfaces/IUserRepo";

export class UserRepo implements IUserRepo {
  async addUser(email: string, password: string): Promise<string> {
    const user = await User.create({ email, password, isSignedUp: true });

    return user.email;
  }
  async findByEmail(email: string): Promise<any> {
    const userData: any = await User.findOne({ email });
    if (userData) {
      return userData;
    } else {
      return userData;
    }
  }
}
