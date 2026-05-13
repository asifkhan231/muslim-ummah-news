# Ummah Insights - Frontend Redesign

## Overview
Complete redesign of the Ummah News Hub frontend with a modern, clean UI following the provided design mockups. The redesign includes:

- **New Home Page** with hero carousel, latest insights grid, and Namaz timer
- **Article Detail Page** with enhanced reading experience
- **Category Pages** with filtering and pagination
- **Sources Directory** with search and filter capabilities
- **Namaz Timer Widget** with real-time prayer times based on user location

## New Features

### 1. Namaz Timer Component
- **Real-time prayer times** based on user's geolocation
- **Next prayer countdown** with time remaining
- **Beautiful gradient design** matching the Islamic theme
- **Responsive layout** for all screen sizes
- Uses **Aladhan API** for accurate prayer times

### 2. Redesigned Home Page (`HomeNew.js`)
- **Hero Section** with featured article and overlay
- **Category Tabs** for easy navigation
- **Latest Insights Grid** with 2-column layout
- **Sidebar** with Namaz timer, trending news, and newsletter signup
- **AI-enhanced badges** for AI-generated content
- **Responsive design** for mobile and tablet

### 3. Article Detail Page (`ArticleNew.js`)
- **Clean reading experience** with proper typography
- **Breadcrumb navigation**
- **Author information** with avatar
- **Social sharing buttons** (Facebook, Twitter, LinkedIn, WhatsApp)
- **Related articles section**
- **Tags and categories**
- **Source attribution** with external link

### 4. Category Page (`CategoryNew.js`)
- **Category header** with gradient background
- **Sticky category tabs** for easy switching
- **Article grid** with 2-column layout
- **Pagination** for browsing multiple pages
- **Sidebar** with Namaz timer and category list
- **Empty state** handling

### 5. Sources Directory (`Sources.js`)
- **Search functionality** to find sources
- **Category filter** dropdown
- **Source cards** with logo, description, and status
- **Visit source** button with external link
- **Responsive grid** layout
- **Active/Inactive status** badges

### 6. New Navbar (`NavbarNew.js`)
- **Top bar** with quick links and user actions
- **Main navigation** with logo and menu items
- **Integrated search** bar
- **Mobile menu** with hamburger toggle
- **Sticky positioning** for easy access

## File Structure

```
frontend/src/
├── components/
│   ├── NamazTimer.js          # Prayer times widget
│   ├── NamazTimer.css
│   ├── NavbarNew.js           # Redesigned navigation
│   └── NavbarNew.css
├── pages/
│   ├── HomeNew.js             # Redesigned home page
│   ├── HomeNew.css
│   ├── ArticleNew.js          # Article detail page
│   ├── ArticleNew.css
│   ├── CategoryNew.js         # Category listing page
│   ├── CategoryNew.css
│   ├── Sources.js             # Sources directory
│   └── Sources.css
└── App.js                     # Updated routing
```

## Design Theme

### Color Palette
- **Primary Green**: `#2d8659` (Islamic theme)
- **Dark Green**: `#1a5f3f`
- **Light Green**: `#e8f5e9`
- **Dark Text**: `#1a1a1a`
- **Gray Text**: `#666`
- **Light Gray**: `#f8f9fa`

### Typography
- **Headings**: Bold, 700 weight
- **Body**: 400-600 weight
- **Font Size**: 14-17px for body, larger for headings

### Components
- **Border Radius**: 6-12px for cards and buttons
- **Box Shadow**: Subtle shadows for depth
- **Transitions**: 0.3s for smooth interactions
- **Hover Effects**: Transform and color changes

## API Integration

All pages use the backend API from `config/api.js`:

```javascript
export const API_BASE_URL = "https://muslim-ummah-news-backend.vercel.app/api";
```

### Endpoints Used:
- `GET /articles` - Fetch all articles with pagination
- `GET /articles/:id` - Fetch single article
- `GET /articles/category/:category` - Fetch articles by category
- `GET /sources` - Fetch all news sources

## Namaz Timer API

Uses the **Aladhan API** for prayer times:
- Endpoint: `https://api.aladhan.com/v1/timings`
- Method: Calculation method 2 (ISNA)
- Location: User's geolocation (latitude/longitude)

## Installation & Setup

1. **Install dependencies** (if not already done):
```bash
cd frontend
npm install
```

2. **Start development server**:
```bash
npm start
```

3. **Build for production**:
```bash
npm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## Key Features

### Performance
- Lazy loading for images
- Code splitting for routes
- Optimized bundle size
- Fast initial load time

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly

### SEO
- Meta tags for each page
- Structured data
- Proper heading hierarchy
- Alt text for images

## Future Enhancements

1. **User Authentication** - Login/signup functionality
2. **Bookmarks** - Save articles for later
3. **Dark Mode** - Toggle between light and dark themes
4. **Notifications** - Push notifications for breaking news
5. **Comments** - User comments on articles
6. **Multilingual** - Support for Arabic and other languages

## Testing

To test the redesign:

1. **Home Page**: Navigate to `/` to see the new home page
2. **Categories**: Click on category tabs or visit `/category/politics`
3. **Articles**: Click on any article card to view details
4. **Sources**: Visit `/sources` to see the sources directory
5. **Namaz Timer**: Check the sidebar for prayer times (requires location permission)

## Notes

- The Namaz timer requires **geolocation permission** from the user
- All images use **placeholder URLs** if no image is provided
- The design is **fully responsive** and works on all devices
- **Bootstrap Icons** are used throughout the design
- The color scheme follows an **Islamic/green theme**

## Support

For issues or questions, please contact the development team or create an issue in the repository.

---

**Built with React, Bootstrap, and modern web technologies**
