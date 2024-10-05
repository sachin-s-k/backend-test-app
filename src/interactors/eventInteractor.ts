import { IEventInteractor } from "../interfaces/IEventInteractor";
import { IEventRepo } from "../interfaces/IEventRepo";

export class EventInteractor implements IEventInteractor {
  private eventRepo: IEventRepo;
  constructor(eventRepo: IEventRepo) {
    this.eventRepo = eventRepo;
  }
  async getEvent(eventId: string) {
    return this.eventRepo.findEvent(eventId);
  }
}
