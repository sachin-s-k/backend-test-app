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
}
//import { Document, ObjectId } from 'mongoose'; interface IEvent extends Document { title: string; description: string; date: Date; location: string; participants: ObjectId[]; // Array of user IDs teams: ObjectId[]; // Array of team IDs organizer: ObjectId; // ID of the user who created the event maxParticipants?: number; // Optional field createdAt: Date; updatedAt: Date; } export default IEvent;
