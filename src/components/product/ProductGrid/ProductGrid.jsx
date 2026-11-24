import ProductCard from '@/components/product/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton/ProductCardSkeleton';
import cx from '@/utils/cx';
import styles from './ProductGrid.module.scss';

// Responsive product list. While loading it renders skeleton cards plus a
// status message for screen readers. `wide` allows a fourth column on large
// screens (used where there is no sidebar).
export default function ProductGrid({
  products = [],
  isLoading = false,
  skeletonCount = 8,
  wide = false,
  headingLevel,
}) {
  const classes = cx(styles.grid, wide && styles.wide);

  if (isLoading) {
    return (
      <>
        <p className="visually-hidden" role="status">
          Loading products…
        </p>
        <ul className={classes} role="list" aria-hidden="true">
          {Array.from({ length: skeletonCount }, (_, index) => (
            <li key={index}>
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <ul className={classes} role="list">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
