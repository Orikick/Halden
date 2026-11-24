export const FREE_DELIVERY_FROM = 50;

export const DELIVERY_PRICES = {
  standard: 4.95,
  express: 12.5,
};

const round = (value) => Math.round(value * 100) / 100;

export function getDeliveryPrice(subtotal, delivery = 'standard') {
  if (subtotal === 0) return 0;
  if (delivery === 'standard' && subtotal >= FREE_DELIVERY_FROM) return 0;
  return DELIVERY_PRICES[delivery] ?? DELIVERY_PRICES.standard;
}

export function getCartTotals(items, delivery = 'standard') {
  const subtotal = round(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  const deliveryPrice = getDeliveryPrice(subtotal, delivery);

  return {
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    delivery: deliveryPrice,
    total: round(subtotal + deliveryPrice),
    // How much more to spend to reach free standard delivery (0 when reached).
    untilFreeDelivery: round(Math.max(0, FREE_DELIVERY_FROM - subtotal)),
  };
}
