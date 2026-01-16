import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import PromoBanner from './PromoBanner.jsx';
import Banner from './Banner.jsx';
import ProductPage from './ProductPage.jsx';
import CartPage from './CartPage.jsx';
import CategoryPage from './ProductList/CategoryPage.jsx';
import CategoryProductPage from './ProductList/CategoryProductPage.jsx';
import LikeManager from './LikeManager.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import CheckoutForm from './CheckoutForm.jsx'; 
import Footer from './Footer.jsx'; 
import Address from './Address.jsx';

function App() {
  const isAuthenticated = !!localStorage.getItem('modamartUser');
  const location = useLocation();

  // If authenticated, prevent access to login/signup
  if (isAuthenticated && (location.pathname === '/' || location.pathname === '/signup')) {
    return <Navigate to="/home" replace />;
  }

  // If not authenticated, only allow login/signup
  if (!isAuthenticated && location.pathname !== '/' && location.pathname !== '/signup') {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <>
            <Navbar />
            <PromoBanner />
            <Banner />
            <Footer />
          </>
        } />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/liked" element={
          <>
            <Navbar />
            <LikeManager asPage={true} />
            <Footer />
          </>
        } />
        <Route path="/category/:categoryName" element={
          <>
            <Navbar />
            <PromoBanner />
            <CategoryPage />
            <Footer />
          </>
        } />
        <Route path="/category-product/:id" element={
          <>
            <Navbar />
            <CategoryProductPage />
            <Footer />
          </>
        } />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/account" element={
          <>
            <Navbar />
            <Address />
            <Footer />
          </>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;