import { ObjectId, Schema } from "mongoose";
import { OTP } from "../entities/otpEntity";
import { Participant } from "../entities/participantsEntity";
import { User } from "../entities/userEntity";
import { IRegisterRepo } from "../interfaces/IRegisterRepo";
import { IUser } from "../interfaces/IUser";
import { Event } from "../entities/eventEntity";

export class RegisterRepository implements IRegisterRepo {
  // Method to add a new team with team members and event ID
  async addTeam(
    teamCode: string,
    eventId: string,
    teamMembers: Array<Schema.Types.ObjectId>
  ) {
    const teamDataEntry = await Participant.create({
      teamCode,
      eventId,
      members: teamMembers,
    });
    return teamDataEntry;
  }

  // Method to add or update participants for a given event ID
  async addParticipants(
    participants: Array<IUser>,
    participantType: string,
    eventId: string
  ) {
    const participantsEmail: Array<string> = participants.map(
      (participant) => participant.email
    );
    // Find existing users based on their email addresses
    const existingUser: any = await User.find({
      email: { $in: participantsEmail },
    });

    console.log(participantType, participants);

    console.log(existingUser, "exist");

    const alreadyRegisteredUser: any = existingUser.filter((user: any) =>
      user.events.some((event: any) => event.eventId == eventId)
    );
    console.log(alreadyRegisteredUser, "alllllUUU");

    if (alreadyRegisteredUser.length > 0) {
      const registeredUserNames = alreadyRegisteredUser.map(
        (user: any) => user.firstName
      );

      if (participantType == "team") {
        throw new Error(
          `Registration failed! The following users have already registered for event ${registeredUserNames.join(
            ", "
          )}.`
        );
      } else {
        throw new Error(`You are already registered for this event.`);
      }
    }

    //Separate existing and new participants
    const existingUserMap = new Map(
      existingUser.map((user: any) => [user.email, user])
    );
    const newParticipants: any = [];
    const updatedUserPromises: any = [];

    participants.forEach((participant) => {
      if (existingUserMap.has(participant.email)) {
        const existingUser: any = existingUserMap.get(participant.email);

        const isEventAlreadyRegistered: Array<any> = existingUser.events.filter(
          (event: any) => {
            if (event.eventId == eventId) {
              return event;
            }
          }
        );
        console.log(isEventAlreadyRegistered.length, "lenghjjjjisEvenetAl");

        if (!isEventAlreadyRegistered.length) {
          updatedUserPromises.push(
            User.findOneAndUpdate(
              { email: participant.email },
              {
                $addToSet: { events: { eventId: eventId } },
              },
              { new: true }
            )
          );
        }
      } else {
        // If user doesn't exist, add to the new participants array
        newParticipants.push({
          ...participant,
          events: [{ eventId: eventId }],
        });
      }
    });

    const userInsertPromise = User.insertMany(newParticipants, {
      ordered: false,
    });

    const response = await Promise.all([
      ...updatedUserPromises,
      userInsertPromise,
    ]);

    console.log(response, "ALLLLLLL");

    // const userData = await User.insertMany(participants, { ordered: false });
    // return userData;
  }

  async addMobileNumber(mobileNumber: string, otp: string) {
    const otpData = await OTP.create({
      mobileNumber,
      otp,
      expiresAt: new Date(Date.now() + 1 * 60 * 1000),
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
    const teamCodeData = await Participant.findOne({ teamCode });
    return teamCodeData;
  }

  async findEvent(eventId: string) {
    const eventData = await Event.findById(eventId);
    return eventData;
  }
}
