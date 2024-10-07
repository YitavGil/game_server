import mongoose, { Document, Schema } from "mongoose";

// Interface to define the structure of a User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Define the schema for the User model
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export the User model
export default mongoose.model<IUser>("User", UserSchema);
