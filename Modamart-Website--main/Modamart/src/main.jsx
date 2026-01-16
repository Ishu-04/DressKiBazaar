import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import CheckoutForm from './CheckoutForm.jsx';
import { CartProvider } from './Context/CartContext.jsx';
import ScrollTop from './ScrollTop.jsx';
import Login from './Login.jsx';

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <BrowserRouter>
      <ScrollTop/>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
);