import { IUser } from "./IUser";

export interface IRegisterInteractor {
  registerTeam(
    teamCode: string,
    personOne: IUser,
    personTwo?: IUser,
    personThree?: IUser
  ): any;
  registerIndividual(teamCode: string, person: IUser): any;
}
