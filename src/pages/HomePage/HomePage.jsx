import { Link } from 'react-router-dom';
import ProductGrid from '@/components/product/ProductGrid/ProductGrid';
import Button from '@/components/ui/Button/Button';
import EmptyState from '@/components/ui/EmptyState/EmptyState';
import ErrorState from '@/components/ui/ErrorState/ErrorState';
import Image from '@/components/ui/Image/Image';
import { featuredCategories, hero, valueProps } from '@/data/homeContent';
import { catalogHref } from '@/data/navigation';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useFeaturedProducts } from '@/hooks/useProducts';
import styles from './HomePage.module.scss';

function FeaturedProducts() {
  const { data: products, isPending, isError, refetch } = useFeaturedProducts(8);

  if (isError) {
    return (
      <ErrorState
        title="Our best-rated products did not load"
        message="Check your connection and try again, or go straight to the catalog."
        onRetry={refetch}
      />
    );
  }

  if (!isPending && products.length === 0) {
    return (
      <EmptyState
        headingLevel="h3"
        title="Nothing to show here yet"
        description="The full catalog is still open."
      >
        <Button to="/catalog">Browse the catalog</Button>
      </EmptyState>
    );
  }

  return <ProductGrid products={products} isLoading={isPending} skeletonCount={8} wide />;
}

export default function HomePage() {
  useDocumentTitle('');

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroLead}>{hero.lead}</p>
          <div className={styles.heroActions}>
            <Button to={hero.primaryAction.to} size="lg">
              {hero.primaryAction.label}
            </Button>
            <Link to={hero.secondaryAction.to} className={styles.heroLink}>
              {hero.secondaryAction.label}
            </Link>
          </div>
        </div>

        <div className={styles.heroMedia}>
          <Image
            src={hero.image.src}
            srcSet={hero.image.srcSet}
            sizes={hero.image.sizes}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            eager
            className={styles.heroImage}
          />
          <p className={styles.heroLabel}>{hero.shelfLabel}</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="categories-heading">
        <div className={styles.sectionHeader}>
          <h2 id="categories-heading" className={styles.sectionTitle}>
            Shop by department
          </h2>
        </div>
        <ul className={styles.categories} role="list">
          {featuredCategories.map((category) => (
            <li key={category.slug}>
              <Link to={catalogHref(category.slug)} className={styles.category}>
                {/* Decorative: the department name next to it is the link text. */}
                <Image
                  src={category.image}
                  alt=""
                  width={480}
                  height={600}
                  className={styles.categoryImage}
                />
                <span className={styles.categoryText}>
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryBlurb}>{category.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="featured-heading">
        <div className={styles.sectionHeader}>
          <h2 id="featured-heading" className={styles.sectionTitle}>
            Rated highest by customers
          </h2>
          <Link to="/catalog?sort=rating" className={styles.sectionLink}>
            See all by rating
          </Link>
        </div>
        <FeaturedProducts />
      </section>

      <section className={styles.section} aria-labelledby="service-heading">
        <h2 id="service-heading" className="visually-hidden">
          How we look after orders
        </h2>
        <ul className={styles.values} role="list">
          {valueProps.map((item) => (
            <li key={item.title} className={styles.value}>
              <h3 className={styles.valueTitle}>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
