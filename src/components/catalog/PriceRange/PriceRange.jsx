import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import styles from './PriceRange.module.scss';

const toDraft = (value) => (value == null ? '' : String(value));
const toPrice = (draft) => {
  if (draft.trim() === '') return null;
  const value = Number(draft);
  return Number.isFinite(value) && value >= 0 ? value : null;
};

// Min/max price inputs, applied on submit (Enter or the Apply button).
// `bounds` is the cheapest and dearest price in the catalog, shown as placeholders.
export default function PriceRange({ min, max, bounds, onChange }) {
  const [draft, setDraft] = useState({ min: toDraft(min), max: toDraft(max) });

  // Follow the URL when it changes from outside (chips, back button).
  useEffect(() => {
    setDraft({ min: toDraft(min), max: toDraft(max) });
  }, [min, max]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let nextMin = toPrice(draft.min);
    let nextMax = toPrice(draft.max);
    // "From 80 to 20" almost certainly means 20 to 80.
    if (nextMin != null && nextMax != null && nextMin > nextMax) {
      [nextMin, nextMax] = [nextMax, nextMin];
    }
    onChange({ min: nextMin, max: nextMax });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  return (
    <form className={styles.range} onSubmit={handleSubmit}>
      <fieldset>
        <legend className={styles.legend}>Price, in US dollars</legend>
        <div className={styles.inputs}>
          <div className={styles.field}>
            <label htmlFor="price-min">From</label>
            <input
              id="price-min"
              name="min"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              className={styles.input}
              value={draft.min}
              onChange={handleChange}
              placeholder={bounds ? String(bounds.min) : undefined}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="price-max">To</label>
            <input
              id="price-max"
              name="max"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              className={styles.input}
              value={draft.max}
              onChange={handleChange}
              placeholder={bounds ? String(bounds.max) : undefined}
            />
          </div>
        </div>
        <Button type="submit" variant="secondary" size="sm" className={styles.apply}>
          Apply price
        </Button>
      </fieldset>
    </form>
  );
}
