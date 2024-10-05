import { ObjectId, Schema } from "mongoose";
import { OTP } from "../entities/otpEntity";
import { Team } from "../entities/teamEntity";
import { User } from "../entities/userEntity";
import { IRegisterRepo } from "../interfaces/IRegisterRepo";
import { IUser } from "../interfaces/IUser";
import { Event } from "../entities/eventEntity";

export class RegisterRepository implements IRegisterRepo {
  async addTeam(
    teamCode: string,
    eventId: string,
    teamMembers: Array<Schema.Types.ObjectId>
  ) {
    const teamDataEntry = await Team.create({
      teamCode,
      eventId,
      members: teamMembers,
    });
    return teamDataEntry;
  }

  async addParticipants(participants: Array<IUser>) {
    const userData = await User.insertMany(participants, { ordered: false });
    return userData;
  }

  async addMobileNumber(mobileNumber: string, otp: string) {
    const otpData = await OTP.create({
      mobileNumber,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    return otpData;
  }

  async findMobileNumber(mobileNumber: string) {
    const otpData = await OTP.findOne({ mobileNumber });
    return otpData;
  }

  async updateVerificationStatus(mobileNumber: string) {
    const otpData = await OTP.findOneAndUpdate(
      { mobileNumber },
      { verified: true }
    );

    console.log(otpData);
  }

  async updateOtp(mobileNumber: string, otp: string) {
    const otpEntry = await OTP.findOneAndUpdate({ mobileNumber }, { otp });
    return otpEntry;
  }

  async findTeamCode(teamCode: string) {
    const teamCodeData = await Team.findOne({ teamCode });
    return teamCodeData;
  }

  async findEvent(eventId: string) {
    const eventData = await Event.findById(eventId);
    return eventData;
  }
}
