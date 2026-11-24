import { describe, expect, it } from 'vitest';
import { DELIVERY_PRICES, FREE_DELIVERY_FROM, getCartTotals, getDeliveryPrice } from './cartTotals';

describe('getDeliveryPrice', () => {
  it('is free for an empty cart', () => {
    expect(getDeliveryPrice(0)).toBe(0);
    expect(getDeliveryPrice(0, 'express')).toBe(0);
  });

  it('charges standard delivery below the free-delivery threshold', () => {
    expect(getDeliveryPrice(FREE_DELIVERY_FROM - 0.01)).toBe(DELIVERY_PRICES.standard);
  });

  it('makes standard delivery free from the threshold', () => {
    expect(getDeliveryPrice(FREE_DELIVERY_FROM)).toBe(0);
  });

  it('always charges for express delivery', () => {
    expect(getDeliveryPrice(500, 'express')).toBe(DELIVERY_PRICES.express);
  });

  it('falls back to the standard price for an unknown method', () => {
    expect(getDeliveryPrice(10, 'drone')).toBe(DELIVERY_PRICES.standard);
  });
});

describe('getCartTotals', () => {
  it('adds up items, delivery and the amount left for free delivery', () => {
    const items = [
      { price: 12.5, quantity: 2 },
      { price: 10, quantity: 1 },
    ];

    expect(getCartTotals(items)).toEqual({
      itemCount: 3,
      subtotal: 35,
      delivery: 4.95,
      total: 39.95,
      untilFreeDelivery: 15,
    });
  });

  it('gives free standard delivery on a large order', () => {
    const totals = getCartTotals([{ price: 25, quantity: 2 }]);

    expect(totals.delivery).toBe(0);
    expect(totals.total).toBe(50);
    expect(totals.untilFreeDelivery).toBe(0);
  });

  it('charges express delivery on a large order', () => {
    expect(getCartTotals([{ price: 60, quantity: 1 }], 'express').total).toBe(72.5);
  });

  it('rounds away floating-point noise', () => {
    const totals = getCartTotals([{ price: 0.1, quantity: 3 }]);

    expect(totals.subtotal).toBe(0.3);
    expect(totals.total).toBe(5.25);
  });

  it('returns zeros for an empty cart', () => {
    expect(getCartTotals([])).toEqual({
      itemCount: 0,
      subtotal: 0,
      delivery: 0,
      total: 0,
      untilFreeDelivery: FREE_DELIVERY_FROM,
    });
  });
});
