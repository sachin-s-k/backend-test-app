import { IUserInteractor } from "../interfaces/IUserInteractor";
import jwt from "jsonwebtoken";
import { IUserRepo } from "../interfaces/IUserRepo";
import {
  comparePassword,
  hashPassword,
} from "../infrastructure/utils/encryption";
import { IUser } from "../interfaces/IUser";

export class UserInteractor implements IUserInteractor {
  private userRepository: IUserRepo;
  constructor(userRepository: IUserRepo) {
    this.userRepository = userRepository;
  }

  async signUpUser(email: string, password: string): Promise<string> {
    const existingUser: any = await this.userRepository.findByEmail(email);

    if (existingUser) {
      if (existingUser.isSignedUp) {
        throw new Error("User with this email already exists");
      } else {
        const encryptedPassword: string = await hashPassword(password);
        const userData: IUser = await this.userRepository.updateUser(
          email,
          encryptedPassword
        );

        return this.generateToken(userData.email, userData._id);
      }
    } else {
      const encryptedPassword: string = await hashPassword(password);
      const userData: IUser = await this.userRepository.addUser(
        email,
        encryptedPassword
      );

      return this.generateToken(userData.email, userData._id);
    }
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    const userData: any = await this.userRepository.findByEmail(email);
    if (!userData || (userData.email && !userData.isSignedUp)) {
      throw new Error(
        "Account not found. Please sign up to create an account."
      );
    }

    if (!userData || !(await comparePassword(password, userData.password))) {
      throw new Error("Invalid email or password");
    } else {
      return this.generateToken(userData.email, userData._id);
    }
  }

  private generateToken(email: string, userId: any) {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "2h",
    });
  }
}
