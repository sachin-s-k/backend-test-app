import mongoose, { Model, Schema } from "mongoose";
import { IEvent } from "../interfaces/IEvent";

const eventSchema: Schema<IEvent> = new Schema(
  {
    title: { type: String, required: true },
    eventType: { type: String, required: true },
    dateOfEvent: { type: Date, required: true },
    location: { type: String, required: true },
    //participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    participants: [{ type: Schema.Types.ObjectId, ref: "Participant" }],
    organizer: { type: Schema.Types.ObjectId, required: true },
    maxParticipants: { type: Number, required: true },
    isRegistrationClosed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Event: Model<IEvent> = mongoose.model<IEvent>(
  "Event",
  eventSchema
);
