import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroCarousel = ({ articles }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Auto-advance
    useEffect(() => {
        if (!articles || articles.length === 0) return;
        
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % Math.min(articles.length, 5));
        }, 5000);
        return () => clearInterval(interval);
    }, [articles]);

    // Preload the first image for LCP optimization
    useEffect(() => {
        if (!articles || articles.length === 0) return;
        
        const featured = articles.slice(0, 5);
        const activeArticle = featured[activeIndex];
        
        if (activeArticle?.imageUrl) {
            const img = new Image();
            img.onload = () => setImageLoaded(true);
            img.src = activeArticle.imageUrl;
        } else {
            setImageLoaded(false);
        }

        // Preload next images
        featured.slice(1, 3).forEach(article => {
            if (article.imageUrl) {
                const img = new Image();
                img.src = article.imageUrl;
            }
        });
    }, [articles, activeIndex]);

    // Early return after all hooks
    if (!articles || articles.length === 0) return null;

    const featured = articles.slice(0, 5);
    const activeArticle = featured[activeIndex];

    return (
        <div className="hero-slider-wrap">
            {/* 1. Main Slide with optimized image loading */}
            <div 
                className="hero-slide" 
                style={{ 
                    backgroundImage: imageLoaded ? `url(${activeArticle.imageUrl || 'https://via.placeholder.com/1200x600'})` : 'none',
                    backgroundColor: imageLoaded ? 'transparent' : '#f8f9fa'
                }}
            >
                <div className="hero-overlay">
                    <span className="hero-cat-badge">{activeArticle.category}</span>
                    <Link to={`/article/${activeArticle._id}`} className="text-decoration-none">
                        <h2 className="hero-title">{activeArticle.title}</h2>
                    </Link>
                    <div className="hero-meta">
                        <i className="far fa-user me-2"></i>{activeArticle.author || 'Staff Writer'}
                        <span className="mx-2">/</span>
                        <i className="far fa-clock me-2"></i>{new Date(activeArticle.publishedAt).toDateString()}
                    </div>
                </div>
            </div>

            {/* 2. Carousel Controls (Simplistic) */}
            <div className="d-flex justify-content-between position-absolute w-100 top-50 px-3" style={{ pointerEvents: 'none' }}>
                <button
                    className="btn btn-dark btn-sm rounded-0"
                    style={{ pointerEvents: 'auto', opacity: 0.7 }}
                    onClick={() => setActiveIndex(activeIndex === 0 ? featured.length - 1 : activeIndex - 1)}
                    aria-label="Previous slide"
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button
                    className="btn btn-dark btn-sm rounded-0"
                    style={{ pointerEvents: 'auto', opacity: 0.7 }}
                    onClick={() => setActiveIndex((activeIndex + 1) % featured.length)}
                    aria-label="Next slide"
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            {/* 3. Indicators */}
            <div className="d-flex justify-content-center mt-2 position-absolute bottom-0 w-100 mb-2">
                {featured.map((_, idx) => (
                    <button
                        key={idx}
                        className={`btn btn-sm rounded-circle p-1 mx-1 ${idx === activeIndex ? 'btn-red' : 'btn-light'}`}
                        style={{ width: '10px', height: '10px' }}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
