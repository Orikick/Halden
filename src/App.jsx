import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout/Layout';
import HomePage from '@/pages/HomePage/HomePage';

// The home page ships in the main bundle; every other route is loaded on demand.
const CatalogPage = lazy(() => import('@/pages/CatalogPage/CatalogPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage/ProductPage'));
const CartPage = lazy(() => import('@/pages/CartPage/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage/CheckoutPage'));
const OrderConfirmationPage = lazy(
  () => import('@/pages/OrderConfirmationPage/OrderConfirmationPage'),
);
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="checkout/confirmation" element={<OrderConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
