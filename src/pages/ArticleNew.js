import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import './ArticleNew.css';

const ArticleNew = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/articles/${id}`);
      const data = await response.json();
      setArticle(data);
      
      if (data.category) {
        fetchRelatedArticles(data.category);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching article:', error);
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/category/${category}?limit=3`);
      const data = await response.json();
      setRelatedArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatReadTime = (content) => {
    if (!content) return '5 min read';
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="custom-spinner"></div>
        <p className="loading-text">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Article not found</div>
      </div>
    );
  }

  return (
    <div className="article-detail-new">
      {/* Breadcrumb */}
      <div className="article-breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb-nav-new">
            <Link to="/">Home</Link>
            <i className="bi bi-chevron-right"></i>
            <Link to={`/category/${article.category}`}>{article.category}</Link>
            <i className="bi bi-chevron-right"></i>
            <span>Article</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <div className="article-header-section">
        <div className="container">
          <div className="article-category-label">
            <i className="bi bi-circle-fill"></i>
            {article.category?.toUpperCase() || 'NEWS'}
            {article.hasVideo && (
              <>
                <span className="mx-2">•</span>
                <i className="bi bi-play-circle-fill"></i>
                <span>VIDEO</span>
              </>
            )}
          </div>
          <h1 className="article-main-title">{article.title}</h1>
          
          <div className="article-meta-bar">
            <div className="author-section">
              <div className="author-avatar">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="author-details">
                <div className="author-name">{article.source?.name || 'Ummah Insights'}</div>
                <div className="article-meta-info">
                  <span className="meta-date">{formatDate(article.publishedAt)}</span>
                  <span className="meta-separator">•</span>
                  <span className="meta-time">{formatReadTime(article.content)}</span>
                </div>
              </div>
            </div>
            <div className="article-actions">
              <button className="action-icon-btn" title="Bookmark">
                <i className="bi bi-bookmark"></i>
              </button>
              <button className="action-icon-btn" title="Share">
                <i className="bi bi-share"></i>
              </button>
              <button className="action-icon-btn" title="More">
                <i className="bi bi-three-dots"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="article-main-section">
        <div className="container">
          <div className="row">
            {/* Article Content */}
            <div className="col-lg-8">
              {/* Featured Video - Show if available */}
              {article.hasVideo && article.videoUrl && (
                <div className="article-featured-video">
                  <div className="video-wrapper">
                    {article.videoUrl.includes('youtube.com') || article.videoUrl.includes('youtu.be') ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(article.videoUrl)}`}
                        title={article.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="responsive-iframe"
                      ></iframe>
                    ) : (
                      <video controls className="responsive-video">
                        <source src={article.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                  {article.isAiInhanced && (
                    <div className="video-badge-overlay">
                      <i className="bi bi-stars"></i> AI Enhanced
                    </div>
                  )}
                </div>
              )}

              {/* Featured Image - Show only if no video or as fallback */}
              {(!article.hasVideo || !article.videoUrl) && article.imageUrl && (
                <div className="article-featured-img">
                  <img src={article.imageUrl} alt={article.title} />
                  {article.isAiInhanced && (
                    <div className="ai-badge-overlay">
                      <i className="bi bi-stars"></i> AI Enhanced
                    </div>
                  )}
                </div>
              )}

              {/* Article Body */}
              <div className="article-content-body">
                {article.summary && (
                  <div className="article-summary-box">
                    <p>{article.summary}</p>
                  </div>
                )}

                <div className="article-text">
                  {article.content ? (
                    <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br /><br />') }} />
                  ) : (
                    <p>{article.description}</p>
                  )}
                </div>

                {/* Verification Section */}
                {article.source && (
                  <div className="verification-section">
                    <h3 className="verification-title">
                      <i className="bi bi-patch-check-fill"></i>
                      Verified Sources for this Report
                    </h3>
                    <div className="verified-source-card">
                      <div className="verified-source-info">
                        <div className="verified-icon">
                          <i className="bi bi-newspaper"></i>
                        </div>
                        <div>
                          <h4>{article.source.name}</h4>
                          <p>{article.source.country || 'Global'}</p>
                        </div>
                      </div>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="view-source-btn">
                        View Source
                      </a>
                    </div>
                  </div>
                )}

                {/* Deeper Look CTA */}
                <div className="deeper-look-cta">
                  <h3>Want a deeper look?</h3>
                  <p>Access our full database of sourced news and data-tracking methodology.</p>
                  <button className="btn-explore">
                    Explore Report Explorer <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Key Insights - Always show with fallback */}
              <div className="key-insights-card">
                <div className="insights-header">
                  <i className="bi bi-lightbulb-fill"></i>
                  <span>AI Enhanced</span>
                </div>
                <h3>Key Insights</h3>
                {article.aiFacts && article.aiFacts.length > 0 ? (
                  <>
                    <ul className="insights-list">
                      {article.aiFacts.slice(0, 5).map((item, index) => (
                        <li key={index}>
                          {typeof item === 'string' ? item : item.fact || 'Key insight available'}
                        </li>
                      ))}
                    </ul>
                    <button className="btn-full-analysis">View Full AI Analysis</button>
                  </>
                ) : (
                  <ul className="insights-list">
                    <li>No AI insight available.</li>
                    
                  </ul>
                )}

              </div>

              {/* Related Stories */}
              {relatedArticles.length > 0 && (
                <div className="related-stories-card">
                  <div className="card-header-simple">
                    <h4>Related Stories</h4>
                    <Link to={`/category/${article.category}`}>See All</Link>
                  </div>
                  <div className="related-stories-list">
                    {relatedArticles.filter(a => a._id !== article._id).slice(0, 3).map((story) => (
                      <Link key={story._id} to={`/article/${story._id}`} className="related-story-item">
                        <div className="related-story-img">
                          <img src={story.imageUrl || 'https://via.placeholder.com/80x80'} alt={story.title} />
                        </div>
                        <div className="related-story-content">
                          <h5>{story.title}</h5>
                          <p className="related-story-meta">
                            {story.source?.name} • {formatDate(story.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily Insights */}
              <div className="daily-insights-card">
                <h4>Daily Insights</h4>
                <p>Get AI-summarized global news. Major topics delivered daily.</p>
                <form className="insights-subscribe-form">
                  <input type="email" placeholder="Email address" />
                  <button type="submit">Join</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleNew;
