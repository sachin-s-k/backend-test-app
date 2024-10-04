import { Document, ObjectId, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  type: Event;
  dateOfEvent: Date;
  location: string;
  participants: Schema.Types.ObjectId[];
  teams: Schema.Types.ObjectId[];
  organizer: ObjectId;
  maxParticipants: Number;
  createdAt: Date;
  updatedAt: Date;
}
