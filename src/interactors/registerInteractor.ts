import { IRegisterInteractor } from "../interfaces/IRegisterInteractor";
import { IUser } from "../interfaces/IUser";

class RegisterInteractor implements IRegisterInteractor {
  async registerTeam(
    teamCode: string,
    personOne: IUser,
    personTwo?: IUser,
    personThree?: IUser
  ) {}
  registerIndividual(teamCode: string, person: IUser) {}
}
