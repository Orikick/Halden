import ErrorState from '@/components/ui/ErrorState/ErrorState';
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import styles from './CategoryFilter.module.scss';

const SKELETON_WIDTHS = ['55%', '70%', '45%', '65%', '50%', '60%'];

// Single-choice category filter. `categories` is [{ slug, name }].
export default function CategoryFilter({ categories = [], value, onChange, isLoading, isError, onRetry }) {
  return (
    <fieldset className={styles.filter}>
      <legend className={styles.legend}>Category</legend>

      {isLoading && (
        <div className={styles.loading}>
          <p className="visually-hidden" role="status">
            Loading categories…
          </p>
          {SKELETON_WIDTHS.map((width) => (
            <Skeleton key={width} width={width} height="1.25rem" />
          ))}
        </div>
      )}

      {isError && (
        <ErrorState
          compact
          title="Categories did not load"
          message="You can still search and sort."
          onRetry={onRetry}
        />
      )}

      {!isLoading && !isError && (
        <ul className={styles.options} role="list">
          {[{ slug: '', name: 'All categories' }, ...categories].map((category) => (
            <li key={category.slug || 'all'}>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="category"
                  value={category.slug}
                  checked={value === category.slug}
                  onChange={() => onChange(category.slug)}
                />
                <span>{category.name}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  );
}
