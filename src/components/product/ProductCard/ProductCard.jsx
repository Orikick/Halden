import { Link } from 'react-router-dom';
import AddToCartButton from '@/components/product/AddToCartButton/AddToCartButton';
import Badge from '@/components/ui/Badge/Badge';
import Image from '@/components/ui/Image/Image';
import PriceTag from '@/components/ui/PriceTag/PriceTag';
import Rating from '@/components/ui/Rating/Rating';
import { humanizeSlug } from '@/utils/filterProducts';
import { getDiscountLabel } from '@/utils/formatPrice';
import styles from './ProductCard.module.scss';

const LOW_STOCK = 5;

export default function ProductCard({ product, headingLevel: Heading = 'h3' }) {
  const { id, title, brand, category, description, price, discountPercentage, rating, thumbnail, stock } =
    product;
  const discountLabel = getDiscountLabel(discountPercentage);

  return (
    <article className={styles.card}>
      <div className={styles.shelf}>
        {/* alt is empty on purpose: the title link right below names the product. */}
        <Image src={thumbnail} alt="" width={300} height={300} className={styles.image} />
        {discountLabel && (
          <Badge tone="sale" className={styles.discount}>
            {discountLabel}
          </Badge>
        )}
        <PriceTag
          price={price}
          discountPercentage={discountPercentage}
          compact
          className={styles.price}
        />
      </div>

      <div className={styles.body}>
        <p className={styles.maker}>{brand || humanizeSlug(category)}</p>
        <Heading className={styles.title}>
          {/* The link's ::after covers the card, so the whole card is clickable. */}
          <Link to={`/product/${id}`} className={styles.link}>
            {title}
          </Link>
        </Heading>
        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.meta}>
          <Rating value={rating} />
          {stock === 0 && <Badge tone="warning">Sold out</Badge>}
          {stock > 0 && stock <= LOW_STOCK && <Badge tone="warning">Only {stock} left</Badge>}
        </div>
      </div>

      <div className={styles.action}>
        <AddToCartButton product={product} variant="secondary" size="sm" fullWidth />
      </div>
    </article>
  );
}
