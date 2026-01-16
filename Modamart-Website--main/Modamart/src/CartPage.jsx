
// src/pages/CartPage.jsx
import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { useCart } from './Context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleQuantityChange = (id, delta) => {
    updateQuantity(id, delta);
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <div className="flipkart-empty-cart">
            <div className="cart-icon-face">
              <div className="handle"></div>
              <div className="cart-body">
                <div className="box-top"></div>
                <div className="face">
                  <div className="eyes"></div>
                  <div className="mouth"></div>
                </div>
                <div className="wheels"></div>
              </div>
            </div>
            <p className="flipkart-empty-message">Your cart is empty!</p>
            <button className="flipkart-shop-btn" onClick={handleGoBack}>
              Shop now
            </button>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items-section">
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div className="details">
                      <h4>{item.title}</h4>
                      <p>Size: Fabric Only</p>
                      <p className="delivery">Estimated delivery: Monday, 14 Jul 2025</p>
                      <div className="qty-control">
                        <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </div>
                      <p className="price">MRP ₹{item.price * item.quantity}</p>
                      <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-summary-box">
              <h3>Order Summary</h3>
              <ul>
                <li>Subtotal: ₹{getTotalPrice()}</li>
                <li>Shipping & Handling: <strong>Free</strong></li>
              </ul>
              <h4>Estimated Total: ₹{getTotalPrice()}</h4>
              <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;

















































