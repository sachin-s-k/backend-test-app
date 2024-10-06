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
  async addEvent(eventData: IEvent) {
    const eventEntry: IEvent = await Event.create(eventData);

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
}
