import { backpack, bpSymbol } from '../services/backpack';
import { postHL, hlSymbol }   from '../services/hyper';
import { Asset }              from './assetUniverse';
import { Side, TimeInForce } from 'bpx-api-client/dist/http/common/common.types';
import { OrderType } from 'bpx-api-client/dist/http/private/order/order.types';

type TradeSide = 'BUY' | 'SELL';

export async function executeOrder(
  asset: Asset,
  side: TradeSide,
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

  // Map 'BUY'/'SELL' to Side.Bid/Side.Ask
  const mappedSide = side === 'BUY' ? Side.Bid : Side.Ask;

  // Primary backpack
  return backpack.order.executeOrder({
    symbol: `${bpSymbol(asset)}${asset === 'SOL' ? '' : '_PERP'}`,
    side: mappedSide,
    orderType: price ? OrderType.Limit : OrderType.Market,
    quantity: qty,
    price,
    timeInForce: TimeInForce.GTC,
  });
}
