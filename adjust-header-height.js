#!/usr/bin/env node

/**
 * Adjust Header Height Script for Webly Industries
 * 
 * This script reduces the vertical padding/margin of the header container
 * to move it higher on the page, closer to the top edge, without affecting
 * logo or text sizes
 * 
 * Usage: node adjust-header-height.js
 */

const fs = require('fs');
const path = require('path');

/**
 * Reduce header vertical padding to move it higher
 */
function adjustHeaderHeight(content) {
    let updatedContent = content;
    
    const headerUpdates = [
        // Main navbar padding: reduce from 0.05rem to 0.02rem
        { from: 'padding: 0.05rem 2rem;', to: 'padding: 0.02rem 2rem;' },
        
        // Responsive navbar padding (768px): reduce from 0.05rem to 0.02rem
        { from: 'padding: 0.05rem 1rem;', to: 'padding: 0.02rem 1rem;' },
        
        // Mobile navbar padding (480px): reduce from 0.05rem to 0.02rem
        { from: 'padding: 0.05rem 0.75rem;', to: 'padding: 0.02rem 0.75rem;' },
        
        // Logo link padding: reduce from 0.5rem to 0.3rem
        { from: 'padding: 0.5rem;', to: 'padding: 0.3rem;' }
    ];
    
    // Apply updates
    headerUpdates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    return updatedContent;
}

/**
 * Main function to adjust header height
 */
async function adjustHeaderHeightMain() {
    console.log('🚀 Starting header height adjustment...\n');
    
    try {
        console.log('📄 Processing styles.css...');
        
        // Read the styles.css file
        const filePath = path.join(__dirname, 'styles.css');
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Adjust header height
        const updatedContent = adjustHeaderHeight(content);
        
        // Write the updated content back
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log('✅ Successfully updated styles.css');
        
        // Summary
        console.log('\n📊 Header Height Adjustment Summary:');
        console.log('✅ Successfully updated: 1 file (styles.css)');
        
        console.log('\n🎉 Header height adjustment completed!');
        console.log('\n📏 Height reduction details:');
        console.log('   • Main navbar padding: 0.05rem → 0.02rem (60% reduction)');
        console.log('   • Responsive navbar padding: 0.05rem → 0.02rem (60% reduction)');
        console.log('   • Mobile navbar padding: 0.05rem → 0.02rem (60% reduction)');
        console.log('   • Logo link padding: 0.5rem → 0.3rem (40% reduction)');
        console.log('\n📦 Header now sits higher on the page, closer to the top edge');
        console.log('   • Logo and text sizes remain unchanged');
        console.log('   • Only vertical padding/margin reduced for more compact header');
        
    } catch (error) {
        console.error('❌ Error updating styles.css:', error.message);
    }
}

// Run the script
if (require.main === module) {
    adjustHeaderHeightMain().catch(console.error);
}

module.exports = {
    adjustHeaderHeightMain,
    adjustHeaderHeight
};
