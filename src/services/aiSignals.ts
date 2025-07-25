import { getHistoricalPrices, getLatestPrice } from './priceData';

// Model state per asset (e.g., last moving averages)
const modelState: Record<string, { shortMA?: number; longMA?: number }> = {};

// Simple moving average calculation
function movingAverage(prices: number[], window: number): number {
  if (prices.length < window) return NaN;
  return prices.slice(-window).reduce((a, b) => a + b, 0) / window;
}

// Generate trading signals using a moving average crossover strategy
export async function generateTradingSignals(marketData: any) {
  const assets = Object.keys(modelState).length > 0 ? Object.keys(modelState) : ['BTC', 'ETH', 'SOL', 'HYPE'];
  const signals: Record<string, 'BUY' | 'SELL' | 'HOLD'> = {};

  for (const asset of assets) {
    const hist = getHistoricalPrices(asset);
    const prices = hist.map(p => p.price);
    if (prices.length < 20) {
      signals[asset] = 'HOLD';
      continue;
    }
    const shortMA = movingAverage(prices, 5);
    const longMA = movingAverage(prices, 20);
    // Store model state
    modelState[asset] = { shortMA, longMA };
    // Simple crossover logic
    if (shortMA > longMA) signals[asset] = 'BUY';
    else if (shortMA < longMA) signals[asset] = 'SELL';
    else signals[asset] = 'HOLD';
  }
  return signals;
}

// Expose model state for inspection
export function getModelState() {
  return modelState;
}