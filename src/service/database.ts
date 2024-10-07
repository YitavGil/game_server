import mongoose from 'mongoose';

// Function to connect to MongoDB
export const connectToDatabase = async (): Promise<void> => {
  try {
    // Replace 'your_mongodb_uri' with your actual MongoDB connection string
    await mongoose.connect('your_mongodb_uri');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};