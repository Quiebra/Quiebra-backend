import { backpack, bpSymbol } from '../services/backpack';
import { postHL, hlSymbol }   from '../services/hyper';
import { Asset }              from './assetUniverse';

type Side = 'BUY' | 'SELL';

export async function executeOrder(
  asset: Asset,
  side: Side,
  qty: string,
  price?: string          // required for limit
) {
  if (asset === 'HYPE') {
    // Hyperliquid only
    return postHL('/exchange', {
      action: 'order',
      coin: hlSymbol(asset),
      side,
      size: qty,
      limit: price ?? 0,
      tif: 'IOC',
    });
  }

  // Primary backpack
  return backpack.order.executeOrder({
    symbol: `${bpSymbol(asset)}${asset === 'SOL' ? '' : '_PERP'}`,
    side,
    orderType: price ? 'Limit' : 'Market',
    quantity: qty,
    price,
    timeInForce: 'GTC',
  });
}
