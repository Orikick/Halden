import { Link } from 'react-router-dom';
import Icon from '@/components/ui/Icon/Icon';
import Image from '@/components/ui/Image/Image';
import QuantityStepper from '@/components/ui/QuantityStepper/QuantityStepper';
import { MAX_QUANTITY, useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/formatPrice';
import styles from './CartItem.module.scss';

export default function CartItem({ item }) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const maxQuantity = item.stock > 0 ? Math.min(item.stock, MAX_QUANTITY) : MAX_QUANTITY;

  return (
    <li className={styles.item}>
      <Image src={item.thumbnail} alt="" width={96} height={96} className={styles.image} />

      <div className={styles.details}>
        <h2 className={styles.title}>
          <Link to={`/product/${item.id}`}>{item.title}</Link>
        </h2>
        <p className={styles.unit}>{formatPrice(item.price)} each</p>
      </div>

      <div className={styles.controls}>
        <QuantityStepper
          value={item.quantity}
          onChange={(quantity) => setQuantity(item.id, quantity)}
          max={maxQuantity}
          label={`Quantity of ${item.title}`}
        />
        <button type="button" className={styles.remove} onClick={() => removeItem(item.id)}>
          <Icon name="trash" size={18} />
          <span>
            Remove<span className="visually-hidden"> {item.title} from cart</span>
          </span>
        </button>
      </div>

      <p className={styles.total}>
        <span className="visually-hidden">Line total: </span>
        {formatPrice(item.price * item.quantity)}
      </p>
    </li>
  );
}
