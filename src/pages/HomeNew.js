import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import NamazTimer from '../components/NamazTimer';
import './HomeNew.css';

const HomeNew = () => {
  const [heroArticle, setHeroArticle] = useState(null);
  const [latestArticles, setLatestArticles] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Fetch article stats to get available categories
      const response = await fetch(`${API_BASE_URL}/articles/stats`);
      const data = await response.json();
      
      if (data.categoryCounts) {
        // Convert category counts to category list
        const categoryList = [
          { name: 'Latest', slug: 'latest', active: true },
          ...Object.keys(data.categoryCounts).map(cat => ({
            name: cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            slug: cat
          })),
          { name: 'See All', slug: 'all' }
        ];
        setCategories(categoryList);
      } else {
        // Fallback to default categories
        setCategories([
          { name: 'Latest', slug: 'latest', active: true },
          { name: 'Politics', slug: 'politics' },
          { name: 'Middle East', slug: 'middle-east' },
          { name: 'Palestine', slug: 'palestine' },
          { name: 'Culture', slug: 'culture' },
          { name: 'Economy', slug: 'economics' },
          { name: 'See All', slug: 'all' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to default categories
      setCategories([
        { name: 'Latest', slug: 'latest', active: true },
        { name: 'Politics', slug: 'politics' },
        { name: 'Middle East', slug: 'middle-east' },
        { name: 'Palestine', slug: 'palestine' },
        { name: 'Culture', slug: 'culture' },
        { name: 'Economy', slug: 'economics' },
        { name: 'See All', slug: 'all' }
      ]);
    }
  };

  const fetchArticles = async (page = 1) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const response = await fetch(`${API_BASE_URL}/articles?page=${page}&limit=10`);
      const data = await response.json();
      
      if (page === 1) {
        if (data.articles && data.articles.length > 0) {
          setHeroArticle(data.articles[0]);
          setLatestArticles(data.articles.slice(1, 9));
          setTrendingNews(data.articles.slice(9, 12));
        }
      } else {
        // Append new articles
        setLatestArticles(prev => [...prev, ...data.articles]);
      }
      
      setHasMore(data.currentPage < data.totalPages);
      setCurrentPage(data.currentPage);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchArticles(currentPage + 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="custom-spinner"></div>
        <p>Loading latest news...</p>
      </div>
    );
  }

  return (
    <div className="home-new">
      {/* Hero Section */}
      {heroArticle && (
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-image-wrapper">
                <img 
                  src={heroArticle.imageUrl || 'https://via.placeholder.com/1200x600?text=News+Image'} 
                  alt={heroArticle.title}
                  className="hero-image"
                />
                <div className="hero-overlay">
                  <div className="hero-badges">
                    <span className="badge badge-ai">
                      <i className="bi bi-stars"></i> AI Featured Summary
                    </span>
                    <span className="badge badge-category">{heroArticle.category || 'Latest News'}</span>
                  </div>
                  <h2 className="hero-title">{heroArticle.title}</h2>
                  <p className="hero-description">
                    {truncateText(heroArticle.description || heroArticle.summary, 200)}
                  </p>
                  <div className="hero-meta">
                    <Link to={`/article/${heroArticle._id}`} className="btn btn-read-full">
                      Read Full Insight
                    </Link>
                    <div className="hero-author">
                      <i className="bi bi-person-circle"></i>
                      <span>AI Insight Network</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(heroArticle.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Tabs */}
      <section className="category-tabs">
        <div className="container">
          <div className="tabs-wrapper">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={cat.slug === 'all' ? '/categories' : cat.slug === 'latest' ? '/' : `/category/${cat.slug}`}
                className={`tab-item ${cat.active ? 'active' : ''}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="latest-insights">
        <div className="container">
          <h3 className="section-heading">
            <span className="heading-line"></span>
            Latest Insights
          </h3>

          <div className="row">
            {/* Main Content - Articles Grid */}
            <div className="col-lg-8">
              <div className="row g-4">
                {latestArticles.map((article) => (
                  <div key={article._id} className="col-md-6">
                    <Link to={`/article/${article._id}`} className="article-card">
                      <div className="article-image-wrapper">
                        <img 
                          src={article.imageUrl || 'https://via.placeholder.com/400x250?text=News'} 
                          alt={article.title}
                          className="article-image"
                        />
                        <div className="article-badges">
                          <span className="badge badge-category-small">{article.category || 'News'}</span>
                          {article.isAiInhanced && (
                            <span className="badge badge-ai-small">
                              <i className="bi bi-stars"></i> AI Summary
                            </span>
                          )}
                          {article.hasVideo && (
                            <span className="badge badge-video-small">
                              <i className="bi bi-play-circle-fill"></i> Video
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="article-content">
                        <h4 className="article-title">{article.title}</h4>
                        <div className="article-meta">
                          <span className="author-name">
                            <i className="bi bi-person"></i> {article.source?.name || 'Ummah News'}
                          </span>
                          <span className="article-date">
                            <i className="bi bi-clock"></i> {formatDate(article.publishedAt)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-4">
                <button 
                  className="btn btn-load-more" 
                  onClick={handleLoadMore}
                  disabled={loadingMore || !hasMore}
                >
                  {loadingMore ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Loading...
                    </>
                  ) : hasMore ? (
                    'Load More Articles'
                  ) : (
                    'No More Articles'
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Namaz Timer */}
              <NamazTimer />

              {/* Trusted Sources Directory */}
              <Link to="/sources" className="sidebar-card">
                <div className="sidebar-card-header">
                  <i className="bi bi-bookmark-check"></i>
                  <span>Trusted Sources Directory</span>
                  <i className="bi bi-chevron-right ms-auto"></i>
                </div>
              </Link>

              {/* AI Analysis Dashboard */}
              <div className="sidebar-card" style={{ cursor: 'not-allowed', opacity: 0.7 }}>
                <div className="sidebar-card-header">
                  <i className="bi bi-graph-up"></i>
                  <span>AI Analysis Dashboard</span>
                  <span className="badge bg-secondary ms-auto" style={{ fontSize: '10px' }}>Coming Soon</span>
                </div>
              </div>

              {/* Trending Now */}
              <div className="trending-card">
                <h5 className="trending-title">
                  <i className="bi bi-fire"></i> TRENDING NOW
                </h5>
                <div className="trending-list">
                  {trendingNews.map((news, index) => (
                    <Link 
                      key={news._id} 
                      to={`/article/${news._id}`} 
                      className="trending-item"
                    >
                      <div className="trending-content">
                        <span className="trending-number">{index + 1}</span>
                        <div>
                          <h6 className="trending-item-title">{news.title}</h6>
                          <small className="trending-date">{formatDate(news.publishedAt)}</small>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="newsletter-card">
                <h5 className="newsletter-title">Daily Insights</h5>
                <p className="newsletter-description">
                  Get AI-summarized global news. Major topics delivered daily.
                </p>
                <form className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="newsletter-input"
                  />
                  <button type="submit" className="btn btn-subscribe">
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeNew;
