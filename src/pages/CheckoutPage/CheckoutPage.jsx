import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { placeOrder } from '@/api/orders';
import CheckoutForm from '@/components/checkout/CheckoutForm/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary/OrderSummary';
import Button from '@/components/ui/Button/Button';
import EmptyState from '@/components/ui/EmptyState/EmptyState';
import { checkoutRules, initialCheckoutValues } from '@/data/checkoutFields';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useForm } from '@/hooks/useForm';
import { selectItems, useCartStore } from '@/store/cartStore';
import { getCartTotals } from '@/utils/cartTotals';
import styles from './CheckoutPage.module.scss';

export default function CheckoutPage() {
  useDocumentTitle('Checkout');
  const navigate = useNavigate();
  const items = useCartStore(selectItems);
  const clearCart = useCartStore((state) => state.clear);

  const order = useMutation({
    mutationFn: placeOrder,
    onSuccess: (placedOrder) => {
      // The order travels in router state; the confirmation page reads it from there.
      navigate('/checkout/confirmation', { replace: true, state: { order: placedOrder } });
      clearCart();
    },
  });

  const form = useForm({
    initialValues: initialCheckoutValues,
    rules: checkoutRules,
    onSubmit: (values) =>
      order.mutate({
        customer: values,
        items,
        totals: getCartTotals(items, values.delivery),
      }),
  });

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <EmptyState
          headingLevel="h1"
          title="There is nothing to check out"
          description="Add something to your cart first, then come back here to place the order."
        >
          <Button to="/catalog">Browse the catalog</Button>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link to="/cart" className={styles.back}>
        Back to cart
      </Link>
      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.layout}>
        <CheckoutForm
          form={form}
          subtotal={getCartTotals(items).subtotal}
          isSubmitting={order.isPending}
          submitError={order.isError}
        />

        <div className={styles.aside}>
          <OrderSummary items={items} delivery={form.values.delivery} />
        </div>
      </div>
    </div>
  );
}
