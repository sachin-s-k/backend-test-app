import { Document, Schema } from "mongoose";

// Define the Institute interface
export interface IInstitute extends Document {
  name: string;
}
