import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const MAX_QUANTITY = 20;

// Never below 1, never above stock or the per-order limit.
export const clampQuantity = (quantity, stock) => {
  const limit = stock > 0 ? Math.min(stock, MAX_QUANTITY) : MAX_QUANTITY;
  return Math.max(1, Math.min(Math.round(quantity) || 1, limit));
};

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: clampQuantity(item.quantity + quantity, item.stock) }
                  : item,
              ),
            };
          }

          // Store a snapshot of what the cart needs, not the whole product.
          const { id, title, price, thumbnail, stock } = product;
          return {
            items: [
              ...state.items,
              { id, title, price, thumbnail, stock, quantity: clampQuantity(quantity, stock) },
            ],
          };
        }),

      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: clampQuantity(quantity, item.stock) } : item,
          ),
        })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      clear: () => set({ items: [] }),
    }),
    { name: 'halden-cart', version: 1 },
  ),
);

// Selectors
export const selectItems = (state) => state.items;
export const selectItemCount = (state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);
