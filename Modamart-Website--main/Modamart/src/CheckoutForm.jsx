import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { useCart } from './Context/CartContext.jsx';
import { useLocation } from 'react-router-dom';
import './CartPage.css';

const initialState = {
  name: '',
  address: '',
  city: '',
  pin: '',
  email: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardHolder: '',
  cardType: '',
};

const CheckoutForm = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const selectedProduct = location.state?.product || null;

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Load saved addresses from localStorage
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedSavedAddress, setSelectedSavedAddress] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('savedAddresses');
    setSavedAddresses(stored ? JSON.parse(stored) : []);
  }, []);

  // When a saved address is selected, fill the form
  useEffect(() => {
    if (selectedSavedAddress !== '') {
      const addr = savedAddresses[selectedSavedAddress];
      if (addr) {
        setForm((prev) => ({
          ...prev,
          address: `${addr.line1}${addr.line2 ? ', ' + addr.line2 : ''}`,
          city: addr.city,
          pin: addr.zip,
        }));
      }
    }
  }, [selectedSavedAddress, savedAddresses]);

  // Total based on cart or selected product
  const getTotal = () =>
    selectedProduct
      ? selectedProduct.price
      : cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.city) newErrors.city = 'City is required';
    if (!form.zip) newErrors.zip = 'PIN is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';
    if (!form.cardNumber || !/^\d{16}$/.test(form.cardNumber)) newErrors.cardNumber = '16-digit card number required';
    if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) newErrors.expiry = 'Expiry MM/YY required';
    if (!form.cvv || !/^\d{3,4}$/.test(form.cvv)) newErrors.cvv = 'CVV required';
    if (!form.cardHolder) newErrors.cardHolder = 'Cardholder name required';
    if (!form.cardType) newErrors.cardType = 'Card type required';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="cart-page">
          <div className="checkout-success">
            <h2>🎉 Thank you for your order!</h2>
            <p>
              Your payment of ₹{getTotal()} has been successfully processed.
            </p>
            <button
              className="go-back-btn"
              onClick={() => window.location.href = '/'}
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="checkout-page-wrapper">
        <h2 className="checkout-title">Secure Checkout</h2>
        <div className="checkout-container">
          <form onSubmit={handleSubmit}>
            <div className="checkout-form-columns">
              {/* Shipping Info */}
              <div className="checkout-column">
                <h3>Shipping Information</h3>
                {/* Address Inputs */}
                <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
                {errors.name && <div className="error">{errors.name}</div>}
                <input name="address" placeholder="Street Address" value={form.address} onChange={handleChange} />
                {errors.address && <div className="error">{errors.address}</div>}
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
                {errors.city && <div className="error">{errors.city}</div>}
                <input name="pin" placeholder="PIN Code" value={form.pin} onChange={handleChange} />
                {errors.zip && <div className="error">{errors.zip}</div>}
                <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              {/* Payment Info */}
              <div className="checkout-column">
                <h3>Payment Information</h3>
                <input name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} maxLength={16} />
                {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
                <input name="expiry" placeholder="Expiry (MM/YY)" value={form.expiry} onChange={handleChange} maxLength={5} />
                {errors.expiry && <div className="error">{errors.expiry}</div>}
                <input name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} maxLength={4} />
                {errors.cvv && <div className="error">{errors.cvv}</div>}
                <input name="cardHolder" placeholder="Cardholder Name" value={form.cardHolder} onChange={handleChange} />
                {errors.cardHolder && <div className="error">{errors.cardHolder}</div>}
                <select name="cardType" value={form.cardType} onChange={handleChange}>
                  <option value="">Select Card Type</option>
                  <option value="Visa">Visa</option>
                  <option value="MasterCard">MasterCard</option>
                  <option value="Amex">American Express</option>
                  <option value="Rupay">RuPay</option>
                </select>
                {errors.cardType && <div className="error">{errors.cardType}</div>}
              </div>
            </div>

            {/* Address Dropdown and Place Order Button side by side */}
            <div className="checkout-actions-row">
              {savedAddresses.length > 0 && (
                <div className="checkout-address-dropdown">
                  <label style={{ fontWeight: 600, color: '#6366f1' }}>Select Saved Address:</label>
                  <select
                    value={selectedSavedAddress}
                    onChange={(e) => setSelectedSavedAddress(e.target.value)}
                  >
                    <option value="">-- Select Address --</option>
                    {savedAddresses.map((addr, idx) => (
                      <option key={idx} value={idx}>
                        {addr.line1}{addr.line2 ? ', ' + addr.line2 : ''}, {addr.city}, {addr.state} - {addr.zip}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button type="submit" className="place-order-btn">🛍 Place Order</button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="order-summary-box">
            <h3>Order Summary</h3>
            <ul>
              {selectedProduct ? (
                <li>{selectedProduct.title} — ₹{selectedProduct.price}</li>
              ) : (
                cartItems.map((item, idx) => (
                  <li key={idx}>
                    {item.title} * {item.quantity} — ₹{item.price * (item.quantity || 1)}
                  </li>
                ))
              )}
            </ul>
            <h4>Total: ₹{getTotal()}</h4>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutForm;

















