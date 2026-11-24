import cx from '@/utils/cx';
import styles from './EmptyState.module.scss';

// Shown when a list has nothing in it. Pass the next step (a button or link)
// as children so the screen always offers a way forward.
export default function EmptyState({ title, description, headingLevel: Heading = 'h2', className, children }) {
  return (
    <div className={cx(styles.empty, className)}>
      <Heading className={styles.title}>{title}</Heading>
      {description && <p className={styles.description}>{description}</p>}
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}
