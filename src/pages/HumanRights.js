import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';
import { API_BASE_URL } from '../config/api';

const HumanRights = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles(1);
  }, []);

  const fetchArticles = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch tragedy category articles (human rights violations)
      const response = await fetch(`${API_BASE_URL}/articles/category/tragedy?page=${page}&limit=12`);
      const data = await response.json();
      setArticles(data.articles || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching human rights articles:', error);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchArticles(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              <i className="fas fa-home me-1"></i>Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Human Rights
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div 
            className="category-header p-4 rounded"
            style={{ 
              background: 'linear-gradient(135deg, #dc354520 0%, #dc354510 100%)',
              border: '2px solid #dc354530'
            }}
          >
            <div className="d-flex align-items-center">
              <div 
                className="category-icon me-3 p-3 rounded-circle"
                style={{ backgroundColor: '#dc3545', color: 'white' }}
              >
                <i className="fas fa-balance-scale fa-2x"></i>
              </div>
              <div>
                <h1 className="mb-2" style={{ color: '#dc3545' }}>
                  Human Rights & Justice
                </h1>
                <p className="mb-0 text-muted">
                  Documenting injustices, human rights violations, and calls for justice affecting Muslim communities worldwide. 
                  Reports from trusted international organizations and verified sources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Sources Info */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="alert alert-info">
            <h6><i className="fas fa-shield-alt me-2"></i>Trusted Sources</h6>
            <p className="mb-0 small">
              Our human rights coverage includes reports from: Amnesty International, Human Rights Watch, 
              UN Human Rights Office, US Holocaust Memorial Museum, and verified international news outlets 
              with dedicated human rights reporting teams.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Latest Human Rights Reports</h2>
            <small className="text-muted">
              {!loading && articles.length > 0 && (
                <>
                  Showing {articles.length} of {totalPages * 12} reports
                </>
              )}
            </small>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h5>Loading Human Rights Reports...</h5>
              <p className="text-muted">Please wait while we fetch the latest reports</p>
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
            <div className="empty-state text-center py-5">
              <div className="mb-4">
                <i className="fas fa-balance-scale fa-4x mb-3" style={{ color: '#dc3545' }}></i>
              </div>
              <h4 className="mb-3">No Human Rights Reports Found</h4>
              <p className="text-muted mb-4">
                We're working to bring you the latest human rights reports. Please check back soon.
              </p>
              <button 
                className="btn btn-danger"
                onClick={() => fetchArticles(1)}
              >
                <i className="fas fa-refresh me-2"></i>
                Refresh
              </button>
            </div>
          ) : (
            <>
              <div className="row">
                {articles.map(article => (
                  <div key={article._id} className="col-md-6 mb-4">
                    <ArticleCard article={article} />
                  </div>
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

export default HumanRights;