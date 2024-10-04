import mongoose, { Model, Schema } from "mongoose";
import { IEvent } from "../interfaces/IEvent";
import { ITeam } from "../interfaces/ITeam";

const teamSchema: Schema<ITeam> = new Schema({
  teamCode: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  eventId: { type: Schema.Types.ObjectId, ref: "EventSchema" },
});

export const Team: Model<ITeam> = mongoose.model<ITeam>("team", teamSchema);
