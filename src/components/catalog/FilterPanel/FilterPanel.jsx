import { useRef } from 'react';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './FilterPanel.module.scss';

// Holds the catalog filters (passed as children).
// - 1024px and up: a sidebar that is always visible.
// - Below that: a "Filters" button that opens a native modal <dialog>, which
//   brings focus trapping, Esc to close and focus return for free.
export default function FilterPanel({ activeCount = 0, resultCount, onClear, children }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const dialogRef = useRef(null);

  if (isDesktop) {
    return (
      <aside className={styles.sidebar} aria-labelledby="filters-heading">
        <h2 id="filters-heading" className="visually-hidden">
          Filters
        </h2>
        {children}
      </aside>
    );
  }

  const close = () => dialogRef.current?.close();

  return (
    <div className={styles.mobile}>
      <Button variant="secondary" onClick={() => dialogRef.current?.showModal()}>
        <Icon name="filter" size={18} />
        <span>
          Filters
          {activeCount > 0 && ` (${activeCount})`}
        </span>
      </Button>

      {/* A click on the backdrop lands on the <dialog> element itself. */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="filters-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.dialogInner}>
          <div className={styles.dialogHeader}>
            <h2 id="filters-title" className={styles.dialogTitle}>
              Filters
            </h2>
            <button type="button" className={styles.close} onClick={close}>
              <Icon name="close" size={22} />
              <span className="visually-hidden">Close filters</span>
            </button>
          </div>

          <div className={styles.dialogBody}>{children}</div>

          <div className={styles.dialogFooter}>
            <Button variant="ghost" onClick={onClear} disabled={activeCount === 0}>
              Clear all
            </Button>
            <Button onClick={close}>
              {resultCount == null
                ? 'Show products'
                : `Show ${resultCount} ${resultCount === 1 ? 'product' : 'products'}`}
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
