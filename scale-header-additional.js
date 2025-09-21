#!/usr/bin/env node

/**
 * Additional Header Logo and Text Scaling Script for Webly Industries
 * 
 * This script scales up the logo image and "Webly Industries" text by another 25%
 * from their current values
 * 
 * Usage: node scale-header-additional.js
 */

const fs = require('fs');
const path = require('path');

// Additional scaling factor (25% increase from current values)
const ADDITIONAL_SCALE_FACTOR = 1.25;

/**
 * Scale a numeric value by the additional scale factor
 */
function scaleValue(value, unit = 'px') {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value;
    
    const scaledValue = Math.round(numericValue * ADDITIONAL_SCALE_FACTOR);
    return `${scaledValue}${unit}`;
}

/**
 * Scale rem values
 */
function scaleRemValue(value) {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value;
    
    const scaledValue = (numericValue * ADDITIONAL_SCALE_FACTOR).toFixed(2);
    return `${scaledValue}rem`;
}

/**
 * Update header logo and text sizes from current values
 */
function updateHeaderLogoSizesAdditional(content) {
    let updatedContent = content;
    
    // Scale from current values (140px -> 175px, 2.25rem -> 2.81rem, etc.)
    const headerUpdates = [
        // Main logo image: 140px -> 175px
        { from: 'height: 140px;', to: 'height: 175px;' },
        { from: 'width: 140px;', to: 'width: 175px;' },
        
        // Main logo text: 2.25rem -> 2.81rem
        { from: 'font-size: 2.25rem;', to: 'font-size: 2.81rem;' },
        
        // Responsive logo image (768px breakpoint): 128px -> 160px
        { from: 'height: 128px;', to: 'height: 160px;' },
        { from: 'width: 128px;', to: 'width: 160px;' },
        
        // Responsive logo text (768px breakpoint): 2.0rem -> 2.5rem
        { from: 'font-size: 2.0rem;', to: 'font-size: 2.5rem;' },
        
        // Mobile logo image (480px breakpoint): 113px -> 141px
        { from: 'height: 113px;', to: 'height: 141px;' },
        { from: 'width: 113px;', to: 'width: 141px;' },
        
        // Mobile logo text (480px breakpoint): 1.75rem -> 2.19rem
        { from: 'font-size: 1.75rem;', to: 'font-size: 2.19rem;' }
    ];
    
    // Apply precise updates
    headerUpdates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    return updatedContent;
}

/**
 * Main function to update header logo and text with additional scaling
 */
async function scaleHeaderLogoAdditional() {
    console.log('🚀 Starting additional header logo and text scaling (25% increase from current values)...\n');
    
    try {
        console.log('📄 Processing styles.css...');
        
        // Read the styles.css file
        const filePath = path.join(__dirname, 'styles.css');
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Update header logo sizes from current values
        const updatedContent = updateHeaderLogoSizesAdditional(content);
        
        // Write the updated content back
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log('✅ Successfully updated styles.css');
        
        // Summary
        console.log('\n📊 Additional Header Scaling Summary:');
        console.log('✅ Successfully updated: 1 file (styles.css)');
        
        console.log('\n🎉 Additional header logo and text scaling completed!');
        console.log('\n📏 Additional scaling details:');
        console.log('   • Main logo image: 140px → 175px (25% increase)');
        console.log('   • Main logo text: 2.25rem → 2.81rem (25% increase)');
        console.log('   • Responsive logo: 128px → 160px (25% increase)');
        console.log('   • Responsive text: 2.0rem → 2.5rem (25% increase)');
        console.log('   • Mobile logo: 113px → 141px (25% increase)');
        console.log('   • Mobile text: 1.75rem → 2.19rem (25% increase)');
        console.log('\n📦 Container size, padding, and margins remain unchanged');
        console.log('📈 Total increase from original: 56.25% (1.25 × 1.25)');
        
    } catch (error) {
        console.error('❌ Error updating styles.css:', error.message);
    }
}

// Run the script
if (require.main === module) {
    scaleHeaderLogoAdditional().catch(console.error);
}

module.exports = {
    scaleHeaderLogoAdditional,
    ADDITIONAL_SCALE_FACTOR,
    scaleValue,
    scaleRemValue
};
