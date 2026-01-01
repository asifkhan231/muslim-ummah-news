import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/articles/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
      setError('Failed to load article. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      palestine: '#dc3545',
      sudan: '#fd7e14',
      egypt: '#ffc107',
      syria: '#6f42c1',
      yemen: '#20c997',
      general: '#6c757d'
    };
    return colors[category] || '#6c757d';
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
          <button
            className="btn btn-outline-danger btn-sm ms-3"
            onClick={fetchArticle}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          Article not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/category/${article.category}`}>
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Article
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <article className="article-full">
            <header className="article-header mb-4">
              <div className="article-meta mb-3">
                <span
                  className="badge me-2 px-3 py-2"
                  style={{
                    backgroundColor: getCategoryColor(article.category),
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                >
                  {article.category.toUpperCase()}
                </span>
                <small className="text-muted">
                  <i className="fas fa-clock me-1"></i>
                  {formatDate(article.publishedAt)}
                  {article.source?.name && (
                    <>
                      {' | '}
                      <i className="fas fa-globe me-1"></i>
                      {article.source.name}
                    </>
                  )}
                </small>
              </div>

              <h1 className="article-title-full mb-3">
                {article.title}
              </h1>

              {article.author && (
                <div className="author-info mb-3">
                  <small className="text-muted">
                    <i className="fas fa-user me-1"></i>
                    By {article.author}
                  </small>
                </div>
              )}

              {article.imageUrl && (
                <div className="article-image-container mb-4">
                  <img
                    src={article.imageUrl}
                    className="img-fluid rounded shadow-sm"
                    alt={article.title}
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                  />
                </div>
              )}

              {article.hasVideo && article.videoUrl && (
                <div className="article-video-container mb-4">
                  {article.videoUrl.includes('youtube') || article.videoUrl.includes('vimeo') || article.videoUrl.includes('dailymotion') || article.videoUrl.includes('facebook') ? (
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={article.videoUrl.replace('watch?v=', 'embed/')}
                        className="rounded shadow-sm"
                        title={article.title}
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  ) : (
                    <video
                      controls
                      className="w-100 rounded shadow-sm"
                      style={{ maxHeight: '400px' }}
                    >
                      <source src={article.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="article-content">
              {/* AI Enhancement Indicator */}
              {article.isAiInhanced && (
                <div className="alert alert-info mb-4">
                  <i className="fas fa-robot me-2"></i>
                  <strong>AI Enhanced:</strong> This article has been refined and enriched with additional context and facts.
                </div>
              )}

              {/* Background Context */}
              {article.background && (
                <div className="background-context mb-4 p-3 bg-light rounded">
                  <h6 className="text-primary mb-2">
                    <i className="fas fa-info-circle me-2"></i>
                    Background Context
                  </h6>
                  <p className="mb-0 text-muted">{article.background}</p>
                </div>
              )}

              <div className="content-text" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                {article.content && article.content !== 'Content not available' ? (
                  article.content.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-3">
                        {paragraph}
                      </p>
                    )
                  ))
                ) : article.summary ? (
                  <div>
                    <p className="mb-3">{article.summary}</p>
                    <div className="alert alert-info mt-3">
                      <i className="fas fa-info-circle me-2"></i>
                      Full article content is not available. Please visit the original source for the complete article.
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Article content is not available. Please visit the original source.
                  </div>
                )}
              </div>

              {/* AI Facts */}
              {article.aiFacts && article.aiFacts.length > 0 && (
                <div className="ai-facts mt-4 p-3 border rounded">
                  <h6 className="text-success mb-3">
                    <i className="fas fa-lightbulb me-2"></i>
                    Key Facts & Context
                  </h6>
                  <ul className="list-unstyled mb-0">
                    {article.aiFacts.map((fact, index) => (
                      <li key={index} className="mb-2">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="article-tags mt-4 pt-3 border-top">
                  <h6 className="text-muted mb-2">Tags:</h6>
                  <div className="tags">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="tag me-2 mb-2">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Source Link */}
              <div className="source-section mt-4 pt-3 border-top">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Original Source:</h6>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="source-link"
                    >
                      <i className="fas fa-external-link-alt me-1"></i>
                      Read on {article.source?.name || 'Original Site'}
                    </a>
                  </div>
                  <div className="share-buttons">
                    <button className="btn btn-outline-primary btn-sm me-2">
                      <i className="fab fa-twitter me-1"></i>
                      Share
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-bookmark me-1"></i>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation */}
          <div className="article-navigation mt-5 pt-4 border-top">
            <div className="row">
              <div className="col-6">
                <Link to={`/category/${article.category}`} className="btn btn-outline-primary">
                  <i className="fas fa-arrow-left me-1"></i>
                  Back to {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </Link>
              </div>
              <div className="col-6 text-end">
                <Link to="/" className="btn btn-outline-secondary">
                  <i className="fas fa-home me-1"></i>
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;