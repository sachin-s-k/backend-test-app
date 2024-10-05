import { Event } from "../entities/eventEntity";
import { IEventRepo } from "../interfaces/IEventRepo";

export class EventRepo implements IEventRepo {
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
}
