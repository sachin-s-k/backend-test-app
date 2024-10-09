import mongoose, { Model, Schema } from "mongoose";
import { IParticipants } from "../interfaces/IParticipants";

const participantSchema: Schema<IParticipants> = new Schema({
  teamCode: { type: String },
  typeOfParticipant: { type: String },
  members: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      isAccepted: { type: Boolean, default: false },
    },
  ],
  eventId: { type: Schema.Types.ObjectId, ref: "Event" },
  teamImage: { type: String },
});

export const Participant: Model<IParticipants> = mongoose.model<IParticipants>(
  "Participant",
  participantSchema
);
