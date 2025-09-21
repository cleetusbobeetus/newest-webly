#!/usr/bin/env node

/**
 * Precise Logo and Text Scaling Script for Webly Industries
 * 
 * This script precisely scales up the logo and text by 25% in HTML files
 * 
 * Usage: node scale-logo-precise.js
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
 * Update logo and text sizes in HTML content with precise targeting
 */
function updateLogoSizesPrecise(content) {
    let updatedContent = content;
    
    // Precise replacements for specific logo values
    const preciseUpdates = [
        // Logo image height: 180px -> 225px
        { from: 'height: 180px', to: 'height: 225px' },
        
        // Logo text font size: 1.8rem -> 2.25rem
        { from: 'font-size: 1.8rem', to: 'font-size: 2.25rem' },
        
        // Responsive logo image height: 150px -> 187px (rounded to 188px)
        { from: 'height: 150px', to: 'height: 188px' },
        
        // Responsive logo text font size: 1.5rem -> 1.88rem (rounded to 1.9rem)
        { from: 'font-size: 1.5rem', to: 'font-size: 1.9rem' }
    ];
    
    // Apply precise updates
    preciseUpdates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    return updatedContent;
}

/**
 * Main function to update HTML files
 */
async function scaleLogosPrecise() {
    console.log('🚀 Starting precise logo and text scaling (25% increase)...\n');
    
    let updatedFiles = 0;
    let errorFiles = [];
    
    for (const filename of HTML_FILES) {
        try {
            console.log(`📄 Processing ${filename}...`);
            
            // Read the file
            const filePath = path.join(__dirname, filename);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Update logo sizes with precise targeting
            const updatedContent = updateLogoSizesPrecise(content);
            
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
    console.log('\n📊 Precise Scaling Summary:');
    console.log(`✅ Successfully updated: ${updatedFiles} files`);
    if (errorFiles.length > 0) {
        console.log(`❌ Errors in: ${errorFiles.length} files`);
        errorFiles.forEach(file => console.log(`   - ${file}`));
    }
    
    console.log('\n🎉 Precise logo and text scaling completed!');
    console.log('\n📏 Precise scaling details:');
    console.log('   • Logo image: 180px → 225px (25% increase)');
    console.log('   • Logo text: 1.8rem → 2.25rem (25% increase)');
    console.log('   • Responsive logo: 150px → 188px (25% increase)');
    console.log('   • Responsive text: 1.5rem → 1.9rem (25% increase)');
}

// Run the script
if (require.main === module) {
    scaleLogosPrecise().catch(console.error);
}

module.exports = {
    scaleLogosPrecise,
    SCALE_FACTOR,
    scaleValue,
    scaleRemValue
};
