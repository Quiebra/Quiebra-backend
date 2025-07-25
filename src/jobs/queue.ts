import { Queue, Worker } from 'bullmq';
import { runTradingCycle } from '../core/tradingStrategies';

const q = new Queue('cycle', { connection: { url: process.env.REDIS_URL }});

export function schedule() {
  q.add('tick', {}, { repeat: { every: 60_000 } });   // 60 s loop
}

new Worker('cycle', async () => runTradingCycle(), {
  connection: { url: process.env.REDIS_URL },
});
