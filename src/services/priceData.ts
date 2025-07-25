import axios from 'axios';

// Supported assets and their CoinGecko IDs
const ASSET_IDS: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  HYPE: 'hyperliquid', // Replace with correct CoinGecko ID if available
};

// In-memory storage for historical prices
const historicalPrices: Record<string, Array<{ timestamp: number; price: number }>> = {
  BTC: [],
  ETH: [],
  SOL: [],
  HYPE: [],
};

// Fetch historical prices for an asset (default: last 30 days, daily)
export async function fetchHistoricalPrices(asset: string, days = 30): Promise<void> {
  const id = ASSET_IDS[asset];
  if (!id) throw new Error(`Asset ${asset} not supported`);
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
  const resp = await axios.get(url);
  // resp.data.prices: [ [timestamp, price], ... ]
  historicalPrices[asset] = resp.data.prices.map(([timestamp, price]: [number, number]) => ({ timestamp, price }));
}

// Get latest price for an asset
export function getLatestPrice(asset: string): number | null {
  const prices = historicalPrices[asset];
  if (!prices || prices.length === 0) return null;
  return prices[prices.length - 1].price;
}

// Get all historical prices for an asset
export function getHistoricalPrices(asset: string) {
  return historicalPrices[asset] || [];
}

// Fetch and update all assets
export async function updateAllHistoricalPrices(days = 30) {
  for (const asset of Object.keys(ASSET_IDS)) {
    try {
      await fetchHistoricalPrices(asset, days);
      console.log(`[PriceData] Updated historical prices for ${asset}`);
    } catch (err) {
      console.error(`[PriceData] Failed to fetch prices for ${asset}:`, err);
    }
  }
} 