import express from 'express';
export const router = express.Router();
import { runTradingCycle } from '../core/tradingStrategies';
import { updateAllHistoricalPrices } from '../services/priceData';
import { getModelState } from '../services/aiSignals';

export function checkRisk(entry: number, mark: number) {
  const pnl = (mark - entry) / entry;
  if (pnl <= -0.03) return 'STOP';       // −3 %
  if (pnl >=  0.05) return 'TAKE';       // +5 %
  return 'HOLD';
}
export function setupRoutes(app: express.Express) {
  app.use('/api', router);
}

// POST /api/trade/cycle endpoint
router.post('/trade/cycle', async (req, res) => {
  const tradeLog: string[] = [];
  // Patch console.log to capture trade logs
  const originalLog = console.log;
  console.log = (msg: string, ...args: any[]) => {
    tradeLog.push(msg);
    originalLog(msg, ...args);
  };
  try {
    await runTradingCycle();
    res.json({ success: true, trades: tradeLog });
  } catch (err) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : err });
  } finally {
    console.log = originalLog;
  }
});

// POST /api/price/update - fetch and update historical prices
router.post('/price/update', async (req, res) => {
  try {
    await updateAllHistoricalPrices();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : err });
  }
});

// GET /api/model/state - get current model state
router.get('/model/state', (req, res) => {
  res.json({ state: getModelState() });
});