import { formatPrice } from '@/utils/formatPrice';
import styles from './CartSummary.module.scss';

// Subtotal, delivery and total. `totals` comes from getCartTotals().
// `intro` renders above the totals (for example the list of items) and
// children render under them (for example the checkout button).
export default function CartSummary({ totals, title = 'Order summary', headingLevel: Heading = 'h2', intro, children }) {
  return (
    <section className={styles.summary} aria-labelledby="summary-heading">
      <Heading id="summary-heading" className={styles.heading}>
        {title}
      </Heading>

      {intro}

      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt>
            Subtotal ({totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'})
          </dt>
          <dd>{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className={styles.row}>
          <dt>Delivery</dt>
          <dd>{totals.delivery === 0 ? 'Free' : formatPrice(totals.delivery)}</dd>
        </div>
        <div className={styles.total}>
          <dt>Total</dt>
          <dd>{formatPrice(totals.total)}</dd>
        </div>
      </dl>

      {totals.untilFreeDelivery > 0 && (
        <p className={styles.hint}>
          Add {formatPrice(totals.untilFreeDelivery)} more for free standard delivery.
        </p>
      )}

      {children && <div className={styles.actions}>{children}</div>}
    </section>
  );
}
