import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import PromoBanner from './PromoBanner.jsx';
import Footer from './Footer.jsx'; // Add this import
import { useCart } from './Context/CartContext.jsx';
import mockData from './data/mockData';
import './ProductPage.css';
import { FaHeart, FaShareAlt } from 'react-icons/fa';

// Build a map of images by filename
const imageModules = import.meta.glob('./assets/Image/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
});
const imageMap = {};
Object.keys(imageModules).forEach((path) => {
    const fileName = path.split('/').pop();
    imageMap[fileName] = imageModules[path];
});

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cartItems, addToCart } = useCart();
    const product = mockData.find((item) => item.id === parseInt(id));
    const isInCart = cartItems.some(item => item.id === parseInt(id));

    if (!product) {
        return <p>Product not found.</p>;
    }

    // Use imageName to get the correct image
    const imageSrc = imageMap[product.imageName] || '';

    const handleAddToCart = () => {
        const productimage = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: imageSrc,
        };
        addToCart(productimage);
        navigate('/cart');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.title,
                text: product.description,
                url: window.location.href,
                files: undefined 
            });
        } else {
            
            const shareUrl = `https://wa.me/?text=${encodeURIComponent(product.title + '\n' + window.location.href)}`;
            window.open(shareUrl, '_blank');
        }
    };

    const handleBuyNow = () => {
        if (!isInCart) {
            const productimage = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: imageMap[product.imageName] || '',
            };
            addToCart(productimage);
        }
        navigate('/checkout');
    };

    return (
        <>
            <Navbar />
            <PromoBanner />
            <div className="product-page">
                <div className="product-container">
                    <div className="product-image-section">
                        {imageSrc ? (
                            <>
                                <img className="product-image" src={imageSrc} alt={product.title} />
                                <div style={{
                                    position: 'absolute',
                                    top: 20,
                                    right: 20,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    gap: 8,
                                    zIndex: 2,
                                }}>
                                    <FaHeart
                                        className="like-icon"
                                        color={isInCart ? 'red' : 'gray'}
                                        style={{
                                            background: '#fff',
                                            borderRadius: '50%',
                                            padding: 6,
                                            fontSize: 22,
                                            cursor: 'pointer',
                                            marginBottom: 6,
                                            opacity: 1,
                                            visibility: 'visible'
                                        }}
                                    // Add your like logic here if needed
                                    />
                                    <FaShareAlt
                                        className="share-icon"
                                        style={{
                                            background: 'black',
                                            borderRadius: '50%',
                                            padding: 6,
                                            fontSize: 22,
                                            cursor: 'pointer',
                                            opacity: 1,
                                            visibility: 'visible'
                                        }}
                                        onClick={handleShare}
                                        title="Share"
                                    />
                                </div>
                            </>
                        ) : (
                            <p>Image not found</p>
                        )}
                    </div>
                    <div className="product-details">
                        <h2 className="product-title">{product.title}</h2>
                        <p className="product-desc">{product.description}</p>
                        <p className="product-price">₹{product.price}</p>
                        <div className='product-buttons'>
                            {isInCart ? (
                                <button onClick={() => navigate('/cart')}>Go to Cart</button>
                            ) : (
                                <button className='cart-btn' onClick={handleAddToCart}>Add to Cart</button>
                            )}
                            <button className='buy-btn' onClick={handleBuyNow}>Buy Now</button>
                        </div>
                        <div className='go-back'>
                            <button onClick={() => navigate(-1)}>Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> 
        </>
    );
};

export default ProductPage;









