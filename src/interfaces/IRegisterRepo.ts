import { ObjectId } from "mongoose";
import { ITeam } from "./ITeam";
import { IUser } from "./IUser";
import { IEvent } from "./IEvent";

export interface IRegisterRepo {
  addTeam(
    teamCode: string,
    eventId: string,
    teamMembers: Array<ObjectId>
  ): Promise<ITeam>;
  addMobileNumber(mobileNumber: string, otp: string): any;
  findMobileNumber(mobileNumber: string): any;
  updateVerificationStatus(mobileNumber: string): any;
  updateOtp(mobileNumber: string, otp: string): any;
  findTeamCode(teamCode: string): Promise<ITeam | null>;
  addParticipants(participants: Array<IUser>): any;
  findEvent(eventId: string): Promise<IEvent | null>;
}
