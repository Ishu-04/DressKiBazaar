import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from './Context/CartContext.jsx';
import './Navbar.css';
import { FaHome, FaUser, FaHeart, FaShoppingCart, FaWhatsapp, FaBars, FaSignOutAlt } from 'react-icons/fa';
// import AuthModal from './AuthModal';

const Navbar = () => {
  const sugg = ["suits", "sarees", "lehengas", "gown", "kurtas", "anarkali"];
  const dynamic = [
    "Explore Modamart's exclusive collection of regal outfits for everyone",
    "Royal fashion now just a click away all over India.",
    "Make every occasion majestic",
    "Traditional elegance meets modern luxury - Only at Modamart.",
    "Shop Modamart's royal wear collection today"
  ];

  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dynamicIndex, setDynamicIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(true);
  const [likeCount, setLikeCount] = useState(() => {
    const stored = localStorage.getItem('likedProducts');
    return stored ? JSON.parse(stored).length : 0;
  });
  // const [authOpen] = useState(false);
  // const [authMode] = useState('signin'); // 'signin' or 'signup'
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const updateLikeCount = (e) => {
      setLikeCount(e.detail);
    };
    window.addEventListener('likedCountUpdated', updateLikeCount);
    return () => {
      window.removeEventListener('likedCountUpdated', updateLikeCount);
    };
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const currentWord = sugg[index];
    if (charIndex <= currentWord.length) {
      const typing = setTimeout(() => {
        setPlaceholder(currentWord.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(typing);
    } else {
      const pause = setTimeout(() => {
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % sugg.length);
      }, 1000);
      return () => clearTimeout(pause);
    }
  }, [charIndex, index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(false);
      setTimeout(() => {
        setDynamicIndex((prev) => (prev + 1) % dynamic.length);
        setIsSliding(true);
      }, 50);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };
    if (profileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdown]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const { cartItems } = useCart();

  const handleSignOut = () => {
    localStorage.removeItem('modamartUser');
    setShowSignOutModal(false);
    setProfileDropdown(false);
    navigate('/');
  };

  return (
    <>
      <div className="sticky-container">
        <div className="Modamart-dynamic">
          <span className={isSliding ? "modamart-slide" : ""}>
            {dynamic[dynamicIndex]}
          </span>
        </div>

        <header className="navbar-container">
          <h1 className="logo">Modamart</h1>

          <div className="search-box">
            <input type="text" placeholder={`Search for ${placeholder}...`} />
            <button><i className="fas fa-search"></i></button>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><FaBars /></button>

          <nav className={`anchor ${menuOpen ? 'open' : ''}`}>
            <div className="navbar-icons">
              <Link to="/"><FaHome className="nav-icon" title="Home" /></Link>
          

              <div className="navbar-heart-icon" onClick={() => navigate('/liked')} style={{ position: 'relative', cursor: 'pointer' }}>
                <FaHeart className="nav-icon" />
                {likeCount > 0 && (
                  <span className="like-badge">{likeCount}</span>
                )}
              </div>

              <div onClick={() => navigate('/cart')} className='cart-icon-container'>
                <FaShoppingCart className="nav-icon" />
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="profile-dropdown-container" ref={profileRef}>
                <FaUser
                  className="nav-icon profile-icon"
                  onClick={() => setProfileDropdown((prev) => !prev)}
                  style={{ cursor: 'pointer' }}
                />
                {profileDropdown && (
                  <div className="profile-dropdown-menu">
                    <button
                      className="profile-dropdown-item"
                      onClick={() => {
                        setProfileDropdown(false);
                        navigate('/account');
                      }}
                    >
                      My Account
                    </button>
                    <button
                      className="profile-dropdown-item signout"
                      onClick={() => {
                        setShowSignOutModal(true);
                        setProfileDropdown(false);
                      }}
                    >
                      <FaSignOutAlt style={{ marginRight: 8 }} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="dropdown" onClick={toggleDropdown}>
              {showDropdown && (
                <div className="dropdown-content mega" onMouseLeave={closeDropdown}>
                  <ul>
                    <li><a href="/">Sarees</a></li>
                    <li><a href="/">Lehengas</a></li>
                    <li><a href="/">Gowns</a></li>
                    <li><a href="/">Anarkalis</a></li>
                  </ul>
                  <ul>
                    <li><a href="/">Kurtas</a></li>
                    <li><a href="/">Jewellery</a></li>
                    <li><a href="/">Footwear</a></li>
                  </ul>
                  <li>WOMEN</li>
                </div>
              )}
            </div>
          </nav>
        </header>
      </div>

      {/* Auth Modal
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        mode={authMode}
      /> */}

      {showSignOutModal && (
        <div className="signout-modal-overlay" onClick={() => setShowSignOutModal(false)}>
          <div className="signout-modal" onClick={e => e.stopPropagation()}>
            <h3>Are you sure you want to sign out?</h3>
            <div className="signout-modal-actions">
              <button className="cancel-btn" onClick={() => setShowSignOutModal(false)}>
                Cancel
              </button>
              <button className="confirm-signout-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;