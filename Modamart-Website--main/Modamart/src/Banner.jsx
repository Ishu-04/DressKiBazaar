import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';
import mockData from './data/mockData';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { getFavourites, toggleFavourite } from './Utils/favourites';

// Banner images
import Banner4 from './assets/BannerImages/Banner4.jpg';
import Banner6 from './assets/BannerImages/Banner6.jpg';
import Banner7 from './assets/BannerImages/Banner7.jpg';
const bannerImages = [Banner4, Banner6, Banner7];

const imageModules = import.meta.glob('./assets/Image/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const imageMap = {};
Object.keys(imageModules).forEach((path) => {
  const fileName = path.split('/').pop();
  imageMap[fileName] = imageModules[path];
});

const Banner = () => {
  const navigate = useNavigate();

  const taglines = [
    "Your one-stop shop for ethnic fashion and trends.",
    "Explore our exclusive collection of traditional wear.",
    "Elevate your ethnic wear with Modamart.",
    "Discover the latest trends"
  ];

  const [tagIndex, setTagIndex] = useState(0);
  const [tagCharIndex, setTagCharIndex] = useState(0);
  const [typedTagline, setTypedTagline] = useState('');

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [likedIds, setLikedIds] = useState(getFavourites());

  // Typing effect
  useEffect(() => {
    const current = taglines[tagIndex];
    if (tagCharIndex <= current.length) {
      const type = setTimeout(() => {
        setTypedTagline(current.slice(0, tagCharIndex));
        setTagCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(type);
    } else {
      const pause = setTimeout(() => {
        setTagCharIndex(0);
        setTagIndex((prev) => (prev + 1) % taglines.length);
      }, 2000);
      return () => clearTimeout(pause);
    }
  }, [tagCharIndex, tagIndex]);

  // Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = () => setLikedIds(getFavourites());
    window.addEventListener('likedCountUpdated', handler);
    return () => window.removeEventListener('likedCountUpdated', handler);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${ productId }`);
  };

  const handleBannerClick = () => {
    if (mockData[0]) navigate(`/product/${ mockData[0].id }`);
  };

  const productsWithImages = mockData.filter(
    (product) => product.imageName && imageMap[product.imageName]
  );

  return (
    <>
      <div className="layout-container">
        <div className="content-wrapper">
          <section className="banner">
            <div className="banner-top">
              <div className="banner-text">
                <h2>Welcome to Modamart</h2>
                <p className="tagline-box">
                  <span className="tagline">{typedTagline}</span>
                </p>
                <button>Explore Collection</button>
              </div>

              <div className="slideshow-banner" onClick={handleBannerClick}>
                <img
                  src={bannerImages[currentBannerIndex]}
                  alt={`Banner ${currentBannerIndex + 1}`}
                className="banner-img"
                />
              </div>
            </div>

            <div className="card-grid">
              {productsWithImages.map((product) => {
                const imageSrc = imageMap[product.imageName];
                return (
                  <div
                    key={product.id}
                    className="image-box"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="image-area">
                      {imageSrc && <img src={imageSrc} alt={product.title} />}

                      {/* Like + Share vertically stacked */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 8
                        }}
                      >
                        <FaHeart
                          className="like-icon"
                          color={likedIds.includes(product.id) ? 'red' : 'gray'}
                          style={{
                            cursor: 'pointer',
                            background: 'black',
                            borderRadius: '50%',
                            padding: 6,
                            fontSize: 22
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavourite(product.id);
                            setLikedIds(getFavourites());
                          }}
                        />
                        <FaShareAlt
                          className="share-icon"
                          style={{
                            cursor: 'pointer',
                            background: 'black',
                            borderRadius: '50%',
                            padding: 6,
                            fontSize: 22
                          }}
                          onClick={e => {
                            e.stopPropagation();
                            const shareUrl = window.location.origin + `/product/${product.id}`;
                            if (navigator.share) {
                              navigator.share({
                                title: product.title,
                                text: product.description,
                                url: shareUrl,
                              });
                            } else {
                              // WhatsApp fallback
                              const waUrl = `https://wa.me/?text=${encodeURIComponent(product.title + '\n' + shareUrl)}`;
                              window.open(waUrl, '_blank');
                            }
                          }}
                          title="Share"
                        />
                      </div>
                    </div>

                    <div className="product-info-bar">
                      <span className="product-title">{product.title}</span>
                      <span className="product-price">₹{product.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
  
    </>
  );
};

export default Banner;









