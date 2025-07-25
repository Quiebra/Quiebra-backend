/* Ultra-light Hyperliquid REST helper – signs JSON body
   Docs: exchange endpoint lets us send actions to /exchange */

   import axios from 'axios';
   import crypto from 'crypto';
   import * as dotenv from 'dotenv';
   dotenv.config();
   
   const BASE = process.env.HYPER_BASE_URL || 'https://api.hyperliquid.xyz';
   
   function sign(path: string, body: string, ts: number) {
     const msg = `instruction=orderExecute&${body}&timestamp=${ts}&window=5000`;
     return crypto
       .createHmac('sha256', process.env.HYPER_API_SECRET!)
       .update(msg)
       .digest('base64');
   }
   
   export async function postHL(path: string, payload: object) {
     const body = JSON.stringify(payload);
     const ts   = Date.now();
     return axios.post(`${BASE}${path}`, body, {
       headers: {
         'X-API-Key':   process.env.HYPER_API_KEY,
         'X-Timestamp': ts,
         'X-Window':    5000,
         'X-Signature': sign(path, body, ts),
         'Content-Type': 'application/json',
       },
     });
   }
   
   export const hlSymbol = (s: string) =>
     ({ BTC: 'BTC', ETH: 'ETH', SOL: 'SOL', HYPE: 'HYPE' } as const)[s];
   