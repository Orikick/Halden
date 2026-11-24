import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '@/components/ui/Icon/Icon';
import cx from '@/utils/cx';
import styles from './HeaderSearch.module.scss';

// Store-wide search in the header.
// - On the catalog page it updates ?q= and keeps the other filters.
// - Anywhere else it opens the catalog with the query.
export default function HeaderSearch({ className }) {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isCatalog = pathname === '/catalog';
  const urlQuery = isCatalog ? (searchParams.get('q') ?? '') : '';
  const [draft, setDraft] = useState(urlQuery);

  // Show the query that is actually applied (also after back/forward or "Clear all").
  useEffect(() => {
    setDraft(urlQuery);
  }, [urlQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const q = draft.trim();

    if (isCatalog) {
      const next = new URLSearchParams(searchParams);
      next.delete('page');
      if (q) next.set('q', q);
      else next.delete('q');
      setSearchParams(next);
      return;
    }

    navigate(q ? `/catalog?q=${encodeURIComponent(q)}` : '/catalog');
  };

  return (
    <form role="search" className={cx(styles.search, className)} onSubmit={handleSubmit}>
      <label htmlFor="site-search" className="visually-hidden">
        Search products
      </label>
      <Icon name="search" size={20} className={styles.icon} />
      <input
        id="site-search"
        type="search"
        className={styles.input}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Search the store"
        autoComplete="off"
        enterKeyHint="search"
      />
      <button type="submit" className={styles.submit}>
        Search
      </button>
    </form>
  );
}
