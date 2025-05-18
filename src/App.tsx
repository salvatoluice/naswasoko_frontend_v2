import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import Layout from './components/common/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import PageTitle from './components/common/PageTitle';
import PageLoader from './components/common/PageLoader';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AboutPage = lazy(() => import('./pages/Aboutpage'));
const ContactPage = lazy(() => import('./pages/contactPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStartLoading = () => setIsLoading(true);
    const handleStopLoading = () => {
      setTimeout(() => setIsLoading(false), 300);
    };

    handleStopLoading();

    return () => {
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <PageTitle />
      <Suspense fallback={<PageLoader />}>
        {isLoading && <PageLoader />}

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;