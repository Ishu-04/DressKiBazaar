// src/PromoBanner.jsx
import React, { useEffect, useState } from 'react';
import './PromoBanner.css';
import { Link } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';

const promoMessages = ["Carnival SALE — Shop for ₹11,999 & Get Extra 10% Off! | Use Code: STYLE10"];

const PromoBanner = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typedMsg, setTypedMsg] = useState('');

  useEffect(() => {
    const current = promoMessages[msgIndex];
    if (charIndex <= current.length) {
      const type = setTimeout(() => {
        setTypedMsg(current.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 60);
      return () => clearTimeout(type);
    } else {
      const pause = setTimeout(() => {
        setCharIndex(0);
        setMsgIndex((prev) => (prev + 1) % promoMessages.length);
      }, 1800);
      return () => clearTimeout(pause);
    }
  }, [charIndex, msgIndex]);

  return (
    <div className="promo-banner">
      <ul className="nav-links">
        <li><Link to="/category/women">WOMEN</Link></li>
        <li><Link to="/category/men">MEN</Link></li>
        <li><Link to="/category/kids">KIDS</Link></li>
        <li><Link to="/category/unisex">UNISEX</Link></li>
         <li><Link to="/category/accessories">ACCESSORIES</Link></li>
      </ul>
      <div className="sub-navbar">
        <ul className="nav-link">
          <li>Bestsellers</li>
          <li>Men</li>
          <li>Bridal</li>
          <li>Saree</li>
          <li>Lehangas</li>
          <li>Gowns</li>
          <li>Salwar Kameez</li>
          <li>Indo Western</li>
          <li>Blouse</li>
          <li>Jewellery</li>
          <li>Footwear</li>
          <li>Kids</li>
          <li>Co-ord Sets</li>
          <li>Wedding</li>
          <li>New</li>
          <li>Sale</li>
        </ul>
      </div>

      <p className="promo-typing">{typedMsg}<span className="promo-cursor">|</span></p>
    </div>
  );
};

export default PromoBanner;