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

  createEvent(eventData: IEvent) {
    return this.eventRepository.addEvent(eventData);
  }
  removeEvent(eventId: string) {
    return this.eventRepository.deleteEvent(eventId);
  }
}
