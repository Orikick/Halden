import cx from '@/utils/cx';
import { formatPrice, getOriginalPrice } from '@/utils/formatPrice';
import styles from './PriceTag.module.scss';

// The price, drawn as a yellow shelf-edge label. Shows the pre-discount
// price next to it when the product is discounted. `compact` hides the old
// price below 480px, where narrow product cards have no room for it.
export default function PriceTag({ price, discountPercentage, size = 'md', compact = false, className }) {
  const original = getOriginalPrice(price, discountPercentage);

  return (
    <p className={cx(styles.wrap, compact && styles.compact, className)}>
      <span className={cx(styles.tag, styles[size])}>
        <span className="visually-hidden">Price: </span>
        {formatPrice(price)}
      </span>
      {original && (
        <span className={styles.was}>
          <span className="visually-hidden">Was </span>
          <s>{formatPrice(original)}</s>
        </span>
      )}
    </p>
  );
}
