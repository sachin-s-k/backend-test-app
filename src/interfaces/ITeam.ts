import { Schema } from "mongoose";

export interface ITeam {
  teamCode: string;
  members: Schema.Types.ObjectId[];
  eventId: Schema.Types.ObjectId;
}
