import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import Layout from './components/common/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import PageTitle from './components/common/PageTitle';
import PageLoader from './components/common/PageLoader';

const lazyLoad = (importFunc: any) => {
  return lazy(() => importFunc().catch((error: unknown) => {
    console.error("Error loading component:", error);
    return { default: () => <div>Error loading page. Please refresh.</div> };
  }));
};

const HomePage = lazyLoad(() => import('./pages/HomePage'));
const ProductsPage = lazyLoad(() => import('./pages/ProductPage'));
const ProductDetailPage = lazyLoad(() => import('./pages/ProductDetailPage'));
const SearchPage = lazyLoad(() => import('./pages/SearchPage'));
const CheckoutPage = lazyLoad(() => import('./pages/CheckoutPage'));
const OrderConfirmationPage = lazyLoad(() => import('./pages/OrderConfirmationPage'));
const NotFoundPage = lazyLoad(() => import('./pages/NotFoundPage'));
const AboutPage = lazyLoad(() => import('./pages/Aboutpage'));
const ContactPage = lazyLoad(() => import('./pages/contactPage'));
const CategoriesPage = lazyLoad(() => import('./pages/CategoriesPage'));
const WishlistPage = lazyLoad(() => import('./pages/WishlistPage'));

const RouterObserver = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Route changed to:", location.pathname);
  }, [location]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTitle />
      <RouterObserver />
      {isLoading ? (
        <PageLoader />
      ) : (
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="wishlist" element={<WishlistPage />} /> 
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </Suspense>
      )}
    </BrowserRouter>
  );
}

export default App;