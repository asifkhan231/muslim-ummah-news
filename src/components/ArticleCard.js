import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article, priority = false }) => {
  return (
    <div className="post-card compact">
      <div className="post-thumb">
        <Link to={`/article/${article._id}`}>
          <img
            src={article.imageUrl || 'https://via.placeholder.com/400x200'}
            alt={article.title}
            className="img-fluid"
            style={{ 
              minHeight: '180px', 
              maxHeight: '180px',
              objectFit: 'cover',
              width: '100%'
            }}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            width="400"
            height="180"
          />
        </Link>
        
        {/* Category Badge */}
        <div className="post-cat">{article.category}</div>
        
        {/* AI Enhancement Badge - Moved to image overlay */}
        {article.isAiInhanced && (
          <div className="ai-badge-overlay">
            <i className="fas fa-robot"></i>
          </div>
        )}
        
        {/* AI Facts Preview - Moved to image overlay bottom */}
        {article.aiFacts && article.aiFacts.length > 0 && (
          <div className="ai-facts-overlay">
            <i className="fas fa-lightbulb me-1"></i>
            +{article.aiFacts.length} key facts
          </div>
        )}
      </div>
      
      <div className="post-content compact">
        <h3 className="post-title compact">
          <Link to={`/article/${article._id}`}>{article.title}</Link>
        </h3>
        
        <div className="post-meta compact mb-2">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          {article.isAiInhanced && (
            <span className="ai-indicator ms-2">
              <i className="fas fa-robot text-primary" title="AI Enhanced"></i>
            </span>
          )}
        </div>
        
        <p className="text-muted small compact">
          {article.summary ? article.summary.substring(0, 80) : ''}...
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;