import mongoose, { Model, Schema } from "mongoose";
import { IParticipants } from "../interfaces/IParticipants";

const participantSchema: Schema<IParticipants> = new Schema({
  teamCode: { type: String, required: true },
  typeOfParticipant: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  eventId: { type: Schema.Types.ObjectId, ref: "Event" },
});

export const Participant: Model<IParticipants> = mongoose.model<IParticipants>(
  "Participant",
  participantSchema
);
