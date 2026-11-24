import CartSummary from '@/components/cart/CartSummary/CartSummary';
import Image from '@/components/ui/Image/Image';
import { getCartTotals } from '@/utils/cartTotals';
import { formatPrice } from '@/utils/formatPrice';
import styles from './OrderSummary.module.scss';

// Read-only list of what is being bought, with totals for the chosen
// delivery method. Used on the checkout and confirmation screens.
export default function OrderSummary({ items, delivery = 'standard', title = 'Your order', children }) {
  const totals = getCartTotals(items, delivery);

  const itemList = (
    <ul className={styles.items} role="list">
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <Image src={item.thumbnail} alt="" width={56} height={56} className={styles.image} />
          <p className={styles.name}>
            {item.title}
            <span className={styles.quantity}>
              <span className="visually-hidden">, quantity </span>
              <span aria-hidden="true">× </span>
              {item.quantity}
            </span>
          </p>
          <p className={styles.price}>{formatPrice(item.price * item.quantity)}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <CartSummary totals={totals} title={title} intro={itemList}>
      {children}
    </CartSummary>
  );
}
