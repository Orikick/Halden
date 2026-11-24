const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Discounts smaller than this are not worth advertising.
const MIN_DISCOUNT = 5;

export function formatPrice(value) {
  return formatter.format(value);
}

// DummyJSON returns the current price plus a discount percentage, so the
// pre-discount price has to be derived. Returns null when there is no
// meaningful discount.
export function getOriginalPrice(price, discountPercentage) {
  if (!discountPercentage || discountPercentage < MIN_DISCOUNT) return null;
  return price / (1 - discountPercentage / 100);
}

export function getDiscountLabel(discountPercentage) {
  if (!discountPercentage || discountPercentage < MIN_DISCOUNT) return null;
  return `${Math.round(discountPercentage)}% off`;
}
