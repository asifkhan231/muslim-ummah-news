import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import './NavbarNew.css';

const NavbarNew = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/stats`);
      const data = await response.json();
      
      if (data.categoryCounts) {
        const allCategories = Object.entries(data.categoryCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([cat]) => ({
            name: cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            path: `/category/${cat}`
          }));
        
        setTopCategories(allCategories.slice(0, 3));
        setCategories([
          { name: 'Latest', path: '/' },
          ...allCategories.slice(0, 4),
          { name: 'Sources', path: '/sources' }
        ]);
      } else {
        setTopCategories([
          { name: 'Politics', path: '/category/politics' },
          { name: 'Middle East', path: '/category/middle-east' },
          { name: 'Palestine', path: '/category/palestine' }
        ]);
        setCategories([
          { name: 'Latest', path: '/' },
          { name: 'Politics', path: '/category/politics' },
          { name: 'Middle East', path: '/category/middle-east' },
          { name: 'Palestine', path: '/category/palestine' },
          { name: 'Culture', path: '/category/culture' },
          { name: 'Sources', path: '/sources' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setTopCategories([
        { name: 'Politics', path: '/category/politics' },
        { name: 'Middle East', path: '/category/middle-east' },
        { name: 'Palestine', path: '/category/palestine' }
      ]);
      setCategories([
        { name: 'Latest', path: '/' },
        { name: 'Politics', path: '/category/politics' },
        { name: 'Middle East', path: '/category/middle-east' },
        { name: 'Palestine', path: '/category/palestine' },
        { name: 'Culture', path: '/category/culture' },
        { name: 'Sources', path: '/sources' }
      ]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navbar-new">
      {/* Top Mini Nav */}
      <div className="navbar-top-mini">
        <div className="container">
          <div className="top-mini-content">
            <div className="top-mini-links">
              {topCategories.map((cat) => (
                <Link key={cat.path} to={cat.path} className="top-mini-link">
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="top-mini-icons">
              <button className="top-icon-btn" title="Notifications">
                <i className="bi bi-bell"></i>
              </button>
              <button className="top-icon-btn" title="Profile">
                <i className="bi bi-person-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="navbar-main-header">
        <div className="container">
          <div className="main-header-content">
            {/* Logo */}
            <Link to="/" className="header-logo">
              <i className="bi bi-globe2"></i>
              <span>Ummah Insights</span>
            </Link>

            {/* Center Menu */}
            <div className="header-menu">
              {categories.map((cat) => (
                <Link key={cat.path} to={cat.path} className="header-menu-link">
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Right Side - Search & Icons */}
            <div className="header-right">
              <form onSubmit={handleSearch} className="header-search">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="header-search-input"
                />
                <button type="submit" className="header-search-btn">
                  <i className="bi bi-search"></i>
                </button>
              </form>
              
              <button 
                className="mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <i className={`bi bi-${mobileMenuOpen ? 'x' : 'list'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown">
          <div className="container">
            {categories.map((cat) => (
              <Link 
                key={cat.path} 
                to={cat.path} 
                className="mobile-dropdown-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarNew;
