import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('recent');

  return (
    <div className="sidebar">
      {/* 1. Social Follow Widget */}
      <div className="widget mb-5">
        <h4 className="section-title">Follow Us</h4>
        <div className="d-flex gap-2">
          <a href="#" className="btn btn-outline-secondary btn-sm rounded-0 flex-grow-1"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="btn btn-outline-secondary btn-sm rounded-0 flex-grow-1"><i className="fab fa-twitter"></i></a>
          <a href="#" className="btn btn-outline-secondary btn-sm rounded-0 flex-grow-1"><i className="fab fa-instagram"></i></a>
          <a href="#" className="btn btn-outline-secondary btn-sm rounded-0 flex-grow-1"><i className="fab fa-youtube"></i></a>
        </div>
      </div>

      {/* 2. Tabbed Widget (Newsbox signature) */}
      <div className="widget mb-5">
        <div className="widget-tab-nav mb-3">
          <ul className="nav nav-tabs border-0" role="tablist">
            <li className="nav-item flex-grow-1 text-center">
              <button
                className={`nav-link w-100 ${activeTab === 'recent' ? 'active' : ''}`}
                onClick={() => setActiveTab('recent')}
              >
                Recent
              </button>
            </li>
            <li className="nav-item flex-grow-1 text-center">
              <button
                className={`nav-link w-100 ${activeTab === 'popular' ? 'active' : ''}`}
                onClick={() => setActiveTab('popular')}
              >
                Popular
              </button>
            </li>
          </ul>
        </div>

        <div className="widget-content">
          {/* Mock Content for Tabs */}
          <div className="d-flex flex-column gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="d-flex align-items-center">
                <div className="bg-light me-3" style={{ width: '60px', height: '60px', borderRadius: '2px' }}></div>
                <div>
                  <h6 className="mb-1 small fw-bold">
                    <a href="#" className="text-decoration-none text-dark">
                      Example Story Title {i} Goes Here
                    </a>
                  </h6>
                  <small className="text-muted" style={{ fontSize: '10px' }}>JAN 01, 2026</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Widget (Restored) */}
      <div className="widget mb-5">
        <h4 className="section-title">Quick Stats</h4>
        <div className="d-flex border border-light">
          <div className="widget-stats-item flex-grow-1">
            <span className="stat-value text-danger">35</span>
            <span className="stat-label">Articles</span>
          </div>
          <div className="widget-stats-item flex-grow-1">
            <span className="stat-value text-dark">10</span>
            <span className="stat-label">Sources</span>
          </div>
          <div className="widget-stats-item flex-grow-1">
            <span className="stat-value text-dark">8</span>
            <span className="stat-label">Cats</span>
          </div>
        </div>
      </div>

      {/* 3. Browse Categories Widget (Restored) */}
      <div className="widget mb-5">
        <h4 className="section-title">Browse Categories</h4>
        <div className="cat-list">
          {[
            { name: 'Palestine', count: 20 },
            { name: 'Tragedy', count: 0 },
            { name: 'Middle East', count: 6 },
            { name: 'South Asia', count: 1 },
            { name: 'Southeast Asia', count: 3 },
            { name: 'Africa', count: 1 },
            { name: 'Europe', count: 1 },
            { name: 'Americas', count: 1 }
          ].map((cat, idx) => (
            <Link key={idx} to={`/category/${cat.name.toLowerCase().replace(' ', '-')}`} className="text-decoration-none">
              <div className="cat-list-item">
                <span className="cat-name">{cat.name}</span>
                <span className="cat-count">{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-3">
          <button className="btn btn-outline-dark w-100 rounded-0 text-uppercase small fw-bold">View All</button>
        </div>
      </div>

      {/* 4. Trusted Sources Widget (Restored) */}
      <div className="widget mb-5">
        <h4 className="section-title"><i className="fas fa-rss me-2"></i>Trusted Sources</h4>
        <div className="d-flex flex-column">
          {[
            { name: 'Al Jazeera English', loc: 'Qatar', count: 3, color: '#0050acc0' },
            { name: 'Anadolu Agency', loc: 'Turkey', count: 0, color: '#0065a3' },
            { name: 'Arab News', loc: 'Saudi Arabia', count: 0, color: '#006c35' },
            { name: 'Dawn News', loc: 'Pakistan', count: 0, color: '#1a73e8' },
            { name: 'Islamic Society of NA', loc: 'USA', count: 0, color: '#0056b3' },
            { name: 'Jakarta Post', loc: 'Indonesia', count: 3, color: '#0056b3' },
            { name: 'Middle East Eye', loc: 'UK', count: 3, color: '#d32f2f' },
            { name: 'Muslim News', loc: 'UK', count: 8, color: '#1976d2' }
          ].map((source, idx) => (
            <div key={idx} className="source-card">
              <div className="source-icon" style={{ backgroundColor: source.color }}>
                <i className="fas fa-globe"></i>
              </div>
              <div className="source-info">
                <h6>{source.name}</h6>
                <div className="source-meta">
                  <i className="fas fa-map-marker-alt me-1"></i>{source.loc}
                  <span className="mx-1">|</span>
                  <i className="far fa-newspaper me-1"></i>{source.count} articles
                </div>
              </div>
              <div className="source-link-icon">
                <i className="fas fa-external-link-alt"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Trending Topics (Restored Tags) */}
      <div className="widget mb-5">
        <h4 className="section-title">Trending Topics</h4>
        <div className="trending-tags">
          <Link to="/tag/palestine" className="btn-tag">#Palestine</Link>
          <Link to="/tag/islamic-finance" className="btn-tag">#Islamic Finance</Link>
          <Link to="/tag/ramadan" className="btn-tag">#Ramadan</Link>
          <Link to="/tag/halal-industry" className="btn-tag">#Halal Industry</Link>
          <Link to="/tag/charity" className="btn-tag">#Charity</Link>
          <Link to="/tag/education" className="btn-tag">#Education</Link>
        </div>
      </div>

      {/* 6. Newsletter Widget */}
      <div className="widget mb-5 bg-light p-4 text-center border-top border-danger border-3">
        <h4 className="section-title border-0 mb-3">Newsletter</h4>
        <p className="small text-muted mb-3">Subscribe to our newsletter to get latest news.</p>
        <input type="email" className="form-control rounded-0 mb-2" placeholder="Your Email" />
        <button className="btn btn-red w-100 rounded-0">SUBSCRIBE</button>
      </div>

      {/* 4. Advertisement Widget */}
      <div className="widget text-center">
        <div className="bg-light border p-5 d-flex align-items-center justify-content-center text-muted">
          ADVERTISEMENT 300x250
        </div>
      </div>
    </div>
  );
};

export default Sidebar;