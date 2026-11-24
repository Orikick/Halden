import { beforeEach, describe, expect, it } from 'vitest';
import {
  MAX_QUANTITY,
  clampQuantity,
  selectItemCount,
  selectItems,
  useCartStore,
} from './cartStore';

const mug = {
  id: 1,
  title: 'Stoneware mug',
  price: 12.5,
  thumbnail: 'mug.jpg',
  stock: 5,
  description: 'Not needed in the cart',
};

const lamp = { id: 2, title: 'Desk lamp', price: 45, thumbnail: 'lamp.jpg', stock: 50 };

const cart = () => useCartStore.getState();

describe('clampQuantity', () => {
  it('never goes below 1', () => {
    expect(clampQuantity(0, 10)).toBe(1);
    expect(clampQuantity(-4, 10)).toBe(1);
    expect(clampQuantity(Number.NaN, 10)).toBe(1);
  });

  it('never goes above the stock', () => {
    expect(clampQuantity(8, 3)).toBe(3);
  });

  it('never goes above the per-order limit', () => {
    expect(clampQuantity(99, 500)).toBe(MAX_QUANTITY);
  });

  it('uses the per-order limit when stock is unknown', () => {
    expect(clampQuantity(99, 0)).toBe(MAX_QUANTITY);
  });

  it('rounds fractional quantities', () => {
    expect(clampQuantity(2.6, 10)).toBe(3);
  });
});

describe('cart store', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] });
  });

  it('adds a product as a snapshot of the fields the cart needs', () => {
    cart().addItem(mug, 2);

    expect(selectItems(cart())).toEqual([
      { id: 1, title: 'Stoneware mug', price: 12.5, thumbnail: 'mug.jpg', stock: 5, quantity: 2 },
    ]);
  });

  it('adds one item when no quantity is given', () => {
    cart().addItem(lamp);

    expect(selectItems(cart())[0].quantity).toBe(1);
  });

  it('increases the quantity when the same product is added again', () => {
    cart().addItem(mug, 2);
    cart().addItem(mug, 2);

    expect(selectItems(cart())).toHaveLength(1);
    expect(selectItems(cart())[0].quantity).toBe(4);
  });

  it('does not let repeated adds go past the stock', () => {
    cart().addItem(mug, 4);
    cart().addItem(mug, 4);

    expect(selectItems(cart())[0].quantity).toBe(mug.stock);
  });

  it('sets the quantity of one item within its limits', () => {
    cart().addItem(mug);
    cart().addItem(lamp);

    cart().setQuantity(1, 99);
    cart().setQuantity(2, 3);

    expect(selectItems(cart()).map((item) => item.quantity)).toEqual([5, 3]);
  });

  it('removes an item', () => {
    cart().addItem(mug);
    cart().addItem(lamp);

    cart().removeItem(1);

    expect(selectItems(cart()).map((item) => item.id)).toEqual([2]);
  });

  it('clears the cart', () => {
    cart().addItem(mug);
    cart().addItem(lamp);

    cart().clear();

    expect(selectItems(cart())).toEqual([]);
  });

  it('counts every unit in the cart', () => {
    cart().addItem(mug, 2);
    cart().addItem(lamp, 3);

    expect(selectItemCount(cart())).toBe(5);
  });

  it('saves the cart to localStorage', () => {
    cart().addItem(lamp, 2);

    const saved = JSON.parse(localStorage.getItem('halden-cart'));
    expect(saved.state.items[0]).toMatchObject({ id: 2, quantity: 2 });
  });
});
