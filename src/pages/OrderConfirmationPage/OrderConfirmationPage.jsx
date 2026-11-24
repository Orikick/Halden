import { Navigate, useLocation } from 'react-router-dom';
import OrderConfirmation from '@/components/checkout/OrderConfirmation/OrderConfirmation';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import styles from './OrderConfirmationPage.module.scss';

export default function OrderConfirmationPage() {
  useDocumentTitle('Order placed');
  const { state } = useLocation();
  const order = state?.order;

  // Opened directly (no order in router state): there is nothing to confirm.
  if (!order) return <Navigate to="/cart" replace />;

  return (
    <div className={styles.page}>
      <OrderConfirmation order={order} />
    </div>
  );
}
