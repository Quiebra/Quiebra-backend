// backend/src/api/routes.ts
import { Router, Application } from 'express';
import { getMarketData, getAISignals, getTradingPerformance } from '../services/dataPipeline';

export const setupRoutes = (app: Application) => {
  const router = Router();

  // Day 1-2: Foundation & Architecture
  // Placeholder for market data (e.g., from a mock or external API)
  router.get('/data/market', async (req, res) => {
    try {
      const data = await getMarketData();
      res.json({ message: 'Market data fetched successfully (placeholder)', data });
    } catch (error: any) {
      console.error('Error fetching market data:', error.message);
      res.status(500).json({ error: 'Failed to fetch market data' });
    }
  });

  // Day 3-5: Core Trading Bot Development - AI Engineer
  // Placeholder for AI signal generation
  router.get('/ai/signals', async (req, res) => {
    try {
      const signals = await getAISignals();
      res.json({ message: 'AI signals generated successfully (placeholder)', signals });
    } catch (error: any) {
      console.error('Error generating AI signals:', error.message);
      res.status(500).json({ error: 'Failed to generate AI signals' });
    }
  });

  // Day 3-5: Core Trading Bot Development - Data Engineer
  // Placeholder for trading bot performance metrics
  router.get('/trading/performance', async (req, res) => {
    try {
      const performance = await getTradingPerformance();
      res.json({ message: 'Trading performance metrics (placeholder)', performance });
    } catch (error: any) {
      console.error('Error fetching trading performance:', error.message);
      res.status(500).json({ error: 'Failed to fetch trading performance' });
    }
  });

  app.use('/api', router); // All API routes will be prefixed with /api
};