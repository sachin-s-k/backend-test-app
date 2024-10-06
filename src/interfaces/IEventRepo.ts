import { Document } from "mongoose";
import { IEvent } from "./IEvent";

export interface IEventRepo {
  findEvent(eventId: string): any;
  addEvent(eventData: IEvent): any;
  deleteEvent(eventId: string): any;
}
