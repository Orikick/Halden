import styles from './SkipLink.module.scss';

// First focusable element on every page: lets keyboard users jump past the header.
export default function SkipLink() {
  return (
    <a href="#main" className={styles.skip}>
      Skip to main content
    </a>
  );
}
