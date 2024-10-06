import { Document, ObjectId, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  category: string;
  description?: string;
  dateOfEvent: Date;
  location: string;
  eventType: string;
  participants: Schema.Types.ObjectId[];
  teams: Schema.Types.ObjectId[];
  organizer: Schema.Types.ObjectId;
  registrationStartDate?: Date;
  registrationEndDate?: Date;
  isPublicEvent: boolean;
  maxParticipants: Number;
  isRegistrationClosed: boolean;
  entryFee?: number;
  rulesAndRegulations?: string[];
  prizes?: string[];
  maxTeamSize: Number;
  minTeamSize: Number;
  eventStatus: string;
}
