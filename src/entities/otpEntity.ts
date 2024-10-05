import mongoose, { Model, Schema } from "mongoose";
import { IOTP } from "../interfaces/IOtp";

const otpSchema: Schema<IOTP> = new Schema(
  {
    mobileNumber: { type: String, required: true },
    otp: { type: String, required: true },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, expires: "5m" },
    expiresAt: { type: Date, required: true },
  },

  {
    timestamps: true,
  }
);

export const OTP: Model<IOTP> = mongoose.model<IOTP>("Otp", otpSchema);
