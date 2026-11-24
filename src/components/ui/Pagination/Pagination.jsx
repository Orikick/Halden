import { Link } from 'react-router-dom';
import cx from '@/utils/cx';
import Icon from '@/components/ui/Icon/Icon';
import styles from './Pagination.module.scss';

// Page numbers to show: first, last and the neighbours of the current page.
// A null entry is a gap ("…").
function getPageItems(page, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const wanted = new Set([1, totalPages, page - 1, page, page + 1]);
  const pages = [...wanted].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);

  return pages.flatMap((n, index) => (index > 0 && n - pages[index - 1] > 1 ? [null, n] : [n]));
}

// Pages are real links (built by `getHref`) so they can be opened in a new
// tab, shared and crawled.
export default function Pagination({ page, totalPages, getHref }) {
  if (totalPages <= 1) return null;

  const items = getPageItems(page, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {page > 1 ? (
        <Link to={getHref(page - 1)} className={styles.step} rel="prev">
          <Icon name="chevronLeft" size={18} />
          Previous
        </Link>
      ) : (
        <span className={cx(styles.step, styles.disabled)} aria-disabled="true">
          <Icon name="chevronLeft" size={18} />
          Previous
        </span>
      )}

      <p className={styles.summary}>
        Page {page} of {totalPages}
      </p>

      <ol className={styles.pages} role="list">
        {items.map((item, index) =>
          item === null ? (
            <li key={`gap-${index}`} className={styles.gap} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                to={getHref(item)}
                className={cx(styles.page, item === page && styles.current)}
                aria-current={item === page ? 'page' : undefined}
              >
                <span className="visually-hidden">Page </span>
                {item}
              </Link>
            </li>
          ),
        )}
      </ol>

      {page < totalPages ? (
        <Link to={getHref(page + 1)} className={styles.step} rel="next">
          Next
          <Icon name="chevronRight" size={18} />
        </Link>
      ) : (
        <span className={cx(styles.step, styles.disabled)} aria-disabled="true">
          Next
          <Icon name="chevronRight" size={18} />
        </span>
      )}
    </nav>
  );
}
