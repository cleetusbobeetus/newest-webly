# 🚀 Webly Industries - Page Template System

## Overview
This template system allows you to create and maintain consistent service pages across your website. When you make changes to the template, you can easily regenerate all pages with the updated design.

## Files Structure

```
├── page-template.html          # Main template file
├── page-config.js             # Configuration for all pages
├── build-pages.js             # Node.js build script
├── page-generator.html        # Browser-based page generator
└── TEMPLATE-SYSTEM.md         # This documentation
```

## How It Works

### 1. Template System
- **`page-template.html`**: Contains the HTML structure with placeholders like `{{PAGE_TITLE}}`
- **`page-config.js`**: Contains all the data for each page
- **Placeholders**: Template uses `{{VARIABLE_NAME}}` syntax for dynamic content

### 2. Page Generation
- **Node.js Method**: Use `build-pages.js` for command-line generation
- **Browser Method**: Use `page-generator.html` for visual page creation

## Quick Start

### Method 1: Browser-Based Generator (Recommended)
1. Open `page-generator.html` in your browser
2. Fill in the form fields
3. Click "Generate Page" to download the HTML file
4. Click "Preview Page" to see how it looks

### Method 2: Node.js Build Script
1. Install Node.js if you haven't already
2. Run: `node build-pages.js` (generates all pages)
3. Or: `node build-pages.js ai-powered-intelligence` (generates specific page)

## Template Variables

### Required Variables
- `PAGE_TITLE`: Main page title
- `PAGE_SUBTITLE`: Page subtitle
- `PAGE_DESCRIPTION`: Meta description
- `SERVICE_ICON`: Emoji icon for the service
- `HERO_SUBTITLE`: Hero section subtitle
- `MAIN_HEADING`: Main content heading
- `LEAD_PARAGRAPH`: Main description paragraph

### Optional Variables
- `PAGE_KEYWORDS`: SEO keywords
- `PAGE_URL`: URL slug
- `PAGE_IMAGE`: Image filename prefix
- `FEATURES_GRID`: HTML for features section
- `ADDITIONAL_SECTIONS`: Extra content sections
- `PRICING_OPTIONS`: HTML for pricing section
- `CTA_HEADING`: Call-to-action heading
- `CTA_DESCRIPTION`: Call-to-action description
- `CONTACT_HEADING`: Contact section heading
- `CONTACT_SUBTITLE`: Contact section subtitle
- `FOOTER_TAGLINE`: Footer tagline

## Adding New Pages

### Using Browser Generator
1. Open `page-generator.html`
2. Fill in all the form fields
3. Click "Generate Page"
4. Save the downloaded file to your website

### Using Configuration File
1. Open `page-config.js`
2. Add a new page configuration object
3. Run `node build-pages.js` to generate all pages
4. Or run `node build-pages.js your-page-key` for specific page

### Example Configuration
```javascript
'your-new-service': {
    PAGE_TITLE: 'Your New Service',
    PAGE_SUBTITLE: 'Service Subtitle',
    PAGE_DESCRIPTION: 'Service description for SEO...',
    PAGE_KEYWORDS: 'keyword1, keyword2, keyword3',
    PAGE_URL: 'your-new-service.html',
    PAGE_IMAGE: 'your-new-service',
    SERVICE_ICON: '🎯',
    HERO_SUBTITLE: 'Your hero subtitle...',
    MAIN_HEADING: 'Your main heading...',
    LEAD_PARAGRAPH: 'Your lead paragraph...',
    // ... add more variables as needed
}
```

## Updating Existing Pages

### Method 1: Update Template
1. Edit `page-template.html` to change the structure
2. Run `node build-pages.js` to regenerate all pages
3. All pages will have the new structure

### Method 2: Update Individual Page
1. Edit the specific page configuration in `page-config.js`
2. Run `node build-pages.js your-page-key`
3. Only that page will be regenerated

## Template Features

### SEO Optimization
- Complete meta tags (title, description, keywords)
- Open Graph tags for social media
- Twitter Card optimization
- Canonical URLs
- JSON-LD structured data

### Performance
- Preconnect to external domains
- Optimized resource loading
- Mobile-first responsive design
- PWA capabilities

### Consistency
- Uniform navigation
- Consistent styling
- Standardized contact forms
- Unified footer

## Best Practices

### 1. Content Guidelines
- Keep titles under 60 characters for SEO
- Write compelling meta descriptions (150-160 characters)
- Use relevant keywords naturally
- Include clear call-to-actions

### 2. Technical Guidelines
- Always test generated pages in browser
- Validate HTML before deploying
- Check mobile responsiveness
- Test contact forms

### 3. Maintenance
- Update template when making design changes
- Regenerate all pages after template updates
- Keep configuration data up-to-date
- Regular SEO audits

## Troubleshooting

### Common Issues
1. **Placeholder not replaced**: Check variable name spelling
2. **Page not generated**: Verify configuration syntax
3. **Styling issues**: Ensure `styles.css` is linked correctly
4. **Form not working**: Check Formspree configuration

### Debug Tips
- Use browser developer tools to inspect generated pages
- Check console for JavaScript errors
- Validate HTML using online validators
- Test on multiple devices and browsers

## Advanced Usage

### Custom Sections
Add custom HTML to the `ADDITIONAL_SECTIONS` variable:
```javascript
ADDITIONAL_SECTIONS: `
    <div class="custom-section">
        <h3>Custom Content</h3>
        <p>Your custom content here...</p>
    </div>
`
```

### Dynamic Pricing
Customize pricing options in the `PRICING_OPTIONS` variable:
```javascript
PRICING_OPTIONS: `
    <div class="pricing-option">
        <h4>Custom Package</h4>
        <div class="price">$999<span>/month</span></div>
        <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
        </ul>
        <a href="index.html#contact" class="btn-primary">Get Started</a>
    </div>
`
```

## Support

For questions or issues with the template system:
- **Email**: ZaneLaFaver@gmail.com
- **Phone**: +1 (385) 253-2721
- **Website**: https://weblyindustries.com

---

*This template system is designed to make your website maintenance easier and more efficient. Happy building! 🚀*
