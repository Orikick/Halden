import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/product/ProductDetails/ProductDetails';
import ProductFaq from '@/components/product/ProductFaq/ProductFaq';
import ProductGallery from '@/components/product/ProductGallery/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts/RelatedProducts';
import ReviewList from '@/components/product/ReviewList/ReviewList';
import ReviewSummary from '@/components/product/ReviewSummary/ReviewSummary';
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/Button/Button';
import EmptyState from '@/components/ui/EmptyState/EmptyState';
import ErrorState from '@/components/ui/ErrorState/ErrorState';
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import { catalogHref } from '@/data/navigation';
import { useCategories } from '@/hooks/useCategories';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useProduct } from '@/hooks/useProduct';
import { humanizeSlug } from '@/utils/filterProducts';
import styles from './ProductPage.module.scss';

function ProductSkeleton() {
  return (
    <>
      <p className="visually-hidden" role="status">
        Loading product…
      </p>
      <div aria-hidden="true">
        <Skeleton width="16rem" height="1rem" />
        <div className={styles.product}>
          <div className={styles.gallerySkeleton}>
            <Skeleton className={styles.imageSkeleton} />
            <div className={styles.thumbsSkeleton}>
              <Skeleton width="4.5rem" height="4.5rem" />
              <Skeleton width="4.5rem" height="4.5rem" />
              <Skeleton width="4.5rem" height="4.5rem" />
            </div>
          </div>
          <div className={styles.infoSkeleton}>
            <Skeleton width="30%" height="1rem" />
            <Skeleton width="80%" height="2.5rem" />
            <Skeleton width="45%" height="1.25rem" />
            <Skeleton width="8rem" height="2.75rem" />
            <Skeleton width="100%" height="5rem" />
            <Skeleton width="16rem" height="3.25rem" />
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const isValidId = /^\d+$/.test(id);
  const { data: product, isPending, isError, error, refetch } = useProduct(id, {
    enabled: isValidId,
  });
  const { data: categories } = useCategories();

  useDocumentTitle(product?.title ?? 'Product');

  const isMissing = !isValidId || (isError && error?.status === 404);

  if (isMissing) {
    return (
      <div className={styles.page}>
        <EmptyState
          headingLevel="h1"
          title="We cannot find that product"
          description="The link may be out of date, or we may have stopped stocking it."
        >
          <Button to="/catalog">Browse all products</Button>
        </EmptyState>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <ErrorState
          title="This product did not load"
          message={error?.message}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (isPending) {
    return (
      <div className={styles.page}>
        <ProductSkeleton />
      </div>
    );
  }

  const categoryName =
    categories?.find((category) => category.slug === product.category)?.name ??
    humanizeSlug(product.category);
  const reviews = product.reviews ?? [];

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: categoryName, to: catalogHref(product.category) },
          { label: product.title },
        ]}
      />

      <div className={styles.product}>
        {/* Keys reset the gallery and the quantity picker when the product changes. */}
        <ProductGallery
          key={`gallery-${product.id}`}
          images={product.images ?? []}
          title={product.title}
        />
        <ProductInfo key={`info-${product.id}`} product={product} />
      </div>

      <div className={styles.section}>
        <ProductDetails product={product} categoryName={categoryName} />
      </div>

      <div className={styles.section}>
        <ProductFaq product={product} />
      </div>

      <section className={styles.section} aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className={styles.reviewsTitle}>
          Customer reviews
        </h2>
        <ReviewSummary rating={product.rating} reviews={reviews} />
        <ReviewList reviews={reviews} />
      </section>

      <div className={styles.section}>
        <RelatedProducts
          productId={product.id}
          category={product.category}
          categoryName={categoryName}
        />
      </div>
    </div>
  );
}
