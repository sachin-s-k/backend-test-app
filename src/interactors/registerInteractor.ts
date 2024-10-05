import { IOTP } from "../interfaces/IOTP";
import { IRegisterInteractor } from "../interfaces/IRegisterInteractor";
import { IRegisterRepo } from "../interfaces/IRegisterRepo";
import { IUser } from "../interfaces/IUser";
import { createClient } from "redis";
import dotenv from "dotenv";
import Twilio from "twilio";
import { VerificationInstance } from "twilio/lib/rest/verify/v2/service/verification";
import { OTP } from "../entities/otpEntity";
import { Schema } from "mongoose";
import { IParticipants } from "../interfaces/IParticipants";
const verifiSid = process.env.TWILIO_VERIFY_SID as any;
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);

export class RegisterInteractor implements IRegisterInteractor {
  private registerRepository: IRegisterRepo;
  constructor(registerRepository: IRegisterRepo) {
    this.registerRepository = registerRepository;
  }

  async registerParticipant(
    teamCode: string,
    eventId: string,
    participantType: string,
    members: Array<IUser>
  ) {
    if (members.length >= 1) {
      //console.log(members);

      const participantsData: Array<IUser> =
        await this.registerRepository.addParticipants(
          members,
          participantType,
          eventId
        );
      console.log(participantsData, "======>[part");

      const teamMembers: Array<any> = participantsData.map(
        (member) => member._id
      );
      console.log(participantsData, "participants");

      const teamData: any = await this.registerRepository.addTeam(
        teamCode,
        eventId,
        teamMembers
      );
      const teamMembersEmail = participantsData.map((member) => member.email);
      const eventData: any = await this.registerRepository.findEvent(
        teamData.eventId
      );
      return { teamMembers: teamMembersEmail, eventData };
    } else {
    }
  }

  registerIndividual(teamCode: string, person: IUser) {}

  async verifiyMobileNumber(mobileNumber: string) {
    const numberExist = await this.registerRepository.findMobileNumber(
      mobileNumber
    );
    let otpData: IOTP;
    const otp: string = this.generateOtp();
    if (numberExist) {
      otpData = await this.registerRepository.updateOtp(mobileNumber, otp);
    } else {
      otpData = await this.registerRepository.addMobileNumber(
        mobileNumber,
        otp
      );

      console.log(otpData, "otppppppppDaatr");
    }
    //  console.log(`+91${mobileNumber}`, process.env.MOBILE_NUMBER);

    try {
      await client.messages.create({
        body: `Your OTP for verifying your number in the Lit School is:${otpData.otp}. Please enter it within 5 minutes to proceed`,
        from: process.env.MOBILE_NUMBER, //  your Twilio phone number
        to: `+91${mobileNumber}`, // mobile numeber with country code
      });
      return { success: true, message: "OTP successfully send" };
      // const otpSendData = await this.createVerifictation(mobileNumber);
    } catch (error) {
      console.log(error);
    }
  }

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async createVerifictation(mobileNumber: string) {
    const verification: VerificationInstance = await client.verify.v2
      .services(verifiSid)
      .verifications.create({
        channel: "sms",
        to: `+91${mobileNumber}`,
      });
    console.log(verification.status);
  }

  async verifyOtp(mobileNumber: string, otp: string) {
    const otpData: IOTP = await this.registerRepository.findMobileNumber(
      mobileNumber
    );

    console.log(otpData, "otppp");

    if (!otpData) {
      throw new Error("Invalid accesss");
    }
    // Check if OTP matches and is not expired
    if (otpData.otp === otp && otpData.expiresAt > new Date()) {
      // Mark OTP as verified
      await this.registerRepository.updateVerificationStatus(mobileNumber);

      return { success: true, message: "Mobile Number verified successfully." };
    } else {
      if (otpData.expiresAt < new Date() && otpData.otp === otp) {
        throw new Error("expired OTP.");
      } else {
        throw new Error("Invalid  OTP.");
      }
    }
  }
  async checkTeamCode(teamCode: string) {
    const teamCodeData = await this.registerRepository.findTeamCode(teamCode);
    if (teamCodeData) {
      throw new Error("This team code has already been taken");
    } else {
      return { success: true, message: "This team code available" };
    }
  }
}
