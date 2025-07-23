import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupRoutes } from './api/routes';
import { initDataPipeline } from './services/dataPipeline';
import { initializeMastraClient } from './services/mastraClient';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json()); // Enable JSON body parsing

// Initialize services
initializeMastraClient(); // Placeholder for Mastra client initialization
initDataPipeline(); // Placeholder for data pipeline initialization

// Setup API routes
setupRoutes(app);

// Basic health check route
app.get('/', (req, res) => {
  res.send('Memepad Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Backend initialized with Mastra client and data pipeline placeholders.');
});
