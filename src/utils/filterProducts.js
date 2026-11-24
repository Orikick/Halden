// Pure helpers for the catalog. The DummyJSON API has no price filter and
// cannot combine search with a category, so the catalog is filtered, sorted
// and paginated in the browser.

export const PAGE_SIZE = 12;

const includes = (text, query) => String(text ?? '').toLowerCase().includes(query);

export function filterProducts(products, { category = '', q = '', min = null, max = null } = {}) {
  const query = q.trim().toLowerCase();

  return products.filter((product) => {
    if (category && product.category !== category) return false;
    if (min != null && product.price < min) return false;
    if (max != null && product.price > max) return false;
    if (!query) return true;

    return (
      includes(product.title, query) ||
      includes(product.brand, query) ||
      includes(product.category, query) ||
      (product.tags ?? []).some((tag) => includes(tag, query))
    );
  });
}

const comparators = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  title: (a, b) => a.title.localeCompare(b.title),
};

export function sortProducts(products, sort) {
  const compare = comparators[sort];
  // "featured" (or anything unknown) keeps the order the API returned.
  return compare ? [...products].sort(compare) : products;
}

export function paginate(items, page, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: currentPage,
    totalPages,
    from: items.length === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, items.length),
  };
}

export function getPriceBounds(products) {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((product) => product.price);
  return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
}

// "mens-shirts" -> "Mens shirts". Fallback label while category names load.
export function humanizeSlug(slug) {
  const text = String(slug ?? '').replace(/-/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}
