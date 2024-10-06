import mongoose, { Model, Schema } from "mongoose"; // Adjust the path as necessary
import { IInstitute } from "../interfaces/IInstitute";

const instituteSchema: Schema<IInstitute> = new Schema(
  {
    name: { type: String },
  },

  {
    timestamps: true,
  }
);

export const Institute: Model<IInstitute> = mongoose.model<IInstitute>(
  "Institute",
  instituteSchema
);
