import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedGrid = ({ articles }) => {
    if (!articles || articles.length === 0) return null;

    // We need exactly 3 articles for this specific layout
    // 1 Main (Left) + 2 Secondary (Right Stack)
    const mainArticle = articles[0];
    const sideArticles = articles.slice(1, 3);

    return (
        <div className="featured-grid-container mb-5">
            <div className="row g-2">
                {/* Main Hero Article (66% width on desktop) */}
                <div className="col-lg-8">
                    <div className="featured-card main-featured h-100 position-relative overflow-hidden rounded-3">
                        <img
                            src={mainArticle.imageUrl || 'https://via.placeholder.com/800x600'}
                            alt={mainArticle.title}
                            className="featured-img w-100 h-100 object-fit-cover"
                        />
                        <div className="featured-overlay position-absolute bottom-0 start-0 w-100 p-4 p-lg-5 text-white bg-gradient-overlay">
                            <span className={`badge category-badge mb-2 bg-${mainArticle.category || 'general'}`}>
                                {mainArticle.category}
                            </span>
                            {mainArticle.hasVideo && (
                                <span className="badge bg-danger mb-2 ms-2"><i className="fas fa-play me-1"></i> Video</span>
                            )}
                            <div className="meta-text small mb-2 opacity-75">
                                {new Date(mainArticle.publishedAt).toLocaleDateString()} • {mainArticle.author || 'Staff'}
                            </div>
                            <Link to={`/article/${mainArticle._id}`} className="text-white text-decoration-none">
                                <h2 className="display-6 fw-bold mb-2 hero-title-hover">{mainArticle.title}</h2>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Side Stack (33% width on desktop) */}
                <div className="col-lg-4 d-flex flex-column gap-2">
                    {sideArticles.map((article, index) => (
                        <div key={article._id} className="featured-card sub-featured flex-grow-1 position-relative overflow-hidden rounded-3" style={{ minHeight: '250px' }}>
                            <img
                                src={article.imageUrl || 'https://via.placeholder.com/400x300'}
                                alt={article.title}
                                className="featured-img w-100 h-100 object-fit-cover"
                            />
                            <div className="featured-overlay position-absolute bottom-0 start-0 w-100 p-3 p-lg-4 text-white bg-gradient-overlay">
                                <span className={`badge category-badge mb-2 bg-${article.category || 'general'}`}>
                                    {article.category}
                                </span>
                                {article.hasVideo && (
                                    <span className="badge bg-danger mb-2 ms-2"><i className="fas fa-play me-1"></i> Video</span>
                                )}
                                <Link to={`/article/${article._id}`} className="text-white text-decoration-none">
                                    <h4 className="h5 fw-bold mb-1">{article.title}</h4>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedGrid;
