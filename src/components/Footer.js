/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>
              <i className="fas fa-globe-asia me-2"></i>
              Ummah News Hub
            </h5>
            <p className="mb-3">
              Your comprehensive source for news affecting Muslim communities worldwide.
              Covering politics, culture, society, economics, and community developments
              across the global Muslim Ummah.
            </p>
            <div className="social-links">
              <a href="#" className="text-light me-3">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-telegram fa-lg"></i>
              </a>
            </div>
          </div>
          <div className="col-md-3">
            <h6>Categories</h6>
            <ul className="list-unstyled">
              <li><a href="/category/palestine" className="text-light text-decoration-none">Palestine</a></li>
              <li><a href="/category/sudan" className="text-light text-decoration-none">Sudan</a></li>
              <li><a href="/category/egypt" className="text-light text-decoration-none">Egypt</a></li>
              <li><a href="/category/syria" className="text-light text-decoration-none">Syria</a></li>
              <li><a href="/category/yemen" className="text-light text-decoration-none">Yemen</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6>About</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Our Mission</a></li>
              <li><a href="#" className="text-light text-decoration-none">Sources</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">
              &copy; 2024 Ummah News Hub. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-end">
            <small className="text-muted">
              Last updated: {new Date().toLocaleDateString()}
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;