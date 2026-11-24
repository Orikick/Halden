import { describe, expect, it } from 'vitest';
import {
  PAGE_SIZE,
  filterProducts,
  getPriceBounds,
  humanizeSlug,
  paginate,
  sortProducts,
} from './filterProducts';

const products = [
  { id: 1, title: 'Red Lipstick', brand: 'Glow', category: 'beauty', price: 12, rating: 4.5, tags: ['makeup'] },
  { id: 2, title: 'Desk Lamp', brand: 'Lumen', category: 'furniture', price: 45, rating: 4.9, tags: ['lighting'] },
  { id: 3, title: 'Oak Chair', brand: 'Nord', category: 'furniture', price: 120, rating: 4.1, tags: ['wood'] },
  { id: 4, title: 'Face Cream', brand: 'Glow', category: 'skin-care', price: 30, rating: 3.8 },
];

const ids = (list) => list.map((product) => product.id);

describe('filterProducts', () => {
  it('returns every product when no filter is set', () => {
    expect(ids(filterProducts(products))).toEqual([1, 2, 3, 4]);
  });

  it('filters by category', () => {
    expect(ids(filterProducts(products, { category: 'furniture' }))).toEqual([2, 3]);
  });

  it('searches title, brand, category and tags, ignoring case and spaces', () => {
    expect(ids(filterProducts(products, { q: '  GLOW ' }))).toEqual([1, 4]);
    expect(ids(filterProducts(products, { q: 'wood' }))).toEqual([3]);
    expect(ids(filterProducts(products, { q: 'skin' }))).toEqual([4]);
  });

  it('copes with products that have no tags', () => {
    expect(ids(filterProducts(products, { q: 'cream' }))).toEqual([4]);
  });

  it('filters by a price range, inclusive at both ends', () => {
    expect(ids(filterProducts(products, { min: 30, max: 45 }))).toEqual([2, 4]);
  });

  it('combines filters', () => {
    expect(ids(filterProducts(products, { category: 'furniture', max: 100 }))).toEqual([2]);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterProducts(products, { q: 'piano' })).toEqual([]);
  });
});

describe('sortProducts', () => {
  it('sorts by price, rating and title', () => {
    expect(ids(sortProducts(products, 'price-asc'))).toEqual([1, 4, 2, 3]);
    expect(ids(sortProducts(products, 'price-desc'))).toEqual([3, 2, 4, 1]);
    expect(ids(sortProducts(products, 'rating'))).toEqual([2, 1, 3, 4]);
    expect(ids(sortProducts(products, 'title'))).toEqual([2, 4, 3, 1]);
  });

  it('does not change the original array', () => {
    const copy = [...products];
    sortProducts(products, 'price-desc');

    expect(products).toEqual(copy);
  });

  it('keeps the API order for "featured" and unknown values', () => {
    expect(sortProducts(products, 'featured')).toBe(products);
    expect(sortProducts(products, 'nonsense')).toBe(products);
  });
});

describe('paginate', () => {
  const items = Array.from({ length: 30 }, (_, index) => index + 1);

  it('returns one page and its range', () => {
    expect(paginate(items, 3)).toEqual({
      items: [25, 26, 27, 28, 29, 30],
      page: 3,
      totalPages: 3,
      from: 25,
      to: 30,
    });
  });

  it('uses the default page size', () => {
    expect(paginate(items, 1).items).toHaveLength(PAGE_SIZE);
  });

  it('keeps the page number inside the valid range', () => {
    expect(paginate(items, 10).page).toBe(3);
    expect(paginate(items, 0).page).toBe(1);
  });

  it('handles an empty list', () => {
    expect(paginate([], 1)).toEqual({ items: [], page: 1, totalPages: 1, from: 0, to: 0 });
  });
});

describe('getPriceBounds', () => {
  it('rounds the lowest price down and the highest price up', () => {
    expect(getPriceBounds([{ price: 12.4 }, { price: 99.2 }])).toEqual({ min: 12, max: 100 });
  });

  it('returns zeros for an empty list', () => {
    expect(getPriceBounds([])).toEqual({ min: 0, max: 0 });
  });
});

describe('humanizeSlug', () => {
  it('turns a slug into a label', () => {
    expect(humanizeSlug('mens-shirts')).toBe('Mens shirts');
  });

  it('returns an empty string for a missing slug', () => {
    expect(humanizeSlug(undefined)).toBe('');
  });
});
