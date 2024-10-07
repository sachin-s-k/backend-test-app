import mongoose, { Model, Schema } from "mongoose";
import { IParticipants } from "../interfaces/IParticipants";

const participantSchema: Schema<IParticipants> = new Schema({
  teamCode: { type: String, required: true },
  typeOfParticipant: { type: String },
  members: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      isAccepted: { type: Boolean, default: false },
    },
  ],
  eventId: { type: Schema.Types.ObjectId, ref: "Event" },
});

export const Participant: Model<IParticipants> = mongoose.model<IParticipants>(
  "Participant",
  participantSchema
);
