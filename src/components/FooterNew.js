import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import './FooterNew.css';

const FooterNew = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/stats`);
      const data = await response.json();
      
      if (data.categoryCounts) {
        const topCategories = Object.keys(data.categoryCounts)
          .slice(0, 4)
          .map(cat => ({
            name: cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            slug: cat
          }));
        setCategories(topCategories);
      } else {
        setCategories([
          { name: 'Politics', slug: 'politics' },
          { name: 'Middle East', slug: 'middle-east' },
          { name: 'Culture', slug: 'culture' },
          { name: 'Palestine', slug: 'palestine' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([
        { name: 'Politics', slug: 'politics' },
        { name: 'Middle East', slug: 'middle-east' },
        { name: 'Culture', slug: 'culture' },
        { name: 'Palestine', slug: 'palestine' }
      ]);
    }
  };

  return (
    <footer className="footer-new">
      <div className="footer-main">
        <div className="container">
          <div className="row">
            {/* Column 1 - Brand */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="footer-brand">
                <div className="footer-logo">
                  <i className="bi bi-globe2"></i>
                  <span>Ummah Insights</span>
                </div>
                <p className="footer-description">
                  Reliable news summaries for the Ummah, powered by AI and verified by trusted global sources.
                </p>
                <div className="footer-social">
                  <a href="#" className="social-icon" aria-label="Facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="social-icon" aria-label="Twitter">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="social-icon" aria-label="Instagram">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="social-icon" aria-label="YouTube">
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 - Categories */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="footer-title">Categories</h5>
              <ul className="footer-links">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Platform */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="footer-title">Platform</h5>
              <ul className="footer-links">
                <li><Link to="/sources">Trusted Sources</Link></li>
                <li><Link to="/">AI Insights</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Column 4 - Subscribe */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="footer-title">Subscribe</h5>
              <p className="footer-subscribe-text">
                Get the latest AI-summarized insights delivered daily.
              </p>
              <form className="footer-subscribe-form">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="footer-email-input"
                />
                <button type="submit" className="footer-join-btn">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2024 Ummah Insights. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/ethics">Ethical AI Charter</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
