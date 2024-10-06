import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    institute: { type: Schema.Types.ObjectId, ref: "Institute" },
    dateOfBirth: { type: Date },
    gender: { type: String },
    mobileNumber: { type: String },
    isSignedUp: { type: Boolean, default: false },
    events: [
      {
        eventId: { type: Schema.Types.ObjectId, ref: "Event" },
        eventStatus: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
