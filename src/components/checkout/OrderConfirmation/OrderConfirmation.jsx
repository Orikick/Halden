import { useEffect, useRef } from 'react';
import OrderSummary from '@/components/checkout/OrderSummary/OrderSummary';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import { deliveryOptions, paymentOptions } from '@/data/checkoutFields';
import styles from './OrderConfirmation.module.scss';

const findLabel = (options, value) => options.find((option) => option.value === value);

export default function OrderConfirmation({ order }) {
  const headingRef = useRef(null);
  const { customer, items, id } = order;
  const firstName = customer.fullName.trim().split(/\s+/)[0];
  const delivery = findLabel(deliveryOptions, customer.delivery);
  const payment = findLabel(paymentOptions, customer.payment);

  // Move focus to the heading so screen-reader users hear that the order went through.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className={styles.confirmation}>
      <div className={styles.message}>
        <p className={styles.status}>
          <Icon name="check" size={20} />
          Order placed
        </p>
        <h1 ref={headingRef} tabIndex={-1} className={styles.title}>
          Thanks, {firstName}. Your order is in.
        </h1>
        <p className={styles.lead}>
          Your order number is <strong>{id}</strong>. In a real store, a confirmation email would
          now be on its way to <strong>{customer.email}</strong>. Halden is a demo, so nothing has
          been charged or shipped.
        </p>

        <dl className={styles.details}>
          <div>
            <dt>Delivering to</dt>
            <dd>
              {customer.fullName}
              <br />
              {customer.address}
              <br />
              {customer.postalCode} {customer.city}
              <br />
              {customer.country}
            </dd>
          </div>
          <div>
            <dt>Delivery method</dt>
            <dd>
              {delivery?.label}
              <br />
              {delivery?.description}
            </dd>
          </div>
          <div>
            <dt>Payment</dt>
            <dd>{payment?.label}</dd>
          </div>
        </dl>

        <Button to="/catalog" size="lg">
          Continue shopping
        </Button>
      </div>

      <OrderSummary items={items} delivery={customer.delivery} title="What you ordered" />
    </div>
  );
}
