import Rating from '@/components/ui/Rating/Rating';
import styles from './ReviewList.module.scss';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date);
}

export default function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return <p className={styles.empty}>Nobody has reviewed this product yet.</p>;
  }

  return (
    <ul className={styles.list} role="list">
      {/* The same reviewer can post twice on the same date, so the position is
          part of the key. The list is static, so the index is safe here. */}
      {reviews.map((review, index) => (
        <li key={`${index}-${review.reviewerName}`} className={styles.review}>
          <Rating value={review.rating} />
          <p className={styles.comment}>{review.comment}</p>
          <p className={styles.byline}>
            {review.reviewerName}
            {formatDate(review.date) && (
              <>
                , <time dateTime={review.date}>{formatDate(review.date)}</time>
              </>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
