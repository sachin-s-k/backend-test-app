import { IEvent } from "./IEvent";

export interface IEventRepo {
  findEvent(eventId: string): any;
  addEvent(userId: string, eventData: IEvent): any;
  deleteEvent(eventId: string): any;
  updateEvent(eventId: string, eventData: IEvent): any;
  updateRegistrationStatus(
    eventId: string,
    userId: string,
    registrationStatus: boolean
  ): any;
  updateRegistrationResponse(
    userId: string,
    eventId: string,
    isAccepted: boolean
  ): any;

  deleteParticipants(
    userId: string,
    eventId: string,
    participantId: string
  ): any;
}
