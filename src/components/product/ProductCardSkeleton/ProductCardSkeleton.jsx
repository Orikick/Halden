import Skeleton from '@/components/ui/Skeleton/Skeleton';
import styles from './ProductCardSkeleton.module.scss';

// Same proportions as ProductCard, so the grid does not shift when data arrives.
export default function ProductCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <Skeleton className={styles.image} />
      <div className={styles.body}>
        <Skeleton width="40%" height="0.8125rem" />
        <Skeleton width="85%" height="1.25rem" />
        <Skeleton width="100%" height="0.875rem" />
        <Skeleton width="70%" height="0.875rem" />
        <Skeleton width="30%" height="1rem" />
        <Skeleton className={styles.button} />
      </div>
    </div>
  );
}
