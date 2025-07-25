import { executeOrder } from '../src/core/orderRouter';
import { vi, expect, test } from 'vitest';
import * as backpackSvc from '../src/services/backpack';

test('routes BTC orders to Backpack', async () => {
  const spy = vi.spyOn(backpackSvc.backpack.order, 'executeOrder')
                .mockResolvedValue({ data: {} } as any);
  await executeOrder('BTC', 'BUY', '0.01');
  expect(spy).toHaveBeenCalled();
});
