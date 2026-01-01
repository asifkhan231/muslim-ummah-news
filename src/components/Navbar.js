import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="site-header">
      {/* 1. Top Bar */}
      <div className="top-bar d-none d-md-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <span className="text-white small me-3"><i className="far fa-calendar-alt me-2"></i>{currentDate}</span>
              <span className="text-white small"><i className="fas fa-cloud-sun me-2"></i>London, UK 12°C</span>
            </div>
            <div className="col-md-6 text-end">
              <a href="#" className="top-bar-link"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="top-bar-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="top-bar-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="top-bar-link"><i className="fab fa-youtube"></i></a>
              {/* <span className="mx-3 text-secondary">|</span>
              <a href="#" className="top-bar-link">Login</a>
              <a href="#" className="top-bar-link">Register</a> */}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Branding Area */}
      <div className="branding-area border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <Link to="/" className="text-decoration-none">
                <div className="site-logo">
                  UMMAH<span>NEWS</span>
                </div>
              </Link>
            </div>
            <div className="col-md-8 d-none d-md-block text-end">
              <div className="leaderboard-ad d-inline-flex">
                <span>ADVERTISEMENT 728x90</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation */}
      <nav className="navbar navbar-expand-lg main-nav p-0">
        <div className="container">
          <button
            className="navbar-toggler py-2"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">HOME</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category/politics" className="nav-link">POLITICS</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category/economics" className="nav-link">BUSINESS</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category/technology" className="nav-link">TECH</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category/sport" className="nav-link">SPORT</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category/culture" className="nav-link">CULTURE</NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center py-2 py-lg-0">
              <div className="input-group">
                <input type="text" className="form-control form-control-sm rounded-0" placeholder="Search..." />
                <button className="btn btn-red btn-sm rounded-0"><i className="fas fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;