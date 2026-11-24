// There is no real order endpoint: this simulates the round trip so the
// checkout can show its pending state and an order number. No payment is taken.

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createOrderId = () => `HD-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export async function placeOrder({ customer, items, totals }) {
  await wait(900);

  return {
    id: createOrderId(),
    placedAt: new Date().toISOString(),
    customer,
    items,
    totals,
  };
}
