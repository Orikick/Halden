import cx from '@/utils/cx';
import styles from './Badge.module.scss';

// tone: 'neutral' | 'sale' | 'success' | 'warning'
export default function Badge({ tone = 'neutral', className, children }) {
  return <span className={cx(styles.badge, styles[tone], className)}>{children}</span>;
}
