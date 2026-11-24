import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import HeaderSearch from '@/components/layout/HeaderSearch/HeaderSearch';
import Icon from '@/components/ui/Icon/Icon';
import { catalogHref, navigation, servicePromises, supportPhone } from '@/data/navigation';
import { selectItemCount, useCartStore } from '@/store/cartStore';
import cx from '@/utils/cx';
import styles from './Header.module.scss';

// Three tiers: a service strip, the main bar (logo, search, cart) and the
// department navigation. Below 768px the departments fold into a menu.
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = useCartStore(selectItemCount);
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();

  const currentCategory = pathname === '/catalog' ? (searchParams.get('category') ?? '') : null;

  // Close the mobile menu after any navigation.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, search]);

  return (
    <header className={styles.header}>
      <div className={styles.strip}>
        <div className={styles.stripInner}>
          {servicePromises.map((promise, index) => (
            <p key={promise} className={cx(index > 0 && styles.stripExtra)}>
              {promise}
            </p>
          ))}
          <p className={cx(styles.stripExtra, styles.stripSupport)}>
            Questions? Call <a href={supportPhone.href}>{supportPhone.label}</a>
          </p>
        </div>
      </div>

      <div>
        <div className={styles.barInner}>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={isMenuOpen}
            aria-controls="site-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} size={24} />
            <span className="visually-hidden">Menu</span>
          </button>

          <Link to="/" className={styles.logo}>
            Halden
            <span className="visually-hidden"> home page</span>
          </Link>

          <HeaderSearch className={styles.search} />

          <Link to="/cart" className={styles.cart}>
            <Icon name="cart" size={24} />
            <span className={styles.cartLabel}>Cart</span>
            <span className={cx(styles.count, itemCount === 0 && styles.countEmpty)}>
              {itemCount}
              <span className="visually-hidden"> {itemCount === 1 ? 'item' : 'items'}</span>
            </span>
          </Link>
        </div>
      </div>

      <nav
        id="site-nav"
        aria-label="Departments"
        className={cx(styles.nav, isMenuOpen && styles.navOpen)}
      >
        <ul className={styles.navList} role="list">
          {navigation.map((item) => (
            <li key={item.label}>
              <Link
                to={catalogHref(item.category)}
                className={styles.navLink}
                aria-current={currentCategory === item.category ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
