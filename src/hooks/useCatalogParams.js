import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_SORT, sortOptions } from '@/data/sortOptions';

const SORT_VALUES = sortOptions.map((option) => option.value);

const toPrice = (raw) => {
  if (raw == null || raw === '') return null;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : null;
};

const isDefault = (key, value) =>
  value == null ||
  value === '' ||
  (key === 'sort' && value === DEFAULT_SORT) ||
  (key === 'page' && Number(value) <= 1);

// Catalog filters live in the URL (?category=&q=&min=&max=&sort=&page=) so a
// filtered view can be bookmarked, shared and restored with the back button.
export function useCatalogParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const sort = searchParams.get('sort');
    return {
      category: searchParams.get('category') ?? '',
      q: searchParams.get('q') ?? '',
      min: toPrice(searchParams.get('min')),
      max: toPrice(searchParams.get('max')),
      sort: SORT_VALUES.includes(sort) ? sort : DEFAULT_SORT,
      page: Math.max(1, Number.parseInt(searchParams.get('page'), 10) || 1),
    };
  }, [searchParams]);

  // Applies a patch to the current params. Default values are dropped so URLs
  // stay short, and any filter change sends the user back to page 1.
  const buildParams = useCallback(
    (patch) => {
      const next = new URLSearchParams(searchParams);
      if (!('page' in patch)) next.delete('page');

      Object.entries(patch).forEach(([key, value]) => {
        if (isDefault(key, value)) next.delete(key);
        else next.set(key, String(value));
      });

      return next;
    },
    [searchParams],
  );

  const setFilters = useCallback(
    (patch, { replace = false } = {}) => setSearchParams(buildParams(patch), { replace }),
    [buildParams, setSearchParams],
  );

  // Clears every filter but keeps the chosen sort order.
  const clearFilters = useCallback(
    () => setFilters({ category: '', q: '', min: null, max: null }),
    [setFilters],
  );

  const getPageHref = useCallback(
    (page) => {
      const search = buildParams({ page }).toString();
      return { pathname: '/catalog', search: search ? `?${search}` : '' };
    },
    [buildParams],
  );

  const activeCount =
    Number(Boolean(filters.category)) +
    Number(Boolean(filters.q)) +
    Number(filters.min != null || filters.max != null);

  return { filters, setFilters, clearFilters, getPageHref, activeCount };
}
