import { Request, Response } from "express";
import { IUserInteractor } from "../interfaces/IUserInteractor";

export class UserController {
  private userInteractor: IUserInteractor;

  constructor(userInteractor: IUserInteractor) {
    this.userInteractor = userInteractor;
  }

  async OnLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      const token = await this.userInteractor.loginUser(email, password);
      return res.json({ token });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }

  async OnSignUp(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.userInteractor.signUpUser(email, password);
      return res.json({ token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
