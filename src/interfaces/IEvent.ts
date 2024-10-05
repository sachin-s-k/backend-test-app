import { Document, ObjectId, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  type: String;
  dateOfEvent: Date;
  location: string;
  participants: Schema.Types.ObjectId[];
  teams: Schema.Types.ObjectId[];
  organizer: Schema.Types.ObjectId;
  maxParticipants: Number;
  isRegistrationClosed: boolean;
}
