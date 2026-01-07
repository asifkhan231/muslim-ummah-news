import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preload API endpoint
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = process.env.REACT_APP_API_URL || 'https://muslim-ummah-news-backend.vercel.app';
      document.head.appendChild(link);

      // Preload common images
      const commonImages = [
        'https://via.placeholder.com/400x250',
        'https://via.placeholder.com/1200x600'
      ];

      commonImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    // Optimize font loading
    const optimizeFonts = () => {
      if ('fonts' in document) {
        // Load critical fonts
        document.fonts.load('400 16px Inter').then(() => {
          document.body.classList.add('fonts-loaded');
        });
      }
    };

    // Lazy load non-critical resources
    const lazyLoadResources = () => {
      // Lazy load Font Awesome if not already loaded
      if (!document.querySelector('link[href*="font-awesome"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        link.media = 'print';
        link.onload = function() { this.media = 'all'; };
        document.head.appendChild(link);
      }
    };

    // Initialize optimizations
    preloadResources();
    optimizeFonts();
    
    // Delay non-critical resources
    setTimeout(lazyLoadResources, 1000);

    // Cleanup
    return () => {
      // Remove any event listeners if needed
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;