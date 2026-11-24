import cx from '@/utils/cx';
import styles from './Skeleton.module.scss';

// Placeholder block shown while content loads. Hidden from assistive tech:
// the surrounding region announces loading with a role="status" message.
export default function Skeleton({ width, height, className }) {
  return <span className={cx(styles.skeleton, className)} style={{ width, height }} aria-hidden="true" />;
}
