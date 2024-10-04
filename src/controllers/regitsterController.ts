import { Request, Response } from "express";
import { IRegisterInteractor } from "../interfaces/IRegisterInteractor";

export class RegisterController {
  private registerInteractor: IRegisterInteractor;

  constructor(registerInteractor: IRegisterInteractor) {
    this.registerInteractor = registerInteractor;
  }

  async OnRegister(req: Request, res: Response) {
    const { teamCode, personOne, personTwo, personThree } = req.body;

    const response = await this.registerInteractor.registerTeam(
      teamCode,
      personOne,
      personTwo,
      personThree
    );

    return res.status(200).json(response);
  }
}
