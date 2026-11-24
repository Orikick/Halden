// Unsplash photos, served through their image CDN so each one can be
// requested at the size it is displayed.
const unsplash = (id, width, height) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70&w=${width}` +
  (height ? `&h=${height}` : '');

const heroPhoto = 'photo-1441986300917-64674bd600d8';

export const hero = {
  title: 'Everyday things, well chosen.',
  lead: 'Halden is a general store for the home, the desk and the kitchen cupboard. We stock around two hundred products and we have a reason for every one of them.',
  primaryAction: { label: 'Browse the catalog', to: '/catalog' },
  secondaryAction: { label: 'Start with groceries', to: '/catalog?category=groceries' },
  shelfLabel: 'Packed and posted from Rotterdam',
  image: {
    src: unsplash(heroPhoto, 960, 720),
    srcSet: [480, 720, 960, 1280]
      .map((width) => `${unsplash(heroPhoto, width, Math.round(width * 0.75))} ${width}w`)
      .join(', '),
    sizes: '(min-width: 768px) 46vw, 100vw',
    alt: 'Inside a small shop: clothes on rails and goods laid out on wooden tables',
    width: 960,
    height: 720,
  },
};

export const featuredCategories = [
  {
    slug: 'furniture',
    name: 'Furniture',
    blurb: 'Beds, sofas and bedside tables',
    image: unsplash('photo-1555041469-a586c61ea9bc', 480, 600),
    alt: 'A green velvet sofa against a pale wall',
  },
  {
    slug: 'groceries',
    name: 'Groceries',
    blurb: 'Fresh produce and cupboard staples',
    image: unsplash('photo-1542838132-92c53300491e', 480, 600),
    alt: 'Crates of fresh vegetables on a market stall',
  },
  {
    slug: 'beauty',
    name: 'Beauty',
    blurb: 'Make-up and nail colour',
    image: unsplash('photo-1556228453-efd6c1ff04f6', 480, 600),
    alt: 'Skincare bottles and jars arranged on a shelf',
  },
  {
    slug: 'laptops',
    name: 'Laptops',
    blurb: 'For work, study and the sofa',
    image: unsplash('photo-1496181133206-80ce9b88a853', 480, 600),
    alt: 'An open laptop on a wooden desk',
  },
];

export const valueProps = [
  {
    title: 'Delivery that is easy to work out',
    text: 'Free on orders over $50 and $4.95 below that. Standard delivery takes three to five working days.',
  },
  {
    title: 'Thirty days to change your mind',
    text: 'Send anything back within 30 days for a full refund. The returns label is in the box.',
  },
  {
    title: 'People answer the phone',
    text: 'Our support team is in on weekdays from 8:00 to 18:00 CET and replies to email within a day.',
  },
];
