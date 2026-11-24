import Icon from '@/components/ui/Icon/Icon';
import { getRatingBreakdown } from '@/utils/productFacts';
import styles from './ReviewSummary.module.scss';

// Overall rating plus how the latest reviews break down by stars.
// The bars are decorative; each row also states its count in text.
export default function ReviewSummary({ rating, reviews = [] }) {
  const breakdown = getRatingBreakdown(reviews);
  const total = reviews.length;
  const rounded = Number(rating).toFixed(1);

  return (
    <div className={styles.summary}>
      <div className={styles.score}>
        <p className={styles.number}>
          {rounded}
          <span className="visually-hidden"> out of 5</span>
        </p>
        <p className={styles.stars} aria-hidden="true">
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              name="star"
              size={20}
              className={star <= Math.round(rating) ? styles.on : styles.off}
            />
          ))}
        </p>
        <p className={styles.caption}>Overall customer rating</p>
      </div>

      {total > 0 && (
        <div className={styles.breakdown}>
          <p className={styles.caption}>
            Latest {total} {total === 1 ? 'review' : 'reviews'}
          </p>
          <ul className={styles.rows} role="list">
            {breakdown.map(({ stars, count }) => (
              <li key={stars} className={styles.row}>
                <span className={styles.label}>
                  {stars} {stars === 1 ? 'star' : 'stars'}
                </span>
                <span className={styles.track} aria-hidden="true">
                  <span className={styles.fill} style={{ width: `${(count / total) * 100}%` }} />
                </span>
                <span className={styles.count}>
                  {count}
                  <span className="visually-hidden"> {count === 1 ? 'review' : 'reviews'}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
