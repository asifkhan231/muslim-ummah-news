import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <div className="post-card">
      <div className="post-thumb">
        <Link to={`/article/${article._id}`}>
          <img
            src={article.imageUrl || 'https://via.placeholder.com/400x250'}
            alt={article.title}
            className="img-fluid"
            style={{ minHeight: '200px', objectFit: 'cover' }}
          />
        </Link>
        <div className="post-cat">{article.category}</div>
        {/* AI Enhancement Badge */}
        {article.isAiInhanced && (
          <div className="ai-badge">
            <i className="fas fa-robot"></i>
          </div>
        )}
      </div>
      <div className="post-content">
        <h3 className="post-title">
          <Link to={`/article/${article._id}`}>{article.title}</Link>
        </h3>
        <div className="post-meta mb-2">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          {article.isAiInhanced && (
            <span className="ai-indicator ms-2">
              <i className="fas fa-robot text-primary" title="AI Enhanced"></i>
            </span>
          )}
        </div>
        <p className="text-muted small">
          {article.summary ? article.summary.substring(0, 100) : ''}...
        </p>
        {/* AI Facts Preview */}
        {article.aiFacts && article.aiFacts.length > 0 && (
          <div className="ai-facts-preview mt-2">
            <small className="text-success">
              <i className="fas fa-lightbulb me-1"></i>
              +{article.aiFacts.length} key facts
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;