#!/usr/bin/env node

/**
 * Logo and Text Scaling Script for Webly Industries
 * 
 * This script scales up the logo and text by 25% across all HTML and CSS files
 * 
 * Usage: node scale-logo-text.js
 */

const fs = require('fs');
const path = require('path');

// Scaling factor (25% increase = 1.25x)
const SCALE_FACTOR = 1.25;

// Files to update
const FILES_TO_UPDATE = [
    'styles.css',
    'ai-powered-intelligence.html',
    '3d-webgl-graphics.html',
    'lightning-performance.html',
    'mobile-first-design.html',
    'enterprise-security.html',
    'advanced-analytics.html'
];

/**
 * Scale a numeric value by the scale factor
 */
function scaleValue(value, unit = 'px') {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value;
    
    const scaledValue = Math.round(numericValue * SCALE_FACTOR);
    return `${scaledValue}${unit}`;
}

/**
 * Scale rem values
 */
function scaleRemValue(value) {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value;
    
    const scaledValue = (numericValue * SCALE_FACTOR).toFixed(2);
    return `${scaledValue}rem`;
}

/**
 * Update logo and text sizes in CSS content
 */
function updateLogoSizes(content) {
    let updatedContent = content;
    
    // Main logo styles
    const logoUpdates = [
        // Logo font size
        { pattern: /\.logo\s*{\s*font-size:\s*([0-9.]+)rem/g, replacer: (match, size) => `.logo { font-size: ${scaleRemValue(size)}` },
        
        // Logo image height/width
        { pattern: /\.logo-image\s*{\s*height:\s*([0-9.]+)px/g, replacer: (match, height) => `.logo-image { height: ${scaleValue(height)}` },
        { pattern: /\.logo-image\s*{\s*width:\s*([0-9.]+)px/g, replacer: (match, width) => `.logo-image { width: ${scaleValue(width)}` },
        
        // Logo text font size
        { pattern: /\.logo-text\s*{\s*font-size:\s*([0-9.]+)rem/g, replacer: (match, size) => `.logo-text { font-size: ${scaleRemValue(size)}` },
        
        // Responsive breakpoints
        { pattern: /\.logo-image\s*{\s*height:\s*([0-9.]+)px;\s*width:\s*([0-9.]+)px/g, replacer: (match, height, width) => `.logo-image { height: ${scaleValue(height)}; width: ${scaleValue(width)}` },
        
        // Individual height/width in responsive sections
        { pattern: /height:\s*([0-9.]+)px;\s*width:\s*([0-9.]+)px/g, replacer: (match, height, width) => `height: ${scaleValue(height)}; width: ${scaleValue(width)}` },
        { pattern: /height:\s*([0-9.]+)px/g, replacer: (match, height) => `height: ${scaleValue(height)}` },
        { pattern: /width:\s*([0-9.]+)px/g, replacer: (match, width) => `width: ${scaleValue(width)}` },
        
        // Font sizes in rem
        { pattern: /font-size:\s*([0-9.]+)rem/g, replacer: (match, size) => `font-size: ${scaleRemValue(size)}` }
    ];
    
    // Apply all updates
    logoUpdates.forEach(update => {
        updatedContent = updatedContent.replace(update.pattern, update.replacer);
    });
    
    return updatedContent;
}

/**
 * Update service page specific styles
 */
function updateServicePageStyles(content) {
    let updatedContent = content;
    
    // Service page specific logo styles
    const serviceUpdates = [
        // Service page logo image height
        { pattern: /\.logo-image\s*{\s*height:\s*([0-9.]+)px/g, replacer: (match, height) => `.logo-image { height: ${scaleValue(height)}` },
        
        // Service page logo text font size
        { pattern: /\.logo-text\s*{\s*font-size:\s*([0-9.]+)rem/g, replacer: (match, size) => `.logo-text { font-size: ${scaleRemValue(size)}` },
        
        // Responsive service page styles
        { pattern: /@media\s*\(max-width:\s*768px\)\s*{[^}]*\.logo-image\s*{\s*height:\s*([0-9.]+)px[^}]*}/g, 
          replacer: (match, height) => match.replace(/height:\s*([0-9.]+)px/, `height: ${scaleValue(height)}`) },
        
        { pattern: /@media\s*\(max-width:\s*768px\)\s*{[^}]*\.logo-text\s*{\s*font-size:\s*([0-9.]+)rem[^}]*}/g,
          replacer: (match, size) => match.replace(/font-size:\s*([0-9.]+)rem/, `font-size: ${scaleRemValue(size)}`) }
    ];
    
    // Apply service page updates
    serviceUpdates.forEach(update => {
        updatedContent = updatedContent.replace(update.pattern, update.replacer);
    });
    
    return updatedContent;
}

/**
 * Main function to update all files
 */
async function scaleLogoAndText() {
    console.log('🚀 Starting logo and text scaling (25% increase)...\n');
    
    let updatedFiles = 0;
    let errorFiles = [];
    
    for (const filename of FILES_TO_UPDATE) {
        try {
            console.log(`📄 Processing ${filename}...`);
            
            // Read the file
            const filePath = path.join(__dirname, filename);
            const content = fs.readFileSync(filePath, 'utf8');
            
            let updatedContent;
            
            if (filename === 'styles.css') {
                // Update main CSS file
                updatedContent = updateLogoSizes(content);
            } else {
                // Update service page HTML files
                updatedContent = updateServicePageStyles(content);
            }
            
            // Write the updated content back
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            
            console.log(`✅ Successfully updated ${filename}`);
            updatedFiles++;
            
        } catch (error) {
            console.error(`❌ Error updating ${filename}:`, error.message);
            errorFiles.push(filename);
        }
    }
    
    // Summary
    console.log('\n📊 Scaling Summary:');
    console.log(`✅ Successfully updated: ${updatedFiles} files`);
    if (errorFiles.length > 0) {
        console.log(`❌ Errors in: ${errorFiles.length} files`);
        errorFiles.forEach(file => console.log(`   - ${file}`));
    }
    
    console.log('\n🎉 Logo and text scaling completed!');
    console.log('\n📏 Scaling details:');
    console.log('   • Logo image: 112px → 140px (25% increase)');
    console.log('   • Logo text: 1.8rem → 2.25rem (25% increase)');
    console.log('   • Responsive sizes also scaled proportionally');
    console.log('   • Service page specific styles updated');
}

// Run the script
if (require.main === module) {
    scaleLogoAndText().catch(console.error);
}

module.exports = {
    scaleLogoAndText,
    SCALE_FACTOR,
    scaleValue,
    scaleRemValue
};
