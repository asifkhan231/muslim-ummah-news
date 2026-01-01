import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const MostPopular = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPopularArticles();
    }, []);

    const fetchPopularArticles = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/articles?limit=5&sort=views`);
            const data = await response.json();
            setArticles(data.articles || []);
        } catch (error) {
            console.error('Error fetching popular articles:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="text-center py-4">
            <div className="spinner-border spinner-border-sm text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="most-popular-widget mb-5">
            <h5 className="widget-title mb-4 font-weight-bold" style={{
                fontFamily: "'Playfair Display', serif",
                textTransform: 'uppercase',
                borderLeft: '4px solid #f39c12',
                paddingLeft: '1rem',
                fontSize: '1.1rem',
                letterSpacing: '1px'
            }}>
                Most Popular
            </h5>

            <div className="popular-list">
                {articles.map((article, index) => (
                    <div key={article._id} className="popular-item d-flex mb-4 position-relative">
                        <div className="number me-3" style={{
                            fontSize: '3.5rem',
                            lineHeight: '0.8',
                            fontWeight: '300',
                            color: '#dee2e6',
                            minWidth: '40px',
                            fontFamily: 'Georgia, serif'
                        }}>
                            {index + 1}
                        </div>
                        <div className="content pt-1">
                            <Link to={`/article/${article._id}`} className="text-decoration-none text-dark">
                                <h6 className="mb-0 fw-bold" style={{ fontSize: '1.1rem', lineHeight: '1.4' }}>
                                    {article.title}
                                </h6>
                            </Link>
                            {article.source && (
                                <small className="text-muted mt-1 d-block text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                    {article.source.name}
                                </small>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostPopular;
