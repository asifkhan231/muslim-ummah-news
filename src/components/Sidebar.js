import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [recentArticles, setRecentArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [stats, setStats] = useState({ articles: 0, sources: 0, categories: 0 });
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const fetchSidebarData = async () => {
    try {
      setLoading(true);

      // Fetch recent articles
      const recentResponse = await fetch(`${API_BASE_URL}/articles/recent?limit=4`);
      const recentData = await recentResponse.json();
      console.log('Recent articles:', recentData);
      setRecentArticles(Array.isArray(recentData) ? recentData : []);

      // Fetch popular articles
      const popularResponse = await fetch(`${API_BASE_URL}/articles/popular?limit=4`);
      const popularData = await popularResponse.json();
      console.log('Popular articles:', popularData);
      setPopularArticles(Array.isArray(popularData) ? popularData : []);

      // Fetch stats
      const statsResponse = await fetch(`${API_BASE_URL}/articles/stats`);
      const statsData = await statsResponse.json();
      console.log('Stats data:', statsData);

      // Parse the stats correctly
      const parsedStats = {
        totalArticles: statsData.totalArticles || 0,
        totalSources: 0, // Will be updated from sources API
        categories: statsData.categoriesStats ? statsData.categoriesStats.length : 0
      };

      // Create category counts object
      const categoryCounts = {};
      if (statsData.categoriesStats) {
        statsData.categoriesStats.forEach(cat => {
          categoryCounts[cat._id] = cat.count;
        });
      }

      // Fetch sources
      const sourcesResponse = await fetch(`${API_BASE_URL}/sources/stats`);
      const sourcesData = await sourcesResponse.json();
      console.log('Sources data:', sourcesData);

      // Also fetch individual sources for display
      const individualSourcesResponse = await fetch(`${API_BASE_URL}/sources`);
      const individualSourcesData = await individualSourcesResponse.json();
      console.log('Individual sources:', individualSourcesData);

      // Update total sources count
      parsedStats.totalSources = sourcesData.totalSources || 0;

      // Set the parsed stats
      setStats(parsedStats);

      // Use individual sources for display
      setSources(Array.isArray(individualSourcesData) ? individualSourcesData : []);

      // Set categories with counts from stats
      if (categoryCounts && Object.keys(categoryCounts).length > 0) {
        const categoryList = Object.entries(categoryCounts).map(([name, count]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' '),
          slug: name,
          count
        })).sort((a, b) => b.count - a.count);
        setCategories(categoryList);
      }

    } catch (error) {
      console.error('Error fetching sidebar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).toUpperCase();
  };

  const truncateTitle = (title, maxLength = 50) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className="sidebar">
      {/* 1. Social Follow Widget */}
      <div className="widget mb-5">
        <h4 className="section-title">Follow Us</h4>
        <div className="d-flex gap-2">
          <a href="/" onClick={(e) => e.preventDefault()} className="btn btn-outline-secondary btn-sm rounded-0 flex-grow-1"><i className="fab fa-facebook-f"></i></a>
          <a href="/" onClick={(e) => e.preventDefault()} className="btn btn-outline-secondary btn-sm rounded-0 flex-grow-1"><i className="fab fa-twitter"></i></a>
          <a href="/" onClick={(e) => e.preventDefault()} className="btn btn-outline-secondary btn-sm rounded-0 flex-grow-1"><i className="fab fa-instagram"></i></a>
          <a href="/" onClick={(e) => e.preventDefault()} className="btn btn-outline-secondary btn-sm rounded-0 flex-grow-1"><i className="fab fa-youtube"></i></a>
        </div>
      </div>

      {/* 2. Tabbed Widget - Recent/Popular Articles */}
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
          {loading ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm" role="status"></div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {(activeTab === 'recent' ? recentArticles : popularArticles).map(article => (
                <div key={article._id} className="d-flex align-items-center">
                  <div
                    className="bg-light me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '2px',
                      backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!article.imageUrl && <i className="fas fa-newspaper text-muted"></i>}
                  </div>
                  <div>
                    <h6 className="mb-1 small fw-bold">
                      <Link to={`/article/${article._id}`} className="text-decoration-none text-dark">
                        {truncateTitle(article.title)}
                      </Link>
                    </h6>
                    <small className="text-muted" style={{ fontSize: '10px' }}>
                      {formatDate(article.publishedAt)}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Quick Stats Widget */}
      <div className="widget mb-5">
        <h4 className="section-title">Quick Stats</h4>
        <div className="d-flex border border-light">
          <div className="widget-stats-item flex-grow-1">
            <span className="stat-value text-danger">{stats.totalArticles || 0}</span>
            <span className="stat-label">Articles</span>
          </div>
          <div className="widget-stats-item flex-grow-1">
            <span className="stat-value text-dark">{stats.totalSources || 0}</span>
            <span className="stat-label">Sources</span>
          </div>
          <div className="widget-stats-item flex-grow-1">
            <span className="stat-value text-dark">{categories.length || 0}</span>
            <span className="stat-label">Cats</span>
          </div>
        </div>
      </div>

      {/* 4. Browse Categories Widget */}
      <div className="widget mb-5">
        <h4 className="section-title">Browse Categories</h4>
        <div className="cat-list">
          {loading ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm" role="status"></div>
            </div>
          ) : (
            categories.slice(0, 8).map((cat, idx) => (
              <Link key={idx} to={`/category/${cat.slug}`} className="text-decoration-none">
                <div className="cat-list-item">
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-count">{cat.count}</span>
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="mt-3">
          <Link to="/categories" className="btn btn-outline-dark w-100 rounded-0 text-uppercase small fw-bold">
            View All
          </Link>
        </div>
      </div>

      {/* 5. Trusted Sources Widget */}
      <div className="widget mb-5">
        <h4 className="section-title"><i className="fas fa-rss me-2"></i>Trusted Sources</h4>
        <div className="d-flex flex-column">
          {loading ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm" role="status"></div>
            </div>
          ) : (
            sources.slice(0, 6).map((source, idx) => (
              <div key={idx} className="source-card">
                <div className="source-icon" style={{ backgroundColor: `hsl(${idx * 60}, 70%, 50%)` }}>
                  <i className="fas fa-globe"></i>
                </div>
                <div className="source-info">
                  <h6>{source.name}</h6>
                  <div className="source-meta">
                    <i className="fas fa-map-marker-alt me-1"></i>{source.country || 'Global'}
                    <span className="mx-1">|</span>
                    <i className="far fa-newspaper me-1"></i>{source.articlesCount || 0} articles
                  </div>
                </div>
                <div className="source-link-icon">
                  <i className="fas fa-external-link-alt"></i>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 6. Trending Topics */}
      <div className="widget mb-5">
        <h4 className="section-title">Trending Topics</h4>
        <div className="trending-tags">
          <Link to="/category/palestine" className="btn-tag">#Palestine</Link>
          <Link to="/category/achievements" className="btn-tag">#GoodNews</Link>
          <Link to="/category/asia" className="btn-tag">#Uyghur</Link>
          <Link to="/category/africa" className="btn-tag">#Sudan</Link>
          <Link to="/category/politics" className="btn-tag">#Politics</Link>
          <Link to="/category/technology" className="btn-tag">#Tech</Link>
        </div>
      </div>

      {/* 7. Newsletter Widget */}
      <div className="widget mb-5 bg-light p-4 text-center border-top border-danger border-3">
        <h4 className="section-title border-0 mb-3">Newsletter</h4>
        <p className="small text-muted mb-3">Subscribe to our newsletter to get latest news.</p>
        <input type="email" className="form-control rounded-0 mb-2" placeholder="Your Email" />
        <button className="btn btn-red w-100 rounded-0">SUBSCRIBE</button>
      </div>

      {/* 8. Advertisement Widget */}
      <div className="widget text-center">
        <div className="bg-light border p-5 d-flex align-items-center justify-content-center text-muted">
          ADVERTISEMENT 300x250
        </div>
      </div>
    </div>
  );
};

export default Sidebar;