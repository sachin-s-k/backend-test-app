import { Event } from "../entities/eventEntity";
import { IEvent } from "../interfaces/IEvent";
import { IEventRepo } from "../interfaces/IEventRepo";

export class EventRepository implements IEventRepo {
  async findEvent(eventId: string) {
    console.log(eventId, "eve");

    const eventData = await Event.findById(eventId)
      .populate({
        path: "participants",
        model: "Participant",
        populate: {
          path: "members",
          model: "User",
        },
      })
      .exec();
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
}
