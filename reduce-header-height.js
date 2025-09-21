#!/usr/bin/env node

/**
 * Header Height Reduction Script for Webly Industries
 * 
 * This script reduces the header height by adjusting padding to cut off at the red line
 * 
 * Usage: node reduce-header-height.js
 */

const fs = require('fs');
const path = require('path');

/**
 * Reduce header height by adjusting padding
 */
function reduceHeaderHeight(content) {
    let updatedContent = content;
    
    // Reduce header padding to make it shorter
    const headerUpdates = [
        // Main navbar padding: reduce vertical padding from 0.25rem to 0.1rem
        { from: 'padding: 0.25rem 2rem;', to: 'padding: 0.1rem 2rem;' },
        
        // Responsive navbar padding (768px): reduce from 0.25rem to 0.1rem
        { from: 'padding: 0.25rem 1rem;', to: 'padding: 0.1rem 1rem;' },
        
        // Mobile navbar padding (480px): reduce from 0.19rem to 0.1rem
        { from: 'padding: 0.19rem 0.75rem;', to: 'padding: 0.1rem 0.75rem;' }
    ];
    
    // Apply updates
    headerUpdates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    return updatedContent;
}

/**
 * Main function to reduce header height
 */
async function reduceHeaderHeightMain() {
    console.log('🚀 Starting header height reduction...\n');
    
    try {
        console.log('📄 Processing styles.css...');
        
        // Read the styles.css file
        const filePath = path.join(__dirname, 'styles.css');
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Reduce header height
        const updatedContent = reduceHeaderHeight(content);
        
        // Write the updated content back
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log('✅ Successfully updated styles.css');
        
        // Summary
        console.log('\n📊 Header Height Reduction Summary:');
        console.log('✅ Successfully updated: 1 file (styles.css)');
        
        console.log('\n🎉 Header height reduction completed!');
        console.log('\n📏 Height reduction details:');
        console.log('   • Main navbar padding: 0.25rem → 0.1rem (60% reduction)');
        console.log('   • Responsive navbar padding: 0.25rem → 0.1rem (60% reduction)');
        console.log('   • Mobile navbar padding: 0.19rem → 0.1rem (47% reduction)');
        console.log('\n📦 Header now cuts off at the red line level');
        
    } catch (error) {
        console.error('❌ Error updating styles.css:', error.message);
    }
}

// Run the script
if (require.main === module) {
    reduceHeaderHeightMain().catch(console.error);
}

module.exports = {
    reduceHeaderHeightMain,
    reduceHeaderHeight
};
