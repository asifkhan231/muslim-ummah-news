import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HeroCarousel from '../components/HeroCarousel';
import ArticleCard from '../components/ArticleCard';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

console.log('apis base url',API_BASE_URL)

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    fetchArticles(1);
    fetchBreakingNews();
  }, []);

  const fetchBreakingNews = async () => {
    try {
      console.log('Fetching breaking news...'); 
      const response = await fetch(`${API_BASE_URL}/articles?limit=5`);
      const data = await response.json();
      console.log('Breaking news response:', data);
      setBreakingNews(data.articles || []);
    } catch (error) {
      console.error('Error fetching breaking news:', error);
    }
  };

  const fetchArticles = async (page) => {
    try {
      setLoading(true);
      console.log('Fetching articles for page:', page);
      
      const response = await fetch(`${API_BASE_URL}/articles?page=${page}&limit=10`);
      const data = await response.json();
      
      console.log('Articles response:', data);
      setArticles(data.articles || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchArticles(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="home-page py-5">
      {/* Breaking News Ticker (Restored) */}
      {breakingNews.length > 0 && (
        <div className="breaking-news-bar py-2 mb-4">
          <div className="container">
            <div className="d-flex align-items-center">
              <span className="badge bg-danger text-white me-3 px-3 rounded-0 text-uppercase font-oswald">Breaking</span>
              <div className="overflow-hidden flex-grow-1" style={{ height: '24px' }}>
                <div className="ticker-content">
                  {breakingNews.map((news, idx) => (
                    <span key={idx} className="ticker-item">
                      <Link to={`/article/${news._id}`} className="text-white text-decoration-none small">
                        <span className="text-danger me-2">●</span> {news.title}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container">

        {/* TOP SECTION: Hero Carousel + Trending List */}
        {!loading && articles.length > 0 && (
          <div className="row mb-5">
            <div className="col-lg-8">
              <HeroCarousel articles={articles.slice(0, 5)} />
            </div>
            <div className="col-lg-4">
              <h4 className="section-title">Trending Now</h4>
              <div className="d-flex flex-column gap-3">
                {articles.slice(5, 9).map(article => (
                  <div key={article._id} className="d-flex align-items-start border-bottom pb-3">
                    <span className="fw-bold text-danger me-3 display-6" style={{ lineHeight: '0.8', fontFamily: 'var(--font-oswald)' }}>
                      {articles.indexOf(article) - 4}
                    </span>
                    <div>
                      <h6 className="fw-bold mb-1">
                        <a href={`/article/${article._id}`} className="text-dark text-decoration-none">
                          {article.title}
                        </a>
                      </h6>
                      <small className="text-muted text-uppercase" style={{ fontSize: '10px' }}>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* MIDDLE SECTION: Main Feed & Sidebar */}
        <div className="row">

          {/* Main Feed */}
          <div className="col-lg-8">
            <h4 className="section-title">Latest News</h4>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-danger" role="status"></div>
                <p className="mt-2">Loading articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-5">
                <div className="alert alert-warning">
                  <h5>No articles found</h5>
                  <p>Please check your internet connection or try refreshing the page.</p>
                  <button className="btn btn-primary" onClick={() => fetchArticles(1)}>
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="row">
                  {articles.map((article, index) => (
                    <div key={article._id} className="col-md-6 mb-4">
                      <ArticleCard article={article} priority={index < 4} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link rounded-0 text-dark" onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
                    </li>
                    <li className="page-item active">
                      <span className="page-link rounded-0 bg-danger border-danger">{currentPage}</span>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link rounded-0 text-dark" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <Sidebar />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;