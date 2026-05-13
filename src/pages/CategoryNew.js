import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import NamazTimer from '../components/NamazTimer';
import './CategoryNew.css';

const CategoryNew = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchArticles(1);
    window.scrollTo(0, 0);
  }, [category]);

  const fetchCategories = async () => {
    try {
      // Fetch article stats to get available categories
      const response = await fetch(`${API_BASE_URL}/articles/stats`);
      const data = await response.json();
      
      if (data.categoryCounts) {
        // Convert category counts to category list
        const categoryList = [
          { name: 'All', slug: 'all' },
          ...Object.keys(data.categoryCounts).map(cat => ({
            name: cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            slug: cat
          }))
        ];
        setCategories(categoryList);
      } else {
        // Fallback to default categories
        setCategories([
          { name: 'All', slug: 'all' },
          { name: 'Politics', slug: 'politics' },
          { name: 'Middle East', slug: 'middle-east' },
          { name: 'Palestine', slug: 'palestine' },
          { name: 'Culture', slug: 'culture' },
          { name: 'Economy', slug: 'economics' },
          { name: 'Human Rights', slug: 'human-rights' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to default categories
      setCategories([
        { name: 'All', slug: 'all' },
        { name: 'Politics', slug: 'politics' },
        { name: 'Middle East', slug: 'middle-east' },
        { name: 'Palestine', slug: 'palestine' },
        { name: 'Culture', slug: 'culture' },
        { name: 'Economy', slug: 'economics' },
        { name: 'Human Rights', slug: 'human-rights' }
      ]);
    }
  };

  const fetchArticles = async (page) => {
    try {
      setLoading(true);
      const url = category === 'all' 
        ? `${API_BASE_URL}/articles?page=${page}&limit=12`
        : `${API_BASE_URL}/articles/category/${category}?page=${page}&limit=12`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      setArticles(data.articles || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchArticles(newPage);
      window.scrollTo(0, 0);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getCategoryTitle = () => {
    const cat = categories.find(c => c.slug === category);
    return cat ? cat.name : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="category-new">
      {/* Header */}
      <div className="category-header">
        <div className="container">
          <div className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <i className="bi bi-chevron-right"></i>
            <span>Categories</span>
            <i className="bi bi-chevron-right"></i>
            <span className="active">{getCategoryTitle()}</span>
          </div>
          <h1 className="category-title">{getCategoryTitle()}</h1>
          <p className="category-description">
            Latest news and insights about {getCategoryTitle().toLowerCase()}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs-section">
        <div className="container">
          <div className="category-tabs">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className={`category-tab ${category === cat.slug ? 'active' : ''}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="category-content">
        <div className="container">
          <div className="row">
            {/* Articles Grid */}
            <div className="col-lg-8">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Loading articles...</p>
                </div>
              ) : articles.length === 0 ? (
                <div className="empty-state">
                  <i className="bi bi-inbox"></i>
                  <h3>No articles found</h3>
                  <p>There are no articles in this category yet.</p>
                  <Link to="/" className="btn btn-primary">Go to Home</Link>
                </div>
              ) : (
                <>
                  <div className="articles-grid">
                    {articles.map((article) => (
                      <Link 
                        key={article._id} 
                        to={`/article/${article._id}`} 
                        className="category-article-card"
                      >
                        <div className="article-image-container">
                          <img 
                            src={article.imageUrl || 'https://via.placeholder.com/400x250'} 
                            alt={article.title}
                          />
                          <div className="article-overlay-badges">
                            <span className="badge-cat">{article.category || 'News'}</span>
                            {article.isAiInhanced && (
                              <span className="badge-ai-sm">
                                <i className="bi bi-stars"></i> AI
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="article-card-body">
                          <h3 className="article-card-title">{article.title}</h3>
                          <p className="article-card-excerpt">
                            {article.description?.substring(0, 120)}...
                          </p>
                          <div className="article-card-footer">
                            <span className="article-source">
                              <i className="bi bi-newspaper"></i>
                              {article.source?.name || 'Ummah Insights'}
                            </span>
                            <span className="article-card-date">
                              <i className="bi bi-clock"></i>
                              {formatDate(article.publishedAt)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination-container">
                      <button 
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <i className="bi bi-chevron-left"></i> Previous
                      </button>
                      <div className="pagination-info">
                        Page {currentPage} of {totalPages}
                      </div>
                      <button 
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <NamazTimer />
              
              {/* Categories Widget */}
              <div className="sidebar-widget">
                <h4 className="widget-title">Browse Categories</h4>
                <div className="categories-list">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className={`category-list-item ${category === cat.slug ? 'active' : ''}`}
                    >
                      <span>{cat.name}</span>
                      <i className="bi bi-chevron-right"></i>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="sidebar-newsletter">
                <h4>Stay Updated</h4>
                <p>Get the latest news delivered to your inbox</p>
                <form>
                  <input type="email" placeholder="Your email" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNew;
