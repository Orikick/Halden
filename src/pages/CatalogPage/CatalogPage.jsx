import { useEffect, useMemo } from 'react';
import ActiveFilters from '@/components/catalog/ActiveFilters/ActiveFilters';
import CategoryFilter from '@/components/catalog/CategoryFilter/CategoryFilter';
import FilterPanel from '@/components/catalog/FilterPanel/FilterPanel';
import PriceRange from '@/components/catalog/PriceRange/PriceRange';
import ResultsCount from '@/components/catalog/ResultsCount/ResultsCount';
import SortSelect from '@/components/catalog/SortSelect/SortSelect';
import ProductGrid from '@/components/product/ProductGrid/ProductGrid';
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/Button/Button';
import EmptyState from '@/components/ui/EmptyState/EmptyState';
import ErrorState from '@/components/ui/ErrorState/ErrorState';
import Pagination from '@/components/ui/Pagination/Pagination';
import { catalogIntro, getCategoryNote, searchIntro } from '@/data/categoryNotes';
import { useCatalogParams } from '@/hooks/useCatalogParams';
import { useCategories } from '@/hooks/useCategories';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useProducts } from '@/hooks/useProducts';
import {
  PAGE_SIZE,
  filterProducts,
  getPriceBounds,
  humanizeSlug,
  paginate,
  sortProducts,
} from '@/utils/filterProducts';
import styles from './CatalogPage.module.scss';

export default function CatalogPage() {
  const { filters, setFilters, clearFilters, getPageHref, activeCount } = useCatalogParams();
  const productsQuery = useProducts();
  const categoriesQuery = useCategories();

  const allProducts = productsQuery.data;
  const categories = categoriesQuery.data ?? [];
  const categoryName = filters.category
    ? (categories.find((category) => category.slug === filters.category)?.name ??
      humanizeSlug(filters.category))
    : '';

  // Filter -> sort -> paginate. Recomputed only when the data or the URL changes.
  const result = useMemo(() => {
    const matching = sortProducts(filterProducts(allProducts ?? [], filters), filters.sort);
    return { total: matching.length, ...paginate(matching, filters.page) };
  }, [allProducts, filters]);

  const priceBounds = useMemo(
    () => (allProducts ? getPriceBounds(allProducts) : null),
    [allProducts],
  );

  let heading = 'All products';
  let intro = catalogIntro;
  if (categoryName) {
    heading = categoryName;
    intro = getCategoryNote(filters.category).intro;
  } else if (filters.q) {
    heading = `Results for “${filters.q}”`;
    intro = searchIntro;
  }

  useDocumentTitle(heading);

  // Going to another results page starts at the top of the list.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filters.page]);

  const isLoaded = productsQuery.isSuccess;

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          ...(heading !== 'All products' ? [{ label: 'All products', to: '/catalog' }] : []),
          { label: heading },
        ]}
      />
      <h1 className={styles.title}>{heading}</h1>
      <p className={styles.intro}>{intro}</p>

      <div className={styles.layout}>
        <FilterPanel
          activeCount={activeCount}
          resultCount={isLoaded ? result.total : null}
          onClear={clearFilters}
        >
          <CategoryFilter
            categories={categories}
            value={filters.category}
            onChange={(category) => setFilters({ category })}
            isLoading={categoriesQuery.isPending}
            isError={categoriesQuery.isError}
            onRetry={categoriesQuery.refetch}
          />
          <PriceRange
            min={filters.min}
            max={filters.max}
            bounds={priceBounds}
            onChange={({ min, max }) => setFilters({ min, max })}
          />
        </FilterPanel>

        <section className={styles.results} aria-label="Products">
          <div className={styles.toolbar}>
            <div className={styles.count}>
              {isLoaded && <ResultsCount total={result.total} from={result.from} to={result.to} />}
            </div>
            <SortSelect
              value={filters.sort}
              onChange={(sort) => setFilters({ sort })}
              className={styles.sort}
            />
          </div>

          <ActiveFilters
            filters={filters}
            categoryName={categoryName}
            onRemove={setFilters}
            onClear={clearFilters}
          />

          {productsQuery.isPending && <ProductGrid isLoading skeletonCount={PAGE_SIZE} />}

          {productsQuery.isError && (
            <ErrorState
              title="The catalog did not load"
              message={productsQuery.error?.message}
              onRetry={productsQuery.refetch}
            />
          )}

          {isLoaded && (
            <>
              {result.total === 0 ? (
                <EmptyState
                  title="No products match these filters"
                  description="Try a different search word, widen the price range or pick another category."
                >
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </EmptyState>
              ) : (
                <>
                  <ProductGrid products={result.items} headingLevel="h2" />
                  <Pagination
                    page={result.page}
                    totalPages={result.totalPages}
                    getHref={getPageHref}
                  />
                </>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
