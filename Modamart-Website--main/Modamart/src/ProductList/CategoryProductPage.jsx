import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockData from '../data/mockData';
import mockDataWomen from '../data/mockDataWomen';
import mockDataMen from '../data/mockDataMen';
import mockDataKids from '../data/mockDataKids';
import mockDataUnisex from '../data/mockDataUnisex';
import mockDataAccessories from '../data/mockDataAcc';
import { useCart } from '../Context/CartContext';
import './CategoryPage.css';

// Import images for all categories
const rawImages = import.meta.glob('/src/assets/CategoryImage/*.{jpg,jpeg,png}', { eager: true });
const images = Object.entries(rawImages).reduce((acc, [path, module]) => {
  const filename = path.split('/').pop();
  acc[filename] = module.default;
  return acc;
}, {});

// Import Accessories images
const rawAccImages = import.meta.glob('/src/assets/AccImage/*.{jpg,jpeg,png}', { eager: true });
const accImages = Object.entries(rawAccImages).reduce((acc, [path, module]) => {
  const filename = path.split('/').pop();
  acc[filename] = module.default;
  return acc;
}, {});

const CategoryProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  // Combine all products, but keep accessories separate for image mapping
  const allProducts = [
    ...mockData,
    ...mockDataWomen,
    ...mockDataMen,
    ...mockDataKids,
    ...mockDataUnisex,
  ];

  // Try to find in accessories first
  let product = mockDataAccessories.find((item) => item.id === id);
  let imageSrc = '';
  if (product) {
    imageSrc = accImages[product.image] || '';
  } else {
    // Fallback to other categories
    product = allProducts.find((item) => item.id === parseInt(id));
    imageSrc = product ? images[product.imageName] || '' : '';
  }

  const isInCart = product && cartItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!product) return;
    const productToAdd = {
      id: product.id,
      title: product.name || product.title,
      price: product.price,
      image: imageSrc,
    };
    addToCart(productToAdd);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    if (!product) return;
    if (!isInCart) {
      const productToAdd = {
        id: product.id,
        title: product.name || product.title,
        price: product.price,
        image: imageSrc,
      };
      addToCart(productToAdd);
    }
    navigate('/checkout', { state: { product: { ...product, image: imageSrc, title: product.name || product.title } } });
  };

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image-section">
          {imageSrc ? (
            <img className="product-image" src={imageSrc} alt={product.name || product.title} />
          ) : (
            <p>Image not found</p>
          )}
        </div>
        <div className="product-details">
          <h2 className="product-title">{product.name || product.title}</h2>
          <p className="product-desc">{product.description}</p>
          <p className="product-price">₹{product.price}</p>
          <div className="product-buttons">
            {isInCart ? (
              <button onClick={() => navigate('/cart')}>Go to Cart</button>
            ) : (
              <button className="cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            )}
            <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
          </div>
          <div className="go-back">
            <button onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage;