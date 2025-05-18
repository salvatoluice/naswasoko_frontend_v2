import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import Layout from './components/common/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import PageTitle from './components/common/PageTitle';
import PageLoader from './components/common/PageLoader';
import { AuthProvider } from './hooks/useAuth';
import AccountDashboard from './pages/AccountDashboard';

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

const Login = lazyLoad(() => import('./pages/Login'));
const Register = lazyLoad(() => import('./pages/Register'));

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
      <AuthProvider>
        <ScrollToTop />
        <PageTitle />
        {isLoading ? (
          <PageLoader />
        ) : (
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path="account" element={<AccountDashboard />} />

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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;