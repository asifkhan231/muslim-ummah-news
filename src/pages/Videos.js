import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Videos = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVideoArticles();
    }, []);

    const fetchVideoArticles = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/articles?hasVideo=true&limit=20`);
            const data = await response.json();
            setArticles(data.articles || []);
        } catch (error) {
            console.error('Error fetching video articles:', error);
            setError('Failed to load videos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-8">
                    <div className="d-flex align-items-center mb-4">
                        <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                            <i className="fas fa-play fa-lg"></i>
                        </div>
                        <div>
                            <h1 className="h2 mb-0">Videos</h1>
                            <p className="text-muted mb-0">Watch the latest news and reports</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : articles.length === 0 ? (
                        <div className="text-center py-5 bg-light rounded">
                            <i className="fas fa-film fa-3x text-muted mb-3"></i>
                            <h3>No Videos Found</h3>
                            <p>Check back later for video content.</p>
                        </div>
                    ) : (
                        <div className="row">
                            {articles.map((article, index) => (
                                <div key={article._id} className="col-md-6 mb-4">
                                    <ArticleCard article={article} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-lg-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default Videos;
