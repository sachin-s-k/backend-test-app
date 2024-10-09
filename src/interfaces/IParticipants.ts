import { Schema } from "mongoose";

export interface IParticipants {
  teamCode: string;
  typeOfParticipant: string;
  members: Schema.Types.ObjectId[];
  eventId: Schema.Types.ObjectId;
  teamImage: any;
}
