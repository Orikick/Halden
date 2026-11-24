import Button from '@/components/ui/Button/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  useDocumentTitle('Page not found');

  return (
    <div className={styles.page}>
      <p className={styles.code}>
        <span className="visually-hidden">Error </span>404
      </p>
      <h1 className={styles.title}>This page is not on our shelves</h1>
      <p className={styles.text}>
        The address may be mistyped, or the page may have moved. The catalog and the home page are
        both where you left them.
      </p>
      <div className={styles.actions}>
        <Button to="/catalog" size="lg">
          Browse the catalog
        </Button>
        <Button to="/" variant="secondary" size="lg">
          Go to the home page
        </Button>
      </div>
    </div>
  );
}
