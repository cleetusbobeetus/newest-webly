# Webly Industries - React TypeScript Components

This directory contains reusable React TypeScript components for the Webly Industries website.

## Components

### Header
A responsive navigation header with mobile menu support.

**Props:**
- `currentPage?: string` - Current page identifier for active state
- `showGetStarted?: boolean` - Whether to show the "Get Started" button

**Usage:**
```tsx
import { Header } from './components';

<Header currentPage="home" showGetStarted={true} />
```

### Footer
A comprehensive footer with links, contact info, and social media.

**Props:**
- `currentPage?: string` - Current page identifier
- `tagline?: string` - Custom tagline text
- `showFullFooter?: boolean` - Whether to show the full footer or just bottom section

**Usage:**
```tsx
import { Footer } from './components';

<Footer 
  currentPage="home" 
  tagline="Built with cutting-edge technology"
  showFullFooter={true} 
/>
```

## Features

### Header Features
- ✅ Responsive design (desktop + mobile)
- ✅ Smooth scroll navigation
- ✅ Active page highlighting
- ✅ Mobile hamburger menu
- ✅ Scroll-based styling changes
- ✅ Accessible navigation

### Footer Features
- ✅ Multi-column layout
- ✅ Social media links
- ✅ Contact information
- ✅ Legal links
- ✅ Scroll to top button
- ✅ Responsive design
- ✅ Animated hover effects

## Installation

1. Install dependencies:
```bash
cd components
npm install
```

2. Build components:
```bash
npm run build
```

3. Type checking:
```bash
npm run type-check
```

## Development

Watch mode for development:
```bash
npm run dev
```

## Styling

Each component has its own CSS file:
- `Header.css` - Header component styles
- `Footer.css` - Footer component styles

The components use CSS custom properties (variables) that should be defined in your main CSS file:

```css
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --secondary: #ec4899;
  --accent: #06b6d4;
  --dark: #0f172a;
  --darker: #020617;
  --light: #f8fafc;
  --gray: #64748b;
  --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Integration

### With HTML Pages
Include the compiled JavaScript and CSS files in your HTML:

```html
<link rel="stylesheet" href="components/Header.css">
<link rel="stylesheet" href="components/Footer.css">
<script src="components/Header.js"></script>
<script src="components/Footer.js"></script>
```

### With React Applications
Import and use the components directly:

```tsx
import React from 'react';
import { Header, Footer } from './components';

function App() {
  return (
    <div>
      <Header currentPage="home" />
      <main>
        {/* Your content */}
      </main>
      <Footer currentPage="home" />
    </div>
  );
}
```

## Customization

### Header Customization
- Modify `Header.css` for styling changes
- Update navigation items in `Header.tsx`
- Add/remove mobile menu features

### Footer Customization
- Modify `Footer.css` for styling changes
- Update links and content in `Footer.tsx`
- Add/remove social media platforms
- Customize contact information

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

© 2024 Webly Industries. All rights reserved.
