// Turns raw DummyJSON product fields into plain-language facts for the
// product page. Pure functions, so they are easy to test.
import { DELIVERY_PRICES, FREE_DELIVERY_FROM } from '@/utils/cartTotals';
import { formatPrice, getOriginalPrice } from '@/utils/formatPrice';
import { MAX_QUANTITY } from '@/store/cartStore';

// "30 days return policy" -> 30. "No return policy" -> 0. Unknown -> null.
export function getReturnDays(returnPolicy) {
  if (!returnPolicy) return null;
  if (/^no return/i.test(returnPolicy)) return 0;
  const match = returnPolicy.match(/(\d+)\s*day/i);
  return match ? Number(match[1]) : null;
}

export function hasWarranty(warrantyInformation) {
  return Boolean(warrantyInformation) && !/^no warranty/i.test(warrantyInformation);
}

// How much a discounted product saves, or null when there is no real discount.
export function getSavings(price, discountPercentage) {
  const original = getOriginalPrice(price, discountPercentage);
  return original ? Math.round((original - price) * 100) / 100 : null;
}

// DummyJSON gives every product the same generic fields, so an apple can
// come with a "3 year warranty". These sets decide which fields make sense.
const PERISHABLE = new Set(['groceries']);
const PERSONAL_CARE = new Set(['beauty', 'skin-care', 'fragrances']);
const NO_WARRANTY = new Set([...PERISHABLE, ...PERSONAL_CARE, 'tops', 'mens-shirts', 'womens-dresses']);

// Delivery, returns and warranty as Halden actually offers them for this
// product. A null value means "do not show this at all".
export function getProductPolicy(product) {
  const { category, shippingInformation, returnPolicy, warrantyInformation } = product;

  if (PERISHABLE.has(category)) {
    return {
      kind: 'perishable',
      shipping: 'Delivered chilled within 1 to 2 working days',
      returns: 'Refund if it arrives damaged or past its date',
      warranty: null,
      showPackageSize: false,
    };
  }

  return {
    kind: PERSONAL_CARE.has(category) ? 'personal-care' : 'general',
    shipping: shippingInformation || null,
    returns: returnPolicy || null,
    warranty: NO_WARRANTY.has(category) ? null : warrantyInformation || null,
    showPackageSize: true,
  };
}

// One-line delivery cost for a single item.
export function getDeliveryNote(price) {
  if (price >= FREE_DELIVERY_FROM) return 'Free standard delivery';
  return `Standard delivery ${formatPrice(DELIVERY_PRICES.standard)}, free on orders over ${formatPrice(FREE_DELIVERY_FROM)}`;
}

const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });

// ISO date -> "May 2024". Returns null for missing or invalid dates.
export function formatMonthYear(value) {
  const date = new Date(value);
  return value && !Number.isNaN(date.getTime()) ? monthYear.format(date) : null;
}

// Questions buyers ask most, answered from this product's own data.
export function getProductFaq(product) {
  const { price, stock } = product;
  const policy = getProductPolicy(product);
  const faq = [];

  if (policy.kind === 'perishable') {
    faq.push({
      question: 'When will it arrive?',
      answer:
        'Fresh food is packed in an insulated box and delivered within one to two working days, so it arrives cold.',
    });
  } else if (policy.shipping) {
    faq.push({
      question: 'When will it arrive?',
      answer: `${policy.shipping.replace(/\.$/, '')}. After it leaves our warehouse, standard delivery takes three to five working days and express delivery takes one working day.`,
    });
  }

  faq.push({
    question: 'How much is delivery?',
    answer:
      price >= FREE_DELIVERY_FROM
        ? `Standard delivery is free, because this item costs more than ${formatPrice(FREE_DELIVERY_FROM)}. Express delivery costs ${formatPrice(DELIVERY_PRICES.express)}.`
        : `Standard delivery costs ${formatPrice(DELIVERY_PRICES.standard)}, and is free when your whole order comes to ${formatPrice(FREE_DELIVERY_FROM)} or more. Express delivery costs ${formatPrice(DELIVERY_PRICES.express)}.`,
  });

  const returnDays = getReturnDays(policy.returns);
  if (policy.kind === 'perishable') {
    faq.push({
      question: 'Can I return it?',
      answer:
        'Food cannot be sent back once it is delivered. If anything arrives damaged, or past its use-by or best-before date, tell us within 48 hours and we will refund it.',
    });
  } else if (returnDays === 0) {
    faq.push({
      question: 'Can I return it?',
      answer:
        'This item cannot be returned if you change your mind. If it arrives damaged or faulty, contact us within 14 days and we will replace it or refund you.',
    });
  } else if (returnDays && policy.kind === 'personal-care') {
    faq.push({
      question: 'Can I return it?',
      answer: `Yes, if it is unopened and still sealed. Send it back within ${returnDays} days of delivery for a full refund. For hygiene reasons we cannot take back opened products.`,
    });
  } else if (returnDays) {
    faq.push({
      question: 'Can I return it?',
      answer: `Yes. Send it back unused within ${returnDays} days of delivery for a full refund. The returns label is in the box.`,
    });
  }

  if (policy.warranty) {
    faq.push({
      question: 'Is there a warranty?',
      answer: hasWarranty(policy.warranty)
        ? `Yes, it comes with a ${policy.warranty.replace(/ warranty$/i, '')} warranty. Keep your order confirmation, as it is your proof of purchase.`
        : 'This item has no manufacturer’s warranty. If it arrives faulty, contact us within 14 days and we will replace it or refund you.',
    });
  }

  faq.push({
    question: 'How many can I order?',
    answer:
      stock === 0
        ? 'None at the moment: it is sold out. Check back soon, as we restock popular items regularly.'
        : `Up to ${Math.min(stock, MAX_QUANTITY)} in one order. We have ${stock} in stock right now.`,
  });

  return faq;
}

// Count of reviews per star rating, from 5 down to 1.
export function getRatingBreakdown(reviews = []) {
  return [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((review) => Math.round(review.rating) === stars).length,
  }));
}
