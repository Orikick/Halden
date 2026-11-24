import { useState } from 'react';
import AddToCartButton from '@/components/product/AddToCartButton/AddToCartButton';
import Badge from '@/components/ui/Badge/Badge';
import Icon from '@/components/ui/Icon/Icon';
import PriceTag from '@/components/ui/PriceTag/PriceTag';
import QuantityStepper from '@/components/ui/QuantityStepper/QuantityStepper';
import Rating from '@/components/ui/Rating/Rating';
import { MAX_QUANTITY } from '@/store/cartStore';
import { formatPrice, getDiscountLabel } from '@/utils/formatPrice';
import { getDeliveryNote, getProductPolicy, getSavings } from '@/utils/productFacts';
import styles from './ProductInfo.module.scss';

function getStockBadge(stock) {
  if (stock === 0) return { tone: 'warning', label: 'Sold out' };
  if (stock <= 5) return { tone: 'warning', label: `Only ${stock} left` };
  return { tone: 'success', label: 'In stock' };
}

// The buy box: name, rating, price, description, quantity and the three
// promises a buyer checks before adding to cart.
export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const {
    title,
    brand,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    reviews = [],
  } = product;

  const stockBadge = getStockBadge(stock);
  const discountLabel = getDiscountLabel(discountPercentage);
  const savings = getSavings(price, discountPercentage);
  const policy = getProductPolicy(product);
  const highlights = [
    getDeliveryNote(price),
    policy.shipping,
    policy.returns,
    policy.warranty,
  ].filter(Boolean);

  return (
    <div className={styles.info}>
      {brand && <p className={styles.brand}>{brand}</p>}
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.meta}>
        <Rating value={rating} count={reviews.length} />
        <Badge tone={stockBadge.tone}>{stockBadge.label}</Badge>
      </div>

      <div className={styles.priceRow}>
        <PriceTag price={price} discountPercentage={discountPercentage} size="lg" />
        {discountLabel && <Badge tone="sale">{discountLabel}</Badge>}
      </div>
      {savings && <p className={styles.savings}>You save {formatPrice(savings)} on the usual price.</p>}

      <p className={styles.description}>{description}</p>

      {stock > 0 && (
        <div className={styles.buy}>
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            max={Math.min(stock, MAX_QUANTITY)}
            label={`Quantity of ${title}`}
          />
          <AddToCartButton product={product} quantity={quantity} size="lg" />
        </div>
      )}

      {highlights.length > 0 && (
        <ul className={styles.highlights} role="list" aria-label="Delivery, returns and warranty">
          {highlights.map((text) => (
            <li key={text}>
              <Icon name="check" size={18} className={styles.check} />
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
