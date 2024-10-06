import { ObjectId } from "mongoose";
import { IParticipants } from "./IParticipants";
import { IUser } from "./IUser";
import { IEvent } from "./IEvent";

export interface IRegisterRepo {
  addTeam(
    teamCode: string,
    eventId: string,
    teamMembers: Array<ObjectId>,
    typeOfParticipant: string
  ): Promise<IParticipants>;
  addMobileNumber(mobileNumber: string, otp: string): any;
  findMobileNumber(mobileNumber: string): any;
  updateVerificationStatus(mobileNumber: string): any;
  updateOtp(mobileNumber: string, otp: string): any;
  findTeamCode(teamCode: string): Promise<IParticipants | null>;
  addParticipants(
    participants: Array<IUser>,
    participantType: string,
    eventId: string
  ): any;
  findEvent(eventId: string): Promise<IEvent | null>;

  addParticipantToEvent(eventId: string, members: any): any;
  addInstitute(institutes: string[]): any;
  findInstitute(): any;
}
