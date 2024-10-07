import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the structure of a Game document
export interface IGame extends Document {
  title: string;
  genre: string;
  price: number;
  releaseDate: Date;
}

// Define the schema for the Game model
const GameSchema: Schema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  releaseDate: { type: Date, required: true }
});

// Create and export the Game model
export default mongoose.model<IGame>('Game', GameSchema);