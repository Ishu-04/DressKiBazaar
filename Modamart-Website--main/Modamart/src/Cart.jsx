// src/pages/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <div className="cart-page">
            <h2>🛒 Added to Cart Products</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {cartItems.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
                            <img src={item.image} alt={item.title} width="100" height="100" style={{ borderRadius: '8px' }} />
                            <div style={{ marginLeft: '20px' }}>
                                <h4>{item.title}</h4>
                                <p>₹{item.price}</p>
                                <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: 'red', color: '#fff', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '6px' }}>
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;