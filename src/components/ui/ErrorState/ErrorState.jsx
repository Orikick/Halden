import cx from '@/utils/cx';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import styles from './ErrorState.module.scss';

// Shown when a request fails. role="alert" announces it; `onRetry` adds a
// "Try again" button.
export default function ErrorState({
  title = 'This did not load',
  message = 'Check your connection and try again.',
  onRetry,
  compact = false,
  className,
}) {
  return (
    <div className={cx(styles.error, compact && styles.compact, className)} role="alert">
      <Icon name="alert" size={compact ? 20 : 28} className={styles.icon} />
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
        {onRetry && (
          <Button variant="secondary" size="sm" onClick={onRetry} className={styles.retry}>
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}
