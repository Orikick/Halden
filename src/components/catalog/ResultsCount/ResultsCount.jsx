import styles from './ResultsCount.module.scss';

// Announced politely, so screen-reader users hear how many products a
// filter change left them with.
export default function ResultsCount({ total, from, to }) {
  let text = 'No products';
  if (total === 1) text = '1 product';
  else if (total > 1 && to - from + 1 === total) text = `${total} products`;
  else if (total > 1) text = `Showing ${from} to ${to} of ${total} products`;

  return (
    <p className={styles.count} role="status">
      {text}
    </p>
  );
}
