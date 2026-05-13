import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './critical.css'; // Load critical CSS first
import PerformanceOptimizer from './components/PerformanceOptimizer';
import NavbarNew from './components/NavbarNew';
import HomeNew from './pages/HomeNew';
import CategoryNew from './pages/CategoryNew';
import ArticleNew from './pages/ArticleNew';
import Sources from './pages/Sources';
import Search from './pages/Search';
import FooterNew from './components/FooterNew';
import './App.css';

import Videos from './pages/Videos';

function App() {
  return (
    <Router>
      <div className="App">
        <PerformanceOptimizer />
        <NavbarNew />
        <main>
          <Routes>
            <Route path="/" element={<HomeNew />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/category/:category" element={<CategoryNew />} />
            <Route path="/article/:id" element={<ArticleNew />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        <FooterNew />
      </div>
    </Router>
  );
}

export default App;