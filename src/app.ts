import express from 'express';
import { connectToDatabase } from './service/database';
import userRoutes from './routes/userRoutes';
import gameRoutes from './routes/gameRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});