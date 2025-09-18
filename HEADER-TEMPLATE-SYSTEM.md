# 🎯 Webly Industries - Header Template System

## Overview
This system ensures all sublink pages have a consistent header that matches the main page design. The header template has been extracted from `index.html` and standardized across all service pages.

## Files Created

### 📁 Core Files
- **`header-template.html`** - The standardized header template
- **`update-headers.js`** - Script to update all pages with the new header
- **`HEADER-TEMPLATE-SYSTEM.md`** - This documentation

### 📄 Updated Pages
All the following sublink pages now use the standardized header:
- `ai-powered-intelligence.html`
- `3d-webgl-graphics.html`
- `lightning-performance.html`
- `mobile-first-design.html`
- `enterprise-security.html`
- `advanced-analytics.html`

## Header Template Features

### 🎨 Consistent Design
- **Logo**: Webly Industries logo with proper linking to main page
- **Navigation**: Home, Process, Features, Pricing, Contact links
- **CTA Button**: "Get Started" button linking to contact section
- **Responsive**: Mobile-friendly navigation with hamburger menu

### 🔗 Proper Linking
- **Logo Link**: Points to `index.html` (main page)
- **Navigation Links**: All point to `index.html#section` for proper navigation
- **CTA Button**: Links to `index.html#contact` for lead generation

### 📱 Mobile Optimization
- Responsive design that works on all devices
- Mobile menu with smooth animations
- Touch-friendly navigation elements

## How to Use

### 🔄 Updating All Headers
To update all sublink pages with the latest header template:

```bash
node update-headers.js
```

This script will:
1. Create backup files for safety
2. Update all sublink pages with the standardized header
3. Provide a summary of successful updates

### 📝 Manual Updates
If you need to update the header template manually:

1. **Edit the template**: Modify `header-template.html`
2. **Run the update script**: `node update-headers.js`
3. **Verify changes**: Check that all pages have the updated header

### 🆕 Adding New Pages
When creating new sublink pages:

1. **Copy the header**: Use the content from `header-template.html`
2. **Paste into new page**: Insert after the `<body>` tag
3. **Verify links**: Ensure all navigation links work correctly

## Header Structure

```html
<!-- Navigation -->
<nav class="navbar">
    <div class="nav-container">
        <div class="logo">
            <a href="index.html">
                <img src="Public/Images/webly logo.png" alt="Webly Industries" class="logo-image">
                <span class="logo-text">Webly Industries</span>
            </a>
        </div>
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="index.html#process">Process</a></li>
            <li><a href="index.html#features">Features</a></li>
            <li><a href="index.html#pricing">Pricing</a></li>
            <li><a href="index.html#contact">Contact</a></li>
        </ul>
        <a href="index.html#contact" class="cta-button">Get Started</a>
    </div>
</nav>
```

## Benefits

### ✅ Consistency
- All pages now have identical header design
- Unified user experience across the website
- Professional, cohesive brand presentation

### ✅ Maintenance
- Single source of truth for header design
- Easy to update all pages simultaneously
- Reduced maintenance overhead

### ✅ SEO & UX
- Consistent navigation structure
- Proper internal linking
- Improved user journey and site structure

## Backup System

The update script automatically creates backup files with timestamps:
- Format: `filename.html.backup.timestamp`
- Location: Same directory as original files
- Purpose: Safety net in case rollback is needed

## Future Updates

When you need to update the header design:

1. **Modify the main page**: Update `index.html` header first
2. **Extract the new template**: Copy the updated header
3. **Update the template file**: Replace content in `header-template.html`
4. **Run the update script**: `node update-headers.js`
5. **Test the changes**: Verify all pages display correctly

## Troubleshooting

### ❌ Update Script Issues
- **File not found**: Ensure all HTML files exist in the project directory
- **Permission errors**: Check file write permissions
- **Backup creation fails**: Verify disk space and permissions

### 🔧 Manual Fixes
If the script fails, you can manually copy the header from `header-template.html` and paste it into the affected pages.

## Support

For issues with the header template system:
1. Check the backup files for the original content
2. Verify the `header-template.html` file is correct
3. Run the update script again if needed
4. Contact the development team for assistance

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Status**: ✅ Active and Maintained
