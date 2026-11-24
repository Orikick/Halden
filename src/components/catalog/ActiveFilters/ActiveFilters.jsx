import Icon from '@/components/ui/Icon/Icon';
import { formatPrice } from '@/utils/formatPrice';
import styles from './ActiveFilters.module.scss';

function getPriceLabel(min, max) {
  if (min != null && max != null) return `${formatPrice(min)} to ${formatPrice(max)}`;
  if (min != null) return `From ${formatPrice(min)}`;
  return `Up to ${formatPrice(max)}`;
}

// One removable chip per active filter, plus "Clear all".
// `onRemove` receives the patch that switches that filter off.
export default function ActiveFilters({ filters, categoryName, onRemove, onClear }) {
  const chips = [];

  if (filters.category) {
    chips.push({ key: 'category', label: categoryName, patch: { category: '' } });
  }
  if (filters.q) {
    chips.push({ key: 'q', label: `Search: “${filters.q}”`, patch: { q: '' } });
  }
  if (filters.min != null || filters.max != null) {
    chips.push({
      key: 'price',
      label: getPriceLabel(filters.min, filters.max),
      patch: { min: null, max: null },
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className={styles.active}>
      <h2 className="visually-hidden">Active filters</h2>
      <ul className={styles.chips} role="list">
        {chips.map((chip) => (
          <li key={chip.key}>
            <button type="button" className={styles.chip} onClick={() => onRemove(chip.patch)}>
              <span className="visually-hidden">Remove filter: </span>
              {chip.label}
              <Icon name="close" size={14} />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className={styles.clear} onClick={onClear}>
        Clear all
      </button>
    </div>
  );
}
