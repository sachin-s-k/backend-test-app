import { Document } from "mongoose";
import { IEvent } from "./IEvent";

export interface IEventInteractor {
  getEvent(eventId: string): any;
  createEvent(eventData: IEvent): any;
  removeEvent(eventId: string): any;
}
