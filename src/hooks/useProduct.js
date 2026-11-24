import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/api/products';

export function useProduct(id, { enabled = true } = {}) {
  return useQuery({
    queryKey: ['product', String(id)],
    queryFn: ({ signal }) => getProduct(id, { signal }),
    enabled,
  });
}
