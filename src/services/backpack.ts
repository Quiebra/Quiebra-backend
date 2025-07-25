import { BpxApiClient } from 'bpx-api-client';
import * as dotenv from 'dotenv';
dotenv.config();

export const backpack = new BpxApiClient({
  apiKey:   process.env.BACKPACK_API_KEY!,
  apiSecret: process.env.BACKPACK_API_SECRET!,
  debug: false,
});

// helper
export const bpSymbol = (s: string) =>
  ({ BTC: 'BTC_USDC', ETH: 'ETH_USDC', SOL: 'SOL_USDC' } as const)[s];
