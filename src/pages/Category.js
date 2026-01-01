import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';
import { API_BASE_URL } from '../config/api';

const Category = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles(1);
  }, [category]);

  const fetchArticles = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/articles/category/${category}?page=${page}&limit=10`);
      const data = await response.json();
      setArticles(data.articles || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchArticles(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryInfo = (cat) => {
    const categoryInfo = {
      palestine: {
        title: 'Palestine',
        description: 'Latest news and updates on Palestinian affairs, Gaza, West Bank, and the ongoing struggle for justice.',
        color: '#dc3545',
        icon: 'fas fa-flag'
      },
      'middle-east': {
        title: 'Middle East',
        description: 'Comprehensive coverage of Middle Eastern countries including politics, culture, and regional developments.',
        color: '#fd7e14',
        icon: 'fas fa-mosque'
      },
      'south-asia': {
        title: 'South Asia',
        description: 'News from Pakistan, India, Bangladesh, Afghanistan, and other South Asian Muslim communities.',
        color: '#ffc107',
        icon: 'fas fa-mountain'
      },
      'southeast-asia': {
        title: 'Southeast Asia',
        description: 'Updates from Indonesia, Malaysia, Brunei, and Southeast Asian Muslim populations.',
        color: '#28a745',
        icon: 'fas fa-island-tropical'
      },
      africa: {
        title: 'Africa',
        description: 'African Muslim communities, developments in Nigeria, Morocco, Algeria, and across the continent.',
        color: '#6f42c1',
        icon: 'fas fa-globe-africa'
      },
      europe: {
        title: 'Europe',
        description: 'European Muslim communities, integration stories, and developments across European nations.',
        color: '#20c997',
        icon: 'fas fa-globe-europe'
      },
      americas: {
        title: 'Americas',
        description: 'Muslim communities in North and South America, community developments and achievements.',
        color: '#17a2b8',
        icon: 'fas fa-globe-americas'
      },
      community: {
        title: 'Community',
        description: 'Community initiatives, charity work, social programs, and grassroots developments.',
        color: '#e83e8c',
        icon: 'fas fa-users'
      },
      culture: {
        title: 'Culture',
        description: 'Islamic culture, traditions, religious observances, and cultural celebrations worldwide.',
        color: '#6c757d',
        icon: 'fas fa-star-and-crescent'
      },
      economics: {
        title: 'Economics',
        description: 'Business developments, Islamic finance, halal industry, and economic achievements.',
        color: '#343a40',
        icon: 'fas fa-chart-line'
      },
      politics: {
        title: 'Politics',
        description: 'Political developments, governance, policy changes, and political participation.',
        color: '#007bff',
        icon: 'fas fa-landmark'
      },
      education: {
        title: 'Education',
        description: 'Educational achievements, Islamic education, scholarships, and academic developments.',
        color: '#28a745',
        icon: 'fas fa-graduation-cap'
      },
      technology: {
        title: 'Technology',
        description: 'Innovation, startups, digital developments, and technological achievements.',
        color: '#17a2b8',
        icon: 'fas fa-microchip'
      },
      health: {
        title: 'Health',
        description: 'Healthcare developments, medical achievements, and health-related community initiatives.',
        color: '#dc3545',
        icon: 'fas fa-heartbeat'
      },
      sports: {
        title: 'Sports',
        description: 'Athletic achievements, sports developments, and Muslim athletes making headlines.',
        color: '#fd7e14',
        icon: 'fas fa-trophy'
      }
    };
    return categoryInfo[cat] || { title: cat, description: '', color: '#6c757d', icon: 'fas fa-newspaper' };
  };

  const categoryInfo = getCategoryInfo(category);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 1) {
      pages.push(
        <li key="prev" className="page-item">
          <button 
            className="page-link" 
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        </li>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <li key="next" className="page-item">
          <button 
            className="page-link" 
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </li>
      );
    }

    return (
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          {pages}
        </ul>
      </nav>
    );
  };

  return (
    <div className="container mt-4">
      {/* Category Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div 
            className="category-header p-4 rounded"
            style={{ 
              background: `linear-gradient(135deg, ${categoryInfo.color}20 0%, ${categoryInfo.color}10 100%)`,
              border: `2px solid ${categoryInfo.color}30`
            }}
          >
            <div className="d-flex align-items-center">
              <div 
                className="category-icon me-3 p-3 rounded-circle"
                style={{ backgroundColor: categoryInfo.color, color: 'white' }}
              >
                <i className={`${categoryInfo.icon} fa-2x`}></i>
              </div>
              <div>
                <h1 className="mb-2" style={{ color: categoryInfo.color }}>
                  {categoryInfo.title} News
                </h1>
                <p className="mb-0 text-muted">
                  {categoryInfo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Latest {categoryInfo.title} Articles</h2>
            <small className="text-muted">
              {!loading && articles.length > 0 && (
                <>
                  Showing {articles.length} articles
                </>
              )}
            </small>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading {categoryInfo.title} news...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
              <button 
                className="btn btn-outline-danger btn-sm ms-3"
                onClick={() => fetchArticles(currentPage)}
              >
                Try Again
              </button>
            </div>
          ) : articles.length === 0 ? (
            <div className="empty-state">
              <i className={`${categoryInfo.icon} fa-4x mb-3`} style={{ color: categoryInfo.color }}></i>
              <h4>No {categoryInfo.title} Articles Found</h4>
              <p>We're working to bring you the latest {categoryInfo.title} news. Please check back soon.</p>
            </div>
          ) : (
            <>
              <div className="articles-container">
                {articles.map(article => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
              {renderPagination()}
            </>
          )}
        </div>

        <div className="col-lg-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Category;