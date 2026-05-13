import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import './Sources.css';

const Sources = () => {
  const [sources, setSources] = useState([]);
  const [filteredSources, setFilteredSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [sortBy, setSortBy] = useState('credibility');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const regions = ['all', 'Middle East', 'Africa', 'Europe', 'North America', 'Asia Pacific'];
  const tiers = ['all', 'Tier 1 (90%+)', 'Tier 2 (70-89%)', 'Tier 3 (50-79%)'];

  useEffect(() => {
    fetchSources();
  }, []);

  useEffect(() => {
    filterAndSortSources();
  }, [searchTerm, selectedRegion, selectedTier, sortBy, sources]);

  const fetchSources = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/sources`);
      const data = await response.json();
      setSources(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sources:', error);
      setLoading(false);
    }
  };

  const filterAndSortSources = () => {
    let filtered = sources;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(source =>
        source.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Region filter
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(source => source.region === selectedRegion);
    }

    // Tier filter
    if (selectedTier !== 'all') {
      const tierMap = {
        'Tier 1 (90%+)': 'Tier 1',
        'Tier 2 (70-89%)': 'Tier 2',
        'Tier 3 (50-79%)': 'Tier 3'
      };
      filtered = filtered.filter(source => source.tier === tierMap[selectedTier]);
    }

    // Sort
    if (sortBy === 'credibility') {
      filtered.sort((a, b) => (b.credibilityScore || 0) - (a.credibilityScore || 0));
    }

    setFilteredSources(filtered);
    setCurrentPage(1);
  };

  const getSourceInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getTimeAgo = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const scraped = new Date(date);
    const hours = Math.floor((now - scraped) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  // Pagination
  const totalPages = Math.ceil(filteredSources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSources = filteredSources.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="sources-page-new">
      {/* Header */}
      <div className="sources-header-new">
        <div className="container">
          <div className="sources-breadcrumb">
            <i className="bi bi-transparency"></i>
            <span>Transparency Center</span>
          </div>
          <h1 className="sources-main-title">Our Trusted Sources Directory</h1>
          <p className="sources-subtitle">
            We aggregate from sources that demonstrate journalistic integrity and deep expertise in Muslim world affairs. Here's how we verify them.
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="sources-controls">
        <div className="container">
          <div className="controls-wrapper">
            <div className="search-box-new">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search organization or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="controls-right">
              <div className="sort-control">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="credibility">Credibility</option>
                  <option value="name">Name</option>
                </select>
              </div>
              <button className="filter-btn">
                <i className="bi bi-funnel"></i> Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="sources-main-content">
        <div className="container">
          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-3">
              <div className="filters-sidebar">
                {/* Region Filter */}
                <div className="filter-section">
                  <h5 className="filter-title">REGION</h5>
                  <div className="filter-options">
                    {regions.map((region) => (
                      <label key={region} className="filter-option">
                        <input
                          type="radio"
                          name="region"
                          checked={selectedRegion === region}
                          onChange={() => setSelectedRegion(region)}
                        />
                        <span>{region === 'all' ? 'All Regions' : region}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Credibility Tier Filter */}
                <div className="filter-section">
                  <h5 className="filter-title">CREDIBILITY TIERS</h5>
                  <div className="filter-options">
                    {tiers.map((tier) => (
                      <label key={tier} className="filter-option">
                        <input
                          type="radio"
                          name="tier"
                          checked={selectedTier === tier}
                          onChange={() => setSelectedTier(tier)}
                        />
                        <span>{tier === 'all' ? 'All Tiers' : tier}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ummah Verified Badge */}
                <div className="verified-badge-info">
                  <div className="verified-icon">
                    <i className="bi bi-patch-check-fill"></i>
                  </div>
                  <h6>Ummah Verified</h6>
                  <p>Every source in this directory undergoes a 12-point editorial and verification process before aggregation.</p>
                  <a href="#" className="learn-more-link">Read Verification Process</a>
                </div>
              </div>
            </div>

            {/* Sources Grid */}
            <div className="col-lg-9">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner-border text-warning" role="status"></div>
                  <p>Loading sources...</p>
                </div>
              ) : paginatedSources.length === 0 ? (
                <div className="empty-state">
                  <i className="bi bi-inbox"></i>
                  <h3>No sources found</h3>
                  <p>Try adjusting your filters</p>
                </div>
              ) : (
                <>
                  <div className="sources-grid-new">
                    {paginatedSources.map((source) => (
                      <div key={source._id} className="source-card-new">
                        <div className="source-card-header-new">
                          <div className="source-logo-new">
                            {source.logo ? (
                              <img src={source.logo} alt={source.name} />
                            ) : (
                              <div className="source-initials-new">
                                {getSourceInitials(source.name)}
                              </div>
                            )}
                          </div>
                          <div className="source-info">
                            <h3 className="source-name-new">{source.name}</h3>
                            <p className="source-location">
                              <i className="bi bi-geo-alt"></i> {source.country || source.region || 'Global'}
                            </p>
                          </div>
                          <span className={`status-badge-new ${source.isActive ? 'active' : 'inactive'}`}>
                            {source.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className="source-card-body-new">
                          {/* Credibility Score */}
                          <div className="credibility-section">
                            <div className="credibility-label">
                              <span>Credibility Score</span>
                              <span className="credibility-value">{source.credibilityScore || 80}%</span>
                            </div>
                            <div className="credibility-bar">
                              <div 
                                className="credibility-fill" 
                                style={{ width: `${source.credibilityScore || 80}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="source-description-new">
                            "{source.description || 'A trusted news source providing quality journalism and insights.'}"
                          </p>

                          {/* Footer */}
                          <div className="source-card-footer-new">
                            <span className="scraped-time">
                              <i className="bi bi-clock"></i> Scraped {getTimeAgo(source.lastScraped)}
                            </span>
                            <a href={source.url} target="_blank" rel="noopener noreferrer" className="details-link">
                              Details <i className="bi bi-chevron-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination-new">
                      <p className="pagination-info">Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredSources.length)} of {filteredSources.length} sources</p>
                      <div className="pagination-controls">
                        <button 
                          className="pagination-btn"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button 
                          className="pagination-btn"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sources;
