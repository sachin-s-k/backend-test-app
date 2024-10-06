import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  institute: Schema.Types.ObjectId;
  dateOfBirth?: Date;
  gender?: string;
  mobileNumber?: string;
  isSignedUp: boolean;
  events: [{ eventId: Schema.Types.ObjectId; eventStatus: boolean }];
}
