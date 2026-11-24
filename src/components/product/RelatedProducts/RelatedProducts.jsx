import { Link } from 'react-router-dom';
import ProductGrid from '@/components/product/ProductGrid/ProductGrid';
import ErrorState from '@/components/ui/ErrorState/ErrorState';
import { catalogHref } from '@/data/navigation';
import { useCategoryProducts } from '@/hooks/useCategoryProducts';
import styles from './RelatedProducts.module.scss';

const SHOWN = 4;

// "More in <department>": other products from the same category.
export default function RelatedProducts({ productId, category, categoryName }) {
  // One extra, because the current product is usually in the response.
  const { data, isPending, isError, refetch } = useCategoryProducts(category, SHOWN + 1);
  const others = (data ?? []).filter((item) => item.id !== productId).slice(0, SHOWN);

  return (
    <section aria-labelledby="related-heading">
      <div className={styles.header}>
        <h2 id="related-heading" className={styles.heading}>
          More in {categoryName}
        </h2>
        <Link to={catalogHref(category)} className={styles.link}>
          See all in {categoryName}
        </Link>
      </div>

      {isError && (
        <ErrorState
          compact
          title="Similar products did not load"
          message="The rest of this page still works. Try again, or browse the department."
          onRetry={refetch}
        />
      )}

      {!isError && !isPending && others.length === 0 && (
        <p className={styles.empty}>This is the only product in {categoryName} right now.</p>
      )}

      {!isError && (isPending || others.length > 0) && (
        <ProductGrid products={others} isLoading={isPending} skeletonCount={SHOWN} wide />
      )}
    </section>
  );
}
