# Quick Start Guide - Ummah Insights Frontend

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running (or use production API)

### Installation

1. **Navigate to frontend directory**:
```bash
cd frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure API** (optional):
Edit `src/config/api.js` to use local or production backend:

```javascript
// Production (default)
export const API_BASE_URL = "https://muslim-ummah-news-backend.vercel.app/api";

// Local development
// export const API_BASE_URL = "http://localhost:5002/api";
```

4. **Start development server**:
```bash
npm start
```

5. **Open browser**:
Navigate to `http://localhost:3000`

## 📱 Features Overview

### Home Page (`/`)
- Hero section with featured article
- Latest insights grid (8 articles)
- Trending news sidebar
- Namaz timer with real-time prayer times
- Dynamic category tabs
- Load More functionality

### Category Pages (`/category/:category`)
- Category-specific articles
- Pagination (12 articles per page)
- Dynamic category tabs
- Sidebar with Namaz timer

### Article Detail (`/article/:id`)
- Full article content
- Related articles
- Social sharing buttons
- Tags and categories
- Source attribution

### Sources Directory (`/sources`)
- All news sources
- Search functionality
- Category filtering
- Source statistics
- Verification badges

## 🔧 Available Scripts

### Development
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Production Build
```bash
npm run build
```

The build folder will contain optimized production files.

## 🌐 API Endpoints

The frontend uses these backend endpoints:

### Articles
- `GET /api/articles` - List articles (paginated)
- `GET /api/articles/:id` - Get single article
- `GET /api/articles/category/:category` - Category articles
- `GET /api/articles/stats` - Article statistics

### Sources
- `GET /api/sources` - List all sources
- `GET /api/sources/:id` - Get single source

### Features
- `GET /api/features/prayer-times?lat=X&lng=Y` - Prayer times

## 📂 Project Structure

```
frontend/
├── public/
│   ├── index.html              # Main HTML file
│   └── manifest.json           # PWA manifest
├── src/
│   ├── components/
│   │   ├── NamazTimer.js       # Prayer times widget
│   │   ├── NavbarNew.js        # Navigation bar
│   │   └── Footer.js           # Footer component
│   ├── pages/
│   │   ├── HomeNew.js          # Home page
│   │   ├── ArticleNew.js       # Article detail
│   │   ├── CategoryNew.js      # Category page
│   │   └── Sources.js          # Sources directory
│   ├── config/
│   │   └── api.js              # API configuration
│   ├── App.js                  # Main app component
│   └── index.js                # Entry point
├── package.json                # Dependencies
└── README.md                   # Documentation
```

## 🎨 Design System

### Colors
- **Primary Green**: `#2d8659`
- **Dark Green**: `#1a5f3f`
- **Light Green**: `#e8f5e9`
- **Text Dark**: `#1a1a1a`
- **Text Gray**: `#666`
- **Background**: `#f8f9fa`

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: 700 weight
- **Body**: 400-600 weight
- **Font Sizes**: 14-17px body, larger for headings

### Components
- **Border Radius**: 6-12px
- **Box Shadow**: Subtle shadows for depth
- **Transitions**: 0.3s for smooth interactions

## 🔐 Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=https://muslim-ummah-news-backend.vercel.app/api
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🐛 Troubleshooting

### Issue: Articles not loading
**Solution**: Check API URL in `src/config/api.js` and ensure backend is running

### Issue: Prayer times not showing
**Solution**: Allow location permission in browser settings

### Issue: Images not displaying
**Solution**: Check if articles have valid `imageUrl` field

### Issue: Categories not appearing
**Solution**: Ensure backend has articles with categories

## 📊 Performance Tips

1. **Enable caching**: Browser caches API responses
2. **Optimize images**: Use compressed images
3. **Lazy loading**: Images load on scroll
4. **Code splitting**: React automatically splits code
5. **Production build**: Always use `npm run build` for production

## 🔄 Updating

To update to the latest version:

```bash
git pull origin main
npm install
npm start
```

## 📝 Development Workflow

1. **Create feature branch**:
```bash
git checkout -b feature/your-feature
```

2. **Make changes** and test locally

3. **Build for production**:
```bash
npm run build
```

4. **Test production build**:
```bash
npx serve -s build
```

5. **Commit and push**:
```bash
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

## 🚢 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Deploy

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Deploy

### Manual Deployment
```bash
npm run build
# Upload 'build' folder to your hosting
```

## 🆘 Support

For issues or questions:
1. Check documentation
2. Review console errors
3. Check backend API status
4. Contact development team

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Aladhan API](https://aladhan.com/prayer-times-api)

## ✅ Checklist for New Developers

- [ ] Clone repository
- [ ] Install Node.js and npm
- [ ] Run `npm install`
- [ ] Configure API URL
- [ ] Start development server
- [ ] Test all pages
- [ ] Check responsive design
- [ ] Review code structure
- [ ] Read documentation
- [ ] Make first contribution

---

**Happy Coding! 🎉**
