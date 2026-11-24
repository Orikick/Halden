import { useQuery } from '@tanstack/react-query';
import { getCategoryProducts } from '@/api/products';

// Products from one category, e.g. for "More in Beauty" on a product page.
export function useCategoryProducts(slug, limit = 5) {
  return useQuery({
    queryKey: ['products', 'category', slug, limit],
    queryFn: ({ signal }) => getCategoryProducts(slug, limit, { signal }),
    enabled: Boolean(slug),
  });
}
