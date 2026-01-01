import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';
import { API_BASE_URL } from '../config/api';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchArticles(1);
    }
  }, [query]);

  const fetchArticles = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/articles?page=${page}&limit=10&search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setArticles(data.articles || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load search results. Please try again later.');
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

  if (!query) {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <div className="empty-state">
              <i className="fas fa-search fa-4x mb-3 text-muted"></i>
              <h4>No Search Query</h4>
              <p>Please enter a search term to find articles.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="search-header mb-4">
            <h2>
              <i className="fas fa-search me-2"></i>
              Search Results
            </h2>
            <p className="text-muted">
              Showing results for: <strong>"{query}"</strong>
              {!loading && articles.length > 0 && (
                <span> - {articles.length} articles found</span>
              )}
            </p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Searching articles...</p>
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
              <i className="fas fa-search fa-4x mb-3 text-muted"></i>
              <h4>No Results Found</h4>
              <p>
                We couldn't find any articles matching "<strong>{query}</strong>".
                <br />
                Try different keywords or browse our categories.
              </p>
              <div className="mt-3">
                <button 
                  className="btn btn-primary me-2"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
                <a href="/" className="btn btn-outline-secondary">
                  Browse All News
                </a>
              </div>
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

export default Search;