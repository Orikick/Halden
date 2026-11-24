import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/products';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: ({ signal }) => getCategories({ signal }),
    // Categories almost never change during a visit.
    staleTime: 60 * 60 * 1000,
  });
}
