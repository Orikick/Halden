# Halden: a demo online store

Developed by **Orest Labiak**.

**Live demo:** https://halden-1.netlify.app/

<!-- Screenshots: save them to the docs/ folder with these names, then delete this comment's first and last lines.
![Desktop view](docs/screenshot-desktop.png)
![Mobile view](docs/screenshot-mobile.png)
-->

Halden is a fictional general store for the home, the desk and the kitchen cupboard. The site is a portfolio project: a complete storefront built with React on top of the public [DummyJSON products API](https://dummyjson.com/docs/products). It covers the whole path from browsing to a placed order: home page, catalog with filters, product page, cart, checkout and order confirmation.

No real payment is taken and nothing is shipped. Orders are simulated in the browser.

## Stack

| Area | Choice |
| --- | --- |
| Build tool | [Vite](https://vite.dev/) 6 |
| UI | React 19 (JavaScript, function components and hooks) |
| Routing | React Router 7 (`BrowserRouter`, lazy-loaded routes) |
| Server state | TanStack Query 5 (caching, retries, loading and error states) |
| Client state | Zustand 5 with the `persist` middleware (cart in `localStorage`) |
| Styles | SCSS modules, CSS custom properties for design tokens |
| Data | DummyJSON products API; photos from Unsplash |

There are no other runtime dependencies. Form validation, icons and the image fallback are small in-house modules.

## How to run

You need Node.js 18 or newer (Node 20+ recommended).

```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

To measure Lighthouse scores, run `npm run build && npm run preview` and audit the preview URL. The dev server is unminified and scores lower.

### Deploying

This is a single-page app, so the host must send `index.html` for every route (for example `/catalog` or `/product/12`):

- **Netlify:** add a `public/_redirects` file containing `/* /index.html 200`.
- **Vercel:** add a `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`.

## Features

### Header

- Three tiers: a dark service strip (delivery, returns, support phone), a main bar with a large wordmark, a store-wide search field and the cart with its item count, and a row of department tabs.
- The search works from any page. On the catalog it keeps the current department and price filters and only changes the search term.
- Below 768px the departments fold into a menu button and the search moves to its own full-width row.

### Pages

- **Home** (`/`): hero, four featured departments, the eight highest-rated products, and service promises.
- **Catalog** (`/catalog`): every product, with filters, sorting, search and pagination. Each department has its own short introduction under the heading.
- **Product** (`/product/:id`): image gallery, price, discount and the amount saved, stock, quantity picker, delivery cost, shipping time, returns and warranty at a glance, an "About this product" section (why Halden stocks it, how to choose, a practical tip, tags that link to similar products), a specification table, answers to common questions, a rating summary with a star breakdown, customer reviews and "More in" the same department.
- **Cart** (`/cart`): change quantities, remove items, see subtotal, delivery and total.
- **Checkout** (`/checkout`): contact and address form with validation, delivery method, payment method, live order summary.
- **Order confirmation** (`/checkout/confirmation`): order number, delivery address and what was ordered. Opening it directly redirects to the cart.
- **404** for any unknown address.

### Catalog

- Filter by **category** and **price range**, **search** by name, brand, category or tag, and **sort** by price, rating or name.
- Twelve products per page, with **pagination** as real links.
- **Every filter lives in the URL** (`?category=beauty&q=lip&min=5&max=40&sort=price-asc&page=2`), so a filtered view can be bookmarked, shared or restored with the back button. Default values are left out to keep links short, and changing a filter returns to page 1.
- Active filters appear as removable chips, with a "Clear all" action.
- On screens below 1024px the filters open in a drawer built on the native `<dialog>` element, which handles focus trapping and Esc.

DummyJSON has no price filter and cannot combine search with a category, so the catalog downloads the product list once (only the fields a card needs) and filters, sorts and paginates it in the browser. The helpers in `src/utils/filterProducts.js` are pure functions.

### Product copy

- Product cards show the brand (or department), the name, two lines of the description, the rating and a low-stock warning.
- `src/data/categoryNotes.js` holds Halden's own copy for all 24 DummyJSON departments: a one-line introduction for the catalog, plus "Why we stock it", three "How to choose" tips and "Good to know" for product pages.
- "Questions about this product" answers when it will arrive, what delivery costs, whether it can be returned, the warranty and how many can be ordered. The answers are built from the product's own data by `src/utils/productFacts.js`, and use native `<details>` elements, so they work with the keyboard and screen readers without extra script.
- The specification table lists brand, department, availability, rating, package size, delivery, returns, warranty, the month the product was added, product code and barcode.
- DummyJSON gives every product the same generic delivery, returns and warranty fields, so `getProductPolicy()` in `src/utils/productFacts.js` decides what makes sense per department. Groceries show chilled delivery and a refund for damaged or out-of-date food, with no warranty or package size. Beauty, skin care and fragrances have no warranty and can only be returned unopened. Clothing has no warranty.

### Cart and checkout

- The cart is a Zustand store persisted to `localStorage`, so it survives reloads.
- Quantities are limited to the product's stock and to 20 per item.
- Standard delivery is free from $50 and costs $4.95 below that; express delivery costs $12.50. The cart shows how much more is needed for free delivery.
- Checkout validation runs on blur and on submit. Errors appear under each field and are linked to it with `aria-describedby`, a summary is announced, and focus moves to the first invalid field.
- Placing an order is simulated with a short delay, so the button shows a pending state.

### Loading, empty and error states

- **Loading:** skeleton cards with the same proportions as the real cards (no layout shift), a skeleton product page and skeleton category list, each with a screen-reader status message.
- **Empty:** for a cart with nothing in it, checkout with an empty cart, filters with no matches, a product with no reviews, and an unknown product id.
- **Error:** every request has an error message with a "Try again" button. If similar products fail to load on a product page, the rest of the page still works. A failed category list still leaves search and sorting usable. A render error is caught by an error boundary instead of blanking the app.
- Broken product or Unsplash images are replaced by a neutral placeholder.

### Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`), one `h1` per page, and a logical heading order.
- A skip link to the main content.
- Visible keyboard focus everywhere (3px ring; yellow on the dark footer).
- Every form control has a label. Radio groups use `fieldset` and `legend`.
- Live regions announce result counts, "added to cart" and loading states.
- The product gallery is keyboard operable (arrow keys, Home, End).
- Touch targets are at least 44px. Text colours meet WCAG AA contrast.
- `prefers-reduced-motion` turns off the skeleton shimmer and transitions.

### Performance

- Only the home page is in the main bundle. Every other page is code-split with `React.lazy`.
- The hero image is served at the right size with `srcset` and loads with high priority. All other images load lazily with explicit width and height.
- The full catalog request uses `select` to fetch only card fields. Results are cached for five minutes, and categories for an hour.
- `preconnect` hints for the API, image CDNs and fonts.

### Responsive layout

The layout is mobile-first and tested at 360px, 768px, 1280px, 1440px and 1920px. Content is up to 1440px wide on large screens. Product grids go from two columns to three, then four (on the home page from 1024px, in the catalog from 1440px). The catalog sidebar appears from 1024px.

## Folder structure

```
src/
├─ api/          fetch wrapper, product requests, simulated order
├─ components/
│  ├─ layout/    Layout, Header, HeaderSearch, Footer, SkipLink, ErrorBoundary
│  ├─ ui/        Button, TextField, Select, Skeleton, Rating, Badge, PriceTag,
│  │             Image, Icon, QuantityStepper, Pagination, Breadcrumbs,
│  │             EmptyState, ErrorState
│  ├─ product/   ProductCard, ProductCardSkeleton, ProductGrid, ProductGallery,
│  │             ProductInfo, ProductDetails, ProductFaq, ReviewSummary,
│  │             ReviewList, RelatedProducts, AddToCartButton
│  ├─ catalog/   FilterPanel, CategoryFilter, PriceRange, SortSelect,
│  │             ActiveFilters, ResultsCount
│  ├─ cart/      CartItem, CartSummary
│  └─ checkout/  CheckoutForm, OrderSummary, OrderConfirmation
├─ data/         static content: navigation, department notes, home copy, sort options,
│                checkout fields
├─ hooks/        useProducts, useProduct, useCategories, useCategoryProducts,
│                useCatalogParams, useForm, useMediaQuery, useDocumentTitle
├─ pages/        one folder per route
├─ store/        cartStore (Zustand)
├─ styles/       design tokens, mixins, global styles
└─ utils/        filtering, cart totals, product facts, validators, price formatting
```

Each component has its own folder with `Component.jsx` and `Component.module.scss`. Imports use the `@/` alias for `src/`.

## Design

The visual idea is a well-run corner shop. Every product stands on a "shelf" (a tinted bay with a solid dark edge), and prices hang off that edge as yellow shelf-edge labels with a punched hole. The palette is deep green-black ink on a pale sage paper, with enamel blue for actions and focus. Headings use Bricolage Grotesque and body text uses Hanken Grotesk.

## Credits

- Product data and product photos: [DummyJSON](https://dummyjson.com/).
- Hero and department photos: [Unsplash](https://unsplash.com/), used under the Unsplash License.
- Halden, its address, phone number and email are fictional.

## Code quality

```bash
npm run lint          # check the code with ESLint
npm run lint:fix      # fix what ESLint can fix automatically
npm run format        # format every file with Prettier
npm run format:check  # check formatting without changing files
```

ESLint uses the recommended JavaScript rules plus the React Hooks rules (`eslint.config.js`).
Prettier settings are in `.prettierrc.json`.

### Tests

```bash
npm test              # run the tests in watch mode
npm run test:run      # run the tests once
```

Unit tests with [Vitest](https://vitest.dev) cover the logic the store depends on:

- `src/store/cartStore.test.js`: adding, merging, limiting, removing and saving cart items
- `src/utils/cartTotals.test.js`: subtotal, delivery price, free-delivery threshold and rounding
- `src/utils/filterProducts.test.js`: search, category and price filters, sorting and pagination
- `src/utils/validators.test.js`: the checkout form validators
