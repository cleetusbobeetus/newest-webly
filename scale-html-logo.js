#!/usr/bin/env node

/**
 * HTML Logo and Text Scaling Script for Webly Industries
 * 
 * This script scales up the logo and text by 25% in HTML files only
 * 
 * Usage: node scale-html-logo.js
 */

const fs = require('fs');
const path = require('path');

// Scaling factor (25% increase = 1.25x)
const SCALE_FACTOR = 1.25;

// HTML files to update
const HTML_FILES = [
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
 * Update logo and text sizes in HTML content
 */
function updateHTMLLogoSizes(content) {
    let updatedContent = content;
    
    // Service page specific logo styles in HTML files
    const updates = [
        // Logo image height in service pages
        { pattern: /height:\s*([0-9.]+)px/g, replacer: (match, height) => `height: ${scaleValue(height)}` },
        
        // Logo text font size in service pages  
        { pattern: /font-size:\s*([0-9.]+)rem/g, replacer: (match, size) => `font-size: ${scaleRemValue(size)}` }
    ];
    
    // Apply all updates
    updates.forEach(update => {
        updatedContent = updatedContent.replace(update.pattern, update.replacer);
    });
    
    return updatedContent;
}

/**
 * Main function to update HTML files
 */
async function scaleHTMLLogoAndText() {
    console.log('🚀 Starting HTML logo and text scaling (25% increase)...\n');
    
    let updatedFiles = 0;
    let errorFiles = [];
    
    for (const filename of HTML_FILES) {
        try {
            console.log(`📄 Processing ${filename}...`);
            
            // Read the file
            const filePath = path.join(__dirname, filename);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Update logo sizes
            const updatedContent = updateHTMLLogoSizes(content);
            
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
    console.log('\n📊 HTML Scaling Summary:');
    console.log(`✅ Successfully updated: ${updatedFiles} files`);
    if (errorFiles.length > 0) {
        console.log(`❌ Errors in: ${errorFiles.length} files`);
        errorFiles.forEach(file => console.log(`   - ${file}`));
    }
    
    console.log('\n🎉 HTML logo and text scaling completed!');
    console.log('\n📏 Scaling details:');
    console.log('   • Logo image: 180px → 225px (25% increase)');
    console.log('   • Logo text: 1.8rem → 2.25rem (25% increase)');
    console.log('   • Responsive sizes also scaled proportionally');
}

// Run the script
if (require.main === module) {
    scaleHTMLLogoAndText().catch(console.error);
}

module.exports = {
    scaleHTMLLogoAndText,
    SCALE_FACTOR,
    scaleValue,
    scaleRemValue
};
