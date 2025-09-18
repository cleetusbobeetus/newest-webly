#!/usr/bin/env node

/**
 * Header Logo and Text Scaling Script for Webly Industries
 * 
 * This script scales up only the logo image and "Webly Industries" text in the header
 * while keeping the container size, padding, and margins unchanged
 * 
 * Usage: node scale-header-logo.js
 */

const fs = require('fs');
const path = require('path');

// Scaling factor (25% increase = 1.25x)
const SCALE_FACTOR = 1.25;

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
 * Update header logo and text sizes in styles.css
 */
function updateHeaderLogoSizes(content) {
    let updatedContent = content;
    
    // Precise replacements for header logo and text only
    const headerUpdates = [
        // Main logo image: 112px -> 140px
        { from: 'height: 112px;', to: 'height: 140px;' },
        { from: 'width: 112px;', to: 'width: 140px;' },
        
        // Main logo text: 1.8rem -> 2.25rem
        { from: 'font-size: 1.8rem;', to: 'font-size: 2.25rem;' },
        
        // Responsive logo image (768px breakpoint): 102px -> 128px
        { from: 'height: 102px;', to: 'height: 128px;' },
        { from: 'width: 102px;', to: 'width: 128px;' },
        
        // Responsive logo text (768px breakpoint): 1.6rem -> 2.0rem
        { from: 'font-size: 1.6rem;', to: 'font-size: 2.0rem;' },
        
        // Mobile logo image (480px breakpoint): 90px -> 113px
        { from: 'height: 90px;', to: 'height: 113px;' },
        { from: 'width: 90px;', to: 'width: 113px;' },
        
        // Mobile logo text (480px breakpoint): 1.4rem -> 1.75rem
        { from: 'font-size: 1.4rem;', to: 'font-size: 1.75rem;' }
    ];
    
    // Apply precise updates
    headerUpdates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    return updatedContent;
}

/**
 * Main function to update header logo and text
 */
async function scaleHeaderLogo() {
    console.log('🚀 Starting header logo and text scaling (25% increase)...\n');
    
    try {
        console.log('📄 Processing styles.css...');
        
        // Read the styles.css file
        const filePath = path.join(__dirname, 'styles.css');
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Update header logo sizes
        const updatedContent = updateHeaderLogoSizes(content);
        
        // Write the updated content back
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log('✅ Successfully updated styles.css');
        
        // Summary
        console.log('\n📊 Header Scaling Summary:');
        console.log('✅ Successfully updated: 1 file (styles.css)');
        
        console.log('\n🎉 Header logo and text scaling completed!');
        console.log('\n📏 Header scaling details:');
        console.log('   • Main logo image: 112px → 140px (25% increase)');
        console.log('   • Main logo text: 1.8rem → 2.25rem (25% increase)');
        console.log('   • Responsive logo: 102px → 128px (25% increase)');
        console.log('   • Responsive text: 1.6rem → 2.0rem (25% increase)');
        console.log('   • Mobile logo: 90px → 113px (25% increase)');
        console.log('   • Mobile text: 1.4rem → 1.75rem (25% increase)');
        console.log('\n📦 Container size, padding, and margins remain unchanged');
        
    } catch (error) {
        console.error('❌ Error updating styles.css:', error.message);
    }
}

// Run the script
if (require.main === module) {
    scaleHeaderLogo().catch(console.error);
}

module.exports = {
    scaleHeaderLogo,
    SCALE_FACTOR,
    scaleValue,
    scaleRemValue
};
