import express from 'express';
export const router = express.Router();

export function checkRisk(entry: number, mark: number) {
  const pnl = (mark - entry) / entry;
  if (pnl <= -0.03) return 'STOP';       // −3 %
  if (pnl >=  0.05) return 'TAKE';       // +5 %
  return 'HOLD';
}
export function setupRoutes(app: express.Express) {
  app.use('/api', router);
}