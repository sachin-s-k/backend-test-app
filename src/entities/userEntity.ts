import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, //
    institute: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String },
    mobileNumber: { type: String },
  },
  {
    timestamps: true, // Correct placement of the timestamps option
  }
);

export const UserSchema: Model<IUser> = mongoose.model<IUser>(
  "user",
  userSchema
);
