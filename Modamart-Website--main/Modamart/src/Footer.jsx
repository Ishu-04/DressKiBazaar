import React from 'react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-column">
                <h4>Modamart</h4>
                <p>Redefining tradition with elegance. Premium Ethnic wear for every occasion.</p>
            </div>

            <div className="footer-column">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/collection">Collection</a></li>
                    <li><a href="/about">About Us</a></li>
                </ul>
            </div>

            <div className="footer-column">
                <h4>Customer Care</h4>
                <ul>
                    <li><a href="/faq">FAQs</a></li>
                    <li><a href="/returns">Shipping & Returns</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
            </div>

            <div className="footer-column">
                <h4>Follow Us</h4>
                <ul className='social-icons'>
                    <li><a href="#" className='icon instagram' target='_blank' ><FaInstagram />Instagram</a></li>
                    <li><a href="#" className='icon facebook' target='_blank' ><FaFacebook />Facebook</a></li>
                    <li><a href="#" className='icon youtube' target='_blank' ><FaYoutube />YouTube</a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                © {new Date().getFullYear()} Modamart. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;