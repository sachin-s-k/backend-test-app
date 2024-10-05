import { IUser } from "./IUser";

export interface IRegisterInteractor {
  registerParticipant(
    teamCode: string,
    participantType: string,
    eventId: string,
    members: Array<IUser>
  ): any;
  registerIndividual(teamCode: string, person: IUser): any;
  verifiyMobileNumber(mobileNumber: string): any;
  verifyOtp(mobileNumber: string, otp: string): any;
  checkTeamCode(teamCode: string): any;
}
