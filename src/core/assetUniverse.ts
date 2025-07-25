export const ASSETS = ['BTC', 'ETH', 'SOL', 'HYPE'] as const;
export type Asset = typeof ASSETS[number];
