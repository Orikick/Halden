import cx from '@/utils/cx';
import Icon from '@/components/ui/Icon/Icon';
import styles from './Rating.module.scss';

export default function Rating({ value, count, className }) {
  const rounded = Number(value).toFixed(1);

  return (
    <p className={cx(styles.rating, className)}>
      <Icon name="star" size={16} className={styles.star} />
      <span aria-hidden="true">{rounded}</span>
      <span className="visually-hidden">Rated {rounded} out of 5</span>
      {count != null && (
        <span className={styles.count}>
          ({count} {count === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </p>
  );
}
