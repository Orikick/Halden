import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getFeaturedProducts } from '@/api/products';

// The whole catalog, fetched once and cached. Filtering happens client-side.
export function useProducts() {
  return useQuery({
    queryKey: ['products', 'all'],
    queryFn: ({ signal }) => getAllProducts({ signal }),
  });
}

// Highest-rated products for the home page.
export function useFeaturedProducts(limit = 8) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: ({ signal }) => getFeaturedProducts(limit, { signal }),
  });
}
