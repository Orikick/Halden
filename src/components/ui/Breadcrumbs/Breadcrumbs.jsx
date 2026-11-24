import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

// items: [{ label, to }]. The last item is the current page and is not a link.
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ol className={styles.list} role="list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              {isCurrent ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
