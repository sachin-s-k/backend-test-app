import mongoose, { Model, Schema } from "mongoose";
import { IEvent } from "../interfaces/IEvent";

const eventSchema: Schema<IEvent> = new Schema(
  {
    title: { type: String, required: true },
    eventType: { type: String, required: true },
    dateOfEvent: { type: Date },
    category: { type: String, required: true },
    location: { type: String },
    participants: [{ type: Schema.Types.ObjectId, ref: "Participant" }],
    organizer: { type: Schema.Types.ObjectId, required: true },
    maxParticipants: { type: Number },
    isRegistrationClosed: { type: Boolean, default: false },
    registrationStartDate: { type: Date },
    registrationEndDate: { type: Date },
    maxTeamSize: { type: Number },
    minTeamSize: { type: Number, default: 2 },
    eventStatus: { type: String },
    rulesAndRegulations: [{ type: String }],
    requireSameOrganization: { type: Boolean, default: false },
    unassignedParticipantCode: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Event: Model<IEvent> = mongoose.model<IEvent>(
  "Event",
  eventSchema
);
