import { request } from './client';

// Only the fields a product card needs; keeps the full-catalog payload small.
const CARD_FIELDS = [
  'title',
  'description',
  'price',
  'discountPercentage',
  'rating',
  'stock',
  'category',
  'brand',
  'tags',
  'thumbnail',
].join(',');

export async function getAllProducts({ signal } = {}) {
  const data = await request(`/products?limit=0&select=${CARD_FIELDS}`, { signal });
  return data.products;
}

export async function getFeaturedProducts(limit, { signal } = {}) {
  const data = await request(
    `/products?limit=${limit}&sortBy=rating&order=desc&select=${CARD_FIELDS}`,
    { signal },
  );
  return data.products;
}

// Up to `limit` products from one category, for "More in this department".
export async function getCategoryProducts(slug, limit, { signal } = {}) {
  const data = await request(
    `/products/category/${encodeURIComponent(slug)}?limit=${limit}&select=${CARD_FIELDS}`,
    { signal },
  );
  return data.products;
}

export function getProduct(id, { signal } = {}) {
  return request(`/products/${id}`, { signal });
}

// Returns [{ slug, name, url }]
export function getCategories({ signal } = {}) {
  return request('/products/categories', { signal });
}
