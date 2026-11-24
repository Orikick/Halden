import Icon from '@/components/ui/Icon/Icon';
import styles from './QuantityStepper.module.scss';

export default function QuantityStepper({ value, onChange, min = 1, max = 20, label = 'Quantity' }) {
  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
      >
        <Icon name="minus" size={16} />
        <span className="visually-hidden">Decrease quantity</span>
      </button>
      <output className={styles.value} aria-live="polite">
        <span className="visually-hidden">Quantity: </span>
        {value}
      </output>
      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
      >
        <Icon name="plus" size={16} />
        <span className="visually-hidden">Increase quantity</span>
      </button>
    </div>
  );
}
