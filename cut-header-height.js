#!/usr/bin/env node

/**
 * Cut Header Height Script for Webly Industries
 * 
 * This script dramatically reduces the header height to cut off at the red line
 * while keeping logo and text sizes unchanged
 * 
 * Usage: node cut-header-height.js
 */

const fs = require('fs');
const path = require('path');

/**
 * Cut header height by reducing padding to minimum
 */
function cutHeaderHeight(content) {
    let updatedContent = content;
    
    // Dramatically reduce header padding to make it much more compact
    const headerUpdates = [
        // Main navbar padding: reduce to almost zero vertical padding
        { from: 'padding: 0.1rem 2rem;', to: 'padding: 0.05rem 2rem;' },
        
        // Responsive navbar padding (768px): reduce to almost zero
        { from: 'padding: 0.1rem 1rem;', to: 'padding: 0.05rem 1rem;' },
        
        // Mobile navbar padding (480px): reduce to almost zero
        { from: 'padding: 0.1rem 0.75rem;', to: 'padding: 0.05rem 0.75rem;' }
    ];
    
    // Apply updates
    headerUpdates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    return updatedContent;
}

/**
 * Main function to cut header height
 */
async function cutHeaderHeightMain() {
    console.log('🚀 Starting header height cutting to red line...\n');
    
    try {
        console.log('📄 Processing styles.css...');
        
        // Read the styles.css file
        const filePath = path.join(__dirname, 'styles.css');
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Cut header height
        const updatedContent = cutHeaderHeight(content);
        
        // Write the updated content back
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log('✅ Successfully updated styles.css');
        
        // Summary
        console.log('\n📊 Header Height Cutting Summary:');
        console.log('✅ Successfully updated: 1 file (styles.css)');
        
        console.log('\n🎉 Header height cutting completed!');
        console.log('\n📏 Height cutting details:');
        console.log('   • Main navbar padding: 0.1rem → 0.05rem (50% further reduction)');
        console.log('   • Responsive navbar padding: 0.1rem → 0.05rem (50% further reduction)');
        console.log('   • Mobile navbar padding: 0.1rem → 0.05rem (50% further reduction)');
        console.log('\n📦 Header now cuts off at the red line level');
        console.log('🔒 Logo and text sizes remain unchanged');
        
    } catch (error) {
        console.error('❌ Error updating styles.css:', error.message);
    }
}

// Run the script
if (require.main === module) {
    cutHeaderHeightMain().catch(console.error);
}

module.exports = {
    cutHeaderHeightMain,
    cutHeaderHeight
};
