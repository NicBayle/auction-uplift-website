# Auction Uplift Website

A modern, professional website for Auction Uplift - a premium fundraising consultancy specializing in high-profile international benefit auctions.

## Features

### 🎯 Enhanced User Experience
- **Prominent CTAs** - Clear call-to-action buttons throughout the site
- **Mobile-First Design** - Fully responsive across all devices
- **Smooth Animations** - Professional scroll animations and transitions
- **Accessibility** - WCAG compliant with keyboard navigation support
- **Dark Luxury Theme** - Sophisticated dark design with champagne gold accents

### 📋 Key Sections
1. **Hero Section** - Eye-catching introduction with key statistics
2. **Services** - Six comprehensive service offerings with hover effects
3. **Portfolio** - Case studies showcasing successful auctions
4. **Process Timeline** - 6-step visual timeline of the auction process
5. **About Miranda** - Detailed founder profile and credentials
6. **Testimonials** - Client reviews with star ratings
7. **FAQ** - Interactive accordion with common questions
8. **Contact Form** - Professional inquiry form with validation

### 💎 Improvements Over Original Site
- ✅ **Dark Luxury Theme** - Elegant champagne gold & warm gold on rich black
- ✅ Strong call-to-action buttons
- ✅ Portfolio/case studies section with results
- ✅ Enhanced contact form (vs. mailto links)
- ✅ Client testimonials section
- ✅ Detailed FAQ section
- ✅ Visual process timeline
- ✅ Better content hierarchy
- ✅ Professional animations
- ✅ Improved mobile experience

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No dependencies, fast loading
- **Google Fonts** - Playfair Display & Inter

## File Structure

```
Auction uplift/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # Interactive functionality
├── images/             # Image assets (add your images here)
│   ├── portfolio-1.jpg
│   ├── portfolio-2.jpg
│   ├── portfolio-3.jpg
│   └── miranda.jpg
└── README.md           # This file
```

## Setup Instructions

### 1. Add Images
Replace the placeholder images with actual photos:

- **Portfolio images** (`images/portfolio-1.jpg`, `portfolio-2.jpg`, `portfolio-3.jpg`)
  - Recommended size: 800x600px
  - Format: JPG or PNG
  - High-quality event/auction photos

- **About image** (`images/miranda.jpg`)
  - Recommended size: 600x800px (portrait)
  - Format: JPG or PNG
  - Professional headshot or full-body photo

### 2. Customize Content

#### Update Contact Information
In `index.html`, find and update:
- Email address: `info@auctionuplift.com`
- Phone number: `+33 1 23 45 67 89`
- Social media links in the footer

#### Customize Statistics (Hero Section)
Update the numbers in the hero stats:
```html
<div class="stat">
    <h3>15+</h3>
    <p>Years Experience</p>
</div>
```

#### Add Real Testimonials
Replace placeholder testimonials with actual client feedback in the testimonials section.

#### Update Portfolio Case Studies
Customize the three portfolio items with real auction results and details.

### 3. Connect Contact Form to Backend

The contact form currently logs to console. To connect to a backend:

1. Set up a backend endpoint (e.g., Node.js, PHP, or service like Formspree)
2. Update `js/main.js` around line 90:

```javascript
const response = await fetch('YOUR_BACKEND_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

**Quick Options:**
- **Formspree**: Add your email at formspree.io
- **EmailJS**: Free email service from emailjs.com
- **Netlify Forms**: If hosting on Netlify (add `netlify` attribute to form)

### 4. Launch the Website

#### Option A: Simple Local Testing
1. Double-click `index.html` to open in browser
2. Or use VS Code Live Server extension

#### Option B: Deploy to Web
Choose a hosting platform:

**Netlify (Recommended - Free)**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

**GitHub Pages (Free)**
1. Create GitHub repository
2. Push code to repository
3. Enable GitHub Pages in repository settings

**Traditional Web Hosting**
1. Upload all files via FTP
2. Ensure file structure is maintained

## Customization Guide

### Colors
Edit CSS variables in `css/styles.css` (lines 1-20):
```css
:root {
    --primary-color: #1a1a1a;      /* Dark theme color */
    --secondary-color: #8b7355;     /* Brand brown */
    --accent-color: #c9a87c;        /* Light gold accent */
}
```

### Fonts
Current fonts (Google Fonts):
- **Headings**: Playfair Display (elegant serif)
- **Body**: Inter (clean sans-serif)

To change fonts, update the Google Fonts link in `index.html` and CSS variables.

### Adding New Sections
1. Add HTML section with unique ID
2. Add corresponding CSS styles
3. Update navigation menu in `index.html`

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lightweight**: ~50KB total size (without images)
- **Fast Loading**: No framework overhead
- **Optimized**: Lazy loading images, efficient CSS
- **SEO-Friendly**: Semantic HTML, meta tags

## Future Enhancements

Consider adding:
- [ ] Blog section for thought leadership
- [ ] Event calendar integration
- [ ] Real-time auction results feed
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced analytics integration

## Support

For questions or issues:
- Review this README
- Check browser console for errors
- Ensure all files are uploaded correctly
- Verify image paths are correct

## License

This website is custom-built for Auction Uplift. All rights reserved.

---

**Built with care for exceptional fundraising success** 🎯
