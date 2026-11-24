import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ErrorBoundary from '@/components/layout/ErrorBoundary/ErrorBoundary';
import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import SkipLink from '@/components/layout/SkipLink/SkipLink';
import styles from './Layout.module.scss';

function PageFallback() {
  return (
    <p className={styles.fallback} role="status">
      Loading page…
    </p>
  );
}

export default function Layout() {
  const { pathname } = useLocation();

  // Start each new page at the top (the catalog handles its own page changes).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" className={styles.main} tabIndex={-1}>
        <ErrorBoundary resetKey={pathname} className={styles.fallback}>
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
