import { Link } from 'react-router-dom';
import { catalogHref, navigation } from '@/data/navigation';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.about}>
          <p className={styles.name}>Halden</p>
          <p>
            A general store for the home, the desk and the kitchen cupboard. Packed and posted from
            our warehouse in Rotterdam.
          </p>
        </div>

        <nav aria-label="Shop">
          <h2 className={styles.heading}>Shop</h2>
          <ul className={styles.list} role="list">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link to={catalogHref(item.category)}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Customer support</h2>
          <ul className={styles.list} role="list">
            <li>Weekdays, 8:00 to 18:00 CET</li>
            <li>
              <a href="mailto:hello@halden.example">hello@halden.example</a>
            </li>
            <li>
              <a href="tel:+31105550142">+31 10 555 0142</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.note}>
          Halden is a demo store. Products come from the DummyJSON API, and orders are not real: no
          payment is taken and nothing is shipped.
        </p>
        <p className={styles.credit}>Designed and developed by Orest Labiak</p>
      </div>
    </footer>
  );
}
