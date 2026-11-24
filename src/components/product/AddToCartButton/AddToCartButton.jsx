import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import { useCartStore } from '@/store/cartStore';

const CONFIRMATION_MS = 1800;

// Adds a product to the cart and confirms it both visually and to screen
// readers (role="status").
export default function AddToCartButton({ product, quantity = 1, ...buttonProps }) {
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const isSoldOut = product.stock === 0;

  const handleClick = () => {
    addItem(product, quantity);
    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), CONFIRMATION_MS);
  };

  let label = 'Add to cart';
  if (isSoldOut) label = 'Sold out';
  else if (justAdded) label = 'Added to cart';

  return (
    <>
      <Button onClick={handleClick} disabled={isSoldOut} {...buttonProps}>
        {justAdded && <Icon name="check" size={18} />}
        <span>
          {label}
          <span className="visually-hidden">: {product.title}</span>
        </span>
      </Button>
      <span className="visually-hidden" role="status">
        {justAdded ? `${product.title} added to cart` : ''}
      </span>
    </>
  );
}
