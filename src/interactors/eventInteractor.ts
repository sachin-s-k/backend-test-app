import { IEvent } from "../interfaces/IEvent";
import { IEventInteractor } from "../interfaces/IEventInteractor";
import { IEventRepo } from "../interfaces/IEventRepo";

export class EventInteractor implements IEventInteractor {
  private eventRepository: IEventRepo;
  constructor(eventRepo: IEventRepo) {
    this.eventRepository = eventRepo;
  }

  getEvent(eventId: string) {
    return this.eventRepository.findEvent(eventId);
  }

  createEvent(userId: string, eventData: IEvent) {
    return this.eventRepository.addEvent(userId, eventData);
  }
  removeEvent(eventId: string) {
    return this.eventRepository.deleteEvent(eventId);
  }
  changeEvent(eventId: string, eventData: IEvent) {
    return this.eventRepository.updateEvent(eventId, eventData);
  }
  registrationStatusChange(
    eventId: string,
    userId: string,
    registrationStatus: boolean
  ) {
    console.log("event Interactor");

    return this.eventRepository.updateRegistrationStatus(
      eventId,
      userId,
      registrationStatus
    );
  }

  changeRegistrationResponse(
    userId: string,
    eventId: string,
    isAccepted: boolean
  ) {
    return this.eventRepository.updateRegistrationResponse(
      userId,
      eventId,
      isAccepted
    );
  }

  removeParticipants(userId: string, eventId: string, participantId: string) {
    return this.eventRepository.deleteParticipants(
      userId,
      eventId,
      participantId
    );
  }
}
