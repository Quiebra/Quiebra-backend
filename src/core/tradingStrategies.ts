import { Asset, ASSETS } from './assetUniverse';
import { executeOrder }  from './orderRouter';
import { generateTradingSignals }  from '../services/aiSignals';

export async function runTradingCycle() {
  // Provide mock market data - you should replace this with actual market data
  const marketData = {}; // Replace with actual market data structure
  const sigs = await generateTradingSignals(marketData);       // { BTC:'BUY', ETH:'SELL', ... }

  await Promise.all(
    ASSETS.map(async (a: Asset) => {
      const act = sigs[a as keyof typeof sigs];
      if (!act || act === 'HOLD') return;

      const qty = a === 'BTC' ? '0.01' : a === 'HYPE' ? '50' : '0.5';
      await executeOrder(a, act as 'BUY' | 'SELL', qty);
      console.log(`[TRADE] ${act} ${qty} ${a}`);
    })
  );
}