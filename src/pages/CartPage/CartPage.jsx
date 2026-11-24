import CartItem from '@/components/cart/CartItem/CartItem';
import CartSummary from '@/components/cart/CartSummary/CartSummary';
import Button from '@/components/ui/Button/Button';
import EmptyState from '@/components/ui/EmptyState/EmptyState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { selectItems, useCartStore } from '@/store/cartStore';
import { getCartTotals } from '@/utils/cartTotals';
import styles from './CartPage.module.scss';

export default function CartPage() {
  useDocumentTitle('Cart');
  const items = useCartStore(selectItems);
  const totals = getCartTotals(items);

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <EmptyState
          headingLevel="h1"
          title="Your cart is empty"
          description="Anything you add is saved on this device, so you can come back to it later."
        >
          <Button to="/catalog">Browse the catalog</Button>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.layout}>
        <ul className={styles.items} role="list" aria-label="Items in your cart">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>

        <div className={styles.aside}>
          <CartSummary totals={totals}>
            <Button to="/checkout" size="lg" fullWidth>
              Go to checkout
            </Button>
            <Button to="/catalog" variant="ghost" fullWidth>
              Keep shopping
            </Button>
          </CartSummary>
        </div>
      </div>
    </div>
  );
}
