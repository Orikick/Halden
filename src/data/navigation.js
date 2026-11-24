// Header and footer links. `category` is a DummyJSON category slug;
// an empty string means the unfiltered catalog.
export const navigation = [
  { label: 'Shop all', category: '' },
  { label: 'Furniture', category: 'furniture' },
  { label: 'Home decoration', category: 'home-decoration' },
  { label: 'Kitchen', category: 'kitchen-accessories' },
  { label: 'Groceries', category: 'groceries' },
  { label: 'Beauty', category: 'beauty' },
  { label: 'Skin care', category: 'skin-care' },
  { label: 'Laptops', category: 'laptops' },
  { label: 'Smartphones', category: 'smartphones' },
];

// Short promises shown in the strip above the header.
export const servicePromises = [
  'Free delivery on orders over $50',
  'Returns accepted for 30 days',
];

export const supportPhone = { label: '+31 10 555 0142', href: 'tel:+31105550142' };

export const catalogHref = (category) =>
  category ? `/catalog?category=${encodeURIComponent(category)}` : '/catalog';
