# Ummah News Hub - Frontend

A modern React.js web application providing a comprehensive news platform for the global Muslim community. Features responsive design, real-time updates, and an intuitive user interface for browsing news from around the world.

## Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Real-time News**: Live breaking news ticker and updates
- **Advanced Search**: Filter by categories, sources, and keywords
- **Video Integration**: Embedded video content support
- **Article Categories**: Organized by regions and topics
- **Hero Carousel**: Featured articles showcase
- **Trending Section**: Popular and trending news
- **AI-Enhanced Content**: Display AI-refined articles with key facts
- **Social Sharing**: Share articles across platforms
- **Pagination**: Efficient content browsing
- **SEO Optimized**: Meta tags and structured data

## Tech Stack

- **Framework**: React.js 18
- **Routing**: React Router DOM 6
- **Styling**: Bootstrap 5 + Custom CSS
- **HTTP Client**: Axios
- **Icons**: Font Awesome
- **Build Tool**: Create React App
- **Testing**: Jest + React Testing Library

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.js      # Navigation header
│   │   ├── Footer.js      # Site footer
│   │   ├── Sidebar.js     # Sidebar content
│   │   ├── ArticleCard.js # Article preview cards
│   │   └── HeroCarousel.js# Featured articles carousel
│   ├── pages/             # Page components
│   │   ├── Home.js        # Homepage with article feed
│   │   ├── Article.js     # Individual article view
│   │   ├── Category.js    # Category-filtered articles
│   │   ├── Search.js      # Search results page
│   │   └── Videos.js      # Video content page
│   ├── App.js             # Main application component
│   ├── App.css            # Global styles
│   ├── index.js           # Application entry point
│   └── index.css          # Base styles
├── package.json           # Dependencies and scripts
└── .env                   # Environment variables
```

## Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Backend API running on port 5000

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the frontend directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SITE_NAME=Ummah News Hub
REACT_APP_SITE_DESCRIPTION=Comprehensive Muslim community news platform

# SEO Configuration
REACT_APP_SITE_URL=https://your-domain.com
REACT_APP_DEFAULT_IMAGE=https://your-domain.com/og-image.jpg

# Social Media
REACT_APP_TWITTER_HANDLE=@ummah_news
REACT_APP_FACEBOOK_PAGE=ummah-news-hub
```

### 3. Start Development Server
```bash
# Development server (http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Available Scripts

- `npm start` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (irreversible)

## Key Components

### Home Page (`src/pages/Home.js`)
- Breaking news ticker
- Hero carousel with featured articles
- Trending articles sidebar
- Paginated article feed
- Category filtering

### Article Page (`src/pages/Article.js`)
- Full article content display
- AI enhancement indicators
- Key facts and background context
- Video/image media support
- Social sharing buttons
- Related articles suggestions

### Navigation (`src/components/Navbar.js`)
- Responsive navigation menu
- Search functionality
- Category quick links
- Mobile-friendly hamburger menu

### Article Cards (`src/components/ArticleCard.js`)
- Article preview with image
- Category badges
- Publication date and source
- Read time estimation
- Hover effects and animations

## Styling & Design

### CSS Architecture
- **Bootstrap 5**: Responsive grid and components
- **Custom CSS**: Brand-specific styling and animations
- **CSS Variables**: Consistent color scheme and typography
- **Mobile-First**: Responsive design approach

### Key Design Elements
- **Color Scheme**: Red (#dc3545) primary, professional grays
- **Typography**: Oswald for headings, system fonts for body
- **Layout**: Card-based design with clean spacing
- **Animations**: Subtle hover effects and transitions

## API Integration

### Axios Configuration
```javascript
// Default proxy configuration in package.json
"proxy": "http://localhost:5002"

// API calls example
const response = await axios.get('/api/articles?page=1&limit=10');
```

### Error Handling
- Network error recovery
- Loading states and spinners
- User-friendly error messages
- Retry mechanisms

## SEO Features

### Meta Tags
- Dynamic page titles
- Article-specific descriptions
- Open Graph tags for social sharing
- Twitter Card support

### Structured Data
- Article schema markup
- Organization information
- Breadcrumb navigation
- FAQ sections

### Performance
- Code splitting and lazy loading
- Image optimization
- Caching strategies
- Bundle size optimization

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Touch-friendly navigation
- Optimized article reading
- Swipe gestures for carousel
- Compressed images for mobile

## Deployment

### Production Build
```bash
# Create optimized build
npm run build

# Serve static files
npx serve -s build
```

### Environment Variables for Production
```env
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_SITE_URL=https://your-domain.com
NODE_ENV=production
```

### Hosting Options
- **Netlify**: Automatic deployments from Git
- **Vercel**: Optimized for React applications
- **AWS S3 + CloudFront**: Scalable static hosting
- **Firebase Hosting**: Google's hosting platform

## Performance Optimization

### Bundle Optimization
- Code splitting with React.lazy()
- Tree shaking for unused code
- Image lazy loading
- Service worker for caching

### SEO Best Practices
- Server-side rendering consideration
- Sitemap generation
- Robot.txt configuration
- Page speed optimization

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Legacy Support**: IE11 with polyfills (optional)

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Follow React best practices and coding standards
4. Add tests for new components
5. Submit pull request with detailed description

## Testing

### Test Structure
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Testing Libraries
- **Jest**: Test runner and assertions
- **React Testing Library**: Component testing utilities
- **User Event**: User interaction simulation

## License

MIT License - see LICENSE file for details