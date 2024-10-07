import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Game document
export interface IGame extends Document {
  title: string;
  genre: string;
  price: number;
  releaseDate: Date;
  publisher: string;
  tags: string[];
}

// Define the schema for the Game model
const GameSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  releaseDate: { type: Date, required: true },
  publisher: { type: String, required: true },
  tags: [{ type: String }]
}, { timestamps: true });

// Create and export the Game model
export default mongoose.model<IGame>('Game', GameSchema);

// Note: This model demonstrates Mongoose schema definition with TypeScript types