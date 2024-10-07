import mongoose from "mongoose";
import { Event } from "../entities/eventEntity";
import { Participant } from "../entities/participantsEntity";
import { User } from "../entities/userEntity";
import { IEvent } from "../interfaces/IEvent";
import { IEventRepo } from "../interfaces/IEventRepo";

export class EventRepository implements IEventRepo {
  async findEvent(eventId: string) {
    console.log(eventId, "eve");
    const eventData = await Event.findById(eventId).populate({
      path: "participants", // Populate participants
      populate: {
        path: "members.userId",
        model: "User",
        populate: {
          path: "institute",
          model: "Institute",
        }, // Reference the User model
      },
    });
    console.log(eventData);
    return eventData;
  }
  async addEvent(userId: string, eventData: IEvent) {
    const eventEntry: IEvent = await Event.create({
      organizer: userId,
      title: eventData.title, // Add these directly
      eventType: eventData.eventType,
      category: eventData.category,
      location: eventData.location,
      dateOfEvent: eventData.dateOfEvent,
      maxParticipants: eventData.maxParticipants,
      isRegistrationClosed: eventData.isRegistrationClosed,
      registrationStartDate: eventData.registrationStartDate,
      registrationEndDate: eventData.registrationEndDate,
      maxTeamSize: eventData.maxTeamSize,
      minTeamSize: eventData.minTeamSize,
      eventStatus: eventData.eventStatus,
      rulesAndRegulations: eventData.rulesAndRegulations,
      requireSameOrganization: eventData.requireSameOrganization,
      unassignedParticipantCode: eventData.unassignedParticipantCode,
    });

    return eventEntry;
  }
  async deleteEvent(eventId: string) {
    const eventEntry = await Event.findByIdAndDelete(eventId);

    if (!eventEntry) {
      throw new Error("Event not found");
    } else {
      return true;
    }
  }

  async updateEvent(eventId: string, eventData: IEvent) {
    const eventUpdate = await Event.findByIdAndUpdate(
      eventId,
      {
        title: eventData.title, // Add these directly
        eventType: eventData.eventType,
        category: eventData.category,
        location: eventData.location,
        dateOfEvent: eventData.dateOfEvent,
        maxParticipants: eventData.maxParticipants,
        isRegistrationClosed: eventData.isRegistrationClosed,
        registrationStartDate: eventData.registrationStartDate,
        registrationEndDate: eventData.registrationEndDate,
        maxTeamSize: eventData.maxTeamSize,
        minTeamSize: eventData.minTeamSize,
        eventStatus: eventData.eventStatus,
        rulesAndRegulations: eventData.rulesAndRegulations,
        requireSameOrganization: eventData.requireSameOrganization,
        unassignedParticipantCode: eventData.unassignedParticipantCode,
      },
      { new: true }
    );

    if (!eventUpdate) {
      throw new Error("Event not found");
    } else {
      return eventUpdate;
    }
  }
  async updateRegistrationStatus(
    eventId: string,
    userId: string,
    registrationStatus: boolean
  ) {
    const event = await Event.findById(eventId);
    console.log(eventId, userId, registrationStatus, "=====>");

    console.log(event, "eve");

    if (event) {
      if (event?.organizer.toString() == userId) {
        const eventUpdateEntry = await Event.findByIdAndUpdate(
          eventId,
          { isRegistrationClosed: registrationStatus },
          { new: true }
        );
        return true;
      }
    } else {
      throw new Error("Event not found");
    }
  }
  async updateRegistrationResponse(
    userId: string,
    eventId: string,
    isAccepted: boolean
  ) {
    const userResponseUpdate = await User.findOneAndUpdate(
      {
        _id: userId,
        "events.eventId": eventId,
      },
      { $set: { "events.$.eventStatus": isAccepted } },
      { new: true }
    );
    const participantsResponse = await Participant.findOneAndUpdate(
      {
        eventId: eventId,
        "members.userId": userId,
      },
      { $set: { "members.$.isAccepted": isAccepted } },
      { new: true }
    );

    console.log(userResponseUpdate, "UUUUUU");
    console.log(participantsResponse, "PPPPPPP");

    if (!userResponseUpdate && !participantsResponse) {
      throw new Error("Event not found");
    }
    return { success: true, isAccepted: isAccepted };
  }
  async deleteParticipants(
    userId: string,
    eventId: string,
    participantId: string
  ) {
    // first remove from the event

    const eventParticipantresponse = await Event.findByIdAndUpdate(
      eventId,
      {
        $pull: { participants: new mongoose.Types.ObjectId(participantId) },
      },
      { new: true }
    );

    console.log(eventParticipantresponse, "eventParticipantRes");

    console.log("+++++++++++++");

    // remove from the participansnts

    const participantData = await Participant.findById(participantId);
    console.log(participantData, "PPPPPPP");

    const members = participantData?.members;

    const removePartcipant = await Participant.findByIdAndDelete(participantId);

    const objectUserIds = members?.map(
      (user: any) => new mongoose.Types.ObjectId(user.userId)
    );
    console.log("+++++++++++++");

    console.log(objectUserIds, "objeUse===>");

    const userRemoveResponse = await User.updateMany(
      {
        _id: { $in: objectUserIds },
      },
      { $pull: { events: { eventId: new mongoose.Types.ObjectId(eventId) } } }
    );
    console.log("+===========");

    console.log(userRemoveResponse, "userRemoveeeee======>");

    if (
      userRemoveResponse.acknowledged &&
      userRemoveResponse.matchedCount == members?.length &&
      removePartcipant &&
      eventParticipantresponse
    ) {
      return true;
    }
  }
}
