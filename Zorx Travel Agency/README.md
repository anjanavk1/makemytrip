# Zorx Travel Agency Website

A premium, high-converting travel agency website specializing in luxury Arabian adventures with WhatsApp lead generation.

## 🚀 Features

- **4 Complete Pages**: Homepage, Packages, Tour Details, Contact
- **Premium Animations**: Ken Burns effect, scroll reveals, hover interactions
- **WhatsApp Integration**: One-click lead generation with pre-filled messages
- **Mobile-First Design**: Fully responsive with sticky mobile bar
- **SEO Optimized**: Proper meta tags, semantic HTML, fast loading
- **Brand Colors**: Sky Blue (#00AEEF), Navy (#012169), White

## 📁 Project Structure

```
Zorx Travel Agency/
├── index.html          # Homepage with hero, featured tours
├── packages.html       # All tour packages listing
├── tour.html          # Individual tour details page
├── contact.html       # Contact form and information
├── css/
│   ├── main.css       # Core design system
│   └── animations.css # Animation library
├── js/
│   └── main.js        # JavaScript functionality
├── PRD.MD             # Product requirements document
└── README.md          # This file
```

## 🎨 Design System

### Colors
- **Primary**: #00AEEF (Sky Blue)
- **Secondary**: #FFFFFF (White)
- **Text**: #012169 (Deep Navy)

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 400, 500, 600, 700

### Animations
- Ken Burns effect on hero background
- Staggered fade-in for cards (100ms delay)
- Sticky navigation with transparency toggle
- Button lift effects on hover
- Scroll reveal animations

## 🚀 How to Run

### Option 1: Simple HTTP Server (Recommended)

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx serve .
```

Then open: `http://localhost:8000`

### Option 2: Direct File Access

Simply open `index.html` in your web browser. However, for best results, use a local server.

### Option 3: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📱 WhatsApp Configuration

Update the WhatsApp number in `js/main.js`:

```javascript
const phoneNumber = '971501234567'; // Replace with your number
```

Format: Country code + number (no + or spaces)

## 🎯 Key Pages

### Homepage (`index.html`)
- Hero section with call-to-action
- Trust bar with ratings
- Experience categories
- Featured tours (3 cards)
- About section

### Packages (`packages.html`)
- 9 tour packages in 3-column grid
- Each with "View Package" and WhatsApp CTA
- Responsive mobile layout

### Tour Details (`tour.html`)
- Image gallery (4 images)
- Detailed description
- Tour highlights
- Timeline itinerary
- Sticky booking widget
- Related tours

### Contact (`contact.html`)
- Contact form
- Contact information cards
- Office hours
- Map placeholder
- FAQ section

## 🎨 Customization

### Change Colors

Edit CSS variables in `css/main.css`:

```css
:root {
  --color-primary: #00AEEF;
  --color-text: #012169;
  /* ... */
}
```

### Add New Tours

1. Copy a card from `packages.html`
2. Update title, description, price
3. Change gradient colors
4. Update WhatsApp `data-tour-name`

### Modify Animations

Edit `css/animations.css` or adjust delays:

```css
.scroll-reveal-stagger:nth-child(1) {
  transition-delay: 0s;
}
```

## 📊 Performance

- Mobile-first responsive design
- Optimized CSS with variables
- Lazy loading ready
- Minimal JavaScript
- No external dependencies (except Google Fonts)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 SEO Features

- Semantic HTML5 elements
- Meta descriptions on all pages
- Proper heading hierarchy
- Alt text ready for images
- Fast loading times
- Mobile-friendly

## 🔧 Future Enhancements

- Add real images (replace gradient placeholders)
- Integrate Google Maps API
- Add booking calendar
- Multi-language support
- Blog section
- Customer testimonials
- Live chat integration

## 📄 License

© 2024 Zorx Travel Agency. All rights reserved.

## 🤝 Support

For questions or support:
- 📧 Email: info@zorxtravel.com
- 📱 WhatsApp: +971 50 123 4567
- 📍 Location: Dubai, UAE

---

**Built with ❤️ for premium Arabian adventures**
