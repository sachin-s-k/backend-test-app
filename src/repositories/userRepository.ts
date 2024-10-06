import { User } from "../entities/userEntity";
import { IUser } from "../interfaces/IUser";
import { IUserRepo } from "../interfaces/IUserRepo";

export class UserRepo implements IUserRepo {
  async addUser(email: string, password: string): Promise<IUser> {
    const user: IUser = await User.create({
      email,
      password,
      isSignedUp: true,
    });

    return user;
  }
  async findByEmail(email: string): Promise<any> {
    const userData: any = await User.findOne({ email });
    if (userData) {
      return userData;
    } else {
      return userData;
    }
  }

  async updateUser(email: string, password: string) {
    const userData: any = await User.findOneAndUpdate(
      { email },
      { password, isSignedUp: true }
    );
    if (userData) {
      return userData;
    } else {
      return userData;
    }
  }
}
