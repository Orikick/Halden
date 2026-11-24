import Button from '@/components/ui/Button/Button';
import ErrorState from '@/components/ui/ErrorState/ErrorState';
import Select from '@/components/ui/Select/Select';
import TextField from '@/components/ui/TextField/TextField';
import { countries, deliveryOptions, paymentOptions } from '@/data/checkoutFields';
import { getDeliveryPrice } from '@/utils/cartTotals';
import { formatPrice } from '@/utils/formatPrice';
import styles from './CheckoutForm.module.scss';

function RadioGroup({ legend, name, options, value, onChange, getAside }) {
  return (
    <fieldset className={styles.section}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.radios}>
        {options.map((option) => (
          <label key={option.value} className={styles.radio}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            <span className={styles.radioText}>
              <span className={styles.radioLabel}>{option.label}</span>
              <span className={styles.radioDescription}>{option.description}</span>
            </span>
            {getAside && <span className={styles.radioAside}>{getAside(option)}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// `form` is the object returned by useForm(); the page owns it so the order
// summary can react to the chosen delivery method.
export default function CheckoutForm({ form, subtotal, isSubmitting, submitError }) {
  const { field, values, handleChange, handleSubmit, errorCount } = form;

  const getDeliveryAside = (option) => {
    const price = getDeliveryPrice(subtotal, option.value);
    return price === 0 ? 'Free' : formatPrice(price);
  };

  return (
    // noValidate: validation messages come from useForm so they are consistent
    // across browsers and can be read by screen readers.
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Checkout">
      <fieldset className={styles.section}>
        <legend className={styles.legend}>Contact</legend>
        <div className={styles.fields}>
          <TextField
            {...field('email')}
            label="Email address"
            type="email"
            autoComplete="email"
            inputMode="email"
            hint="We send your order confirmation here."
          />
          <TextField
            {...field('phone')}
            label="Phone number"
            type="tel"
            autoComplete="tel"
            optional
            hint="Only used if the courier cannot find you."
          />
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>Delivery address</legend>
        <div className={styles.fields}>
          <TextField {...field('fullName')} label="Full name" autoComplete="name" />
          <TextField
            {...field('address')}
            label="Street address"
            autoComplete="street-address"
            hint="House number and street, plus flat or floor if you have one."
          />
          <div className={styles.pair}>
            <TextField {...field('city')} label="Town or city" autoComplete="address-level2" />
            <TextField {...field('postalCode')} label="Postal code" autoComplete="postal-code" />
          </div>
          <Select
            {...field('country')}
            label="Country"
            options={countries}
            placeholder="Choose a country"
            autoComplete="country-name"
            required
          />
        </div>
      </fieldset>

      <RadioGroup
        legend="Delivery method"
        name="delivery"
        options={deliveryOptions}
        value={values.delivery}
        onChange={handleChange}
        getAside={getDeliveryAside}
      />

      <RadioGroup
        legend="Payment"
        name="payment"
        options={paymentOptions}
        value={values.payment}
        onChange={handleChange}
      />
      <p className={styles.note}>
        You pay when your order arrives. Halden is a demo store, so no payment is taken and nothing
        is shipped.
      </p>

      {errorCount > 0 && (
        <p className={styles.errorSummary} role="alert">
          {errorCount === 1
            ? 'One field needs your attention before you can place the order.'
            : `${errorCount} fields need your attention before you can place the order.`}
        </p>
      )}

      {submitError && (
        <ErrorState
          compact
          title="Your order was not placed"
          message="Nothing was charged. Check your connection and place the order again."
        />
      )}

      <Button type="submit" size="lg" loading={isSubmitting} className={styles.submit}>
        {isSubmitting ? 'Placing order…' : 'Place order'}
      </Button>
    </form>
  );
}
