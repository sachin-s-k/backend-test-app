import { IEvent } from "./IEvent";

export interface IEventInteractor {
  getEvent(eventId: string): any;
  createEvent(userId: string, eventData: IEvent): any;
  removeEvent(eventId: string): any;
  changeEvent(eventId: string, eventData: IEvent): any;
  registrationStatusChange(
    eventId: string,
    userId: string,
    registrationStatus: boolean
  ): any;
  changeRegistrationResponse(
    userId: string,
    eventId: string,
    isAccepted: boolean
  ): any;
  removeParticipants(
    userId: string,
    eventId: string,
    ParticipantId: string
  ): any;
}
