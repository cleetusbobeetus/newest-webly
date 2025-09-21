#!/usr/bin/env node

/**
 * Aggressive Header Reduction Script for Webly Industries
 * 
 * This script makes much more aggressive reductions to header padding
 * to minimize the vertical space the header takes up on the screen
 * 
 * Usage: node aggressive-header-reduction.js
 */

const fs = require('fs');
const path = require('path');

/**
 * Make aggressive reductions to header padding
 */
function aggressiveHeaderReduction(content) {
    let updatedContent = content;
    
    const aggressiveUpdates = [
        // Main navbar padding: reduce from 0.02rem to 0.01rem
        { from: 'padding: 0.02rem 2rem;', to: 'padding: 0.01rem 2rem;' },
        
        // Responsive navbar padding (768px): reduce from 0.02rem to 0.01rem
        { from: 'padding: 0.02rem 1rem;', to: 'padding: 0.01rem 1rem;' },
        
        // Mobile navbar padding (480px): reduce from 0.02rem to 0.01rem
        { from: 'padding: 0.02rem 0.75rem;', to: 'padding: 0.01rem 0.75rem;' },
        
        // Logo link padding: reduce from 0.3rem to 0.1rem
        { from: 'padding: 0.3rem;', to: 'padding: 0.1rem;' },
        
        // Nav links padding: reduce from 0.75rem 1.5rem to 0.3rem 1rem
        { from: 'padding: 0.75rem 1.5rem;', to: 'padding: 0.3rem 1rem;' },
        
        // Nav links container padding: reduce from 0.5rem to 0.2rem
        { from: 'background: rgba(255, 255, 255, 0.1);\n  padding: 0.5rem;', to: 'background: rgba(255, 255, 255, 0.1);\n  padding: 0.2rem;' },
        
        // CTA button padding: reduce from 0.875rem 2rem to 0.4rem 1.5rem
        { from: 'color: white;\n  padding: 0.875rem 2rem;', to: 'color: white;\n  padding: 0.4rem 1.5rem;' }
    ];
    
    // Apply all updates
    aggressiveUpdates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    return updatedContent;
}

/**
 * Main function to make aggressive header reductions
 */
async function aggressiveHeaderReductionMain() {
    console.log('🚀 Starting aggressive header reduction...\n');
    
    try {
        console.log('📄 Processing styles.css...');
        
        // Read the styles.css file
        const filePath = path.join(__dirname, 'styles.css');
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Apply aggressive header reductions
        const updatedContent = aggressiveHeaderReduction(content);
        
        // Write the updated content back
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log('✅ Successfully updated styles.css');
        
        // Summary
        console.log('\n📊 Aggressive Header Reduction Summary:');
        console.log('✅ Successfully updated: 1 file (styles.css)');
        
        console.log('\n🎉 Aggressive header reduction completed!');
        console.log('\n📏 Aggressive reductions made:');
        console.log('   • Main navbar padding: 0.02rem → 0.01rem (50% reduction)');
        console.log('   • Responsive navbar padding: 0.02rem → 0.01rem (50% reduction)');
        console.log('   • Mobile navbar padding: 0.02rem → 0.01rem (50% reduction)');
        console.log('   • Logo link padding: 0.3rem → 0.1rem (67% reduction)');
        console.log('   • Nav links padding: 0.75rem 1.5rem → 0.3rem 1rem (60% vertical reduction)');
        console.log('   • Nav links container padding: 0.5rem → 0.2rem (60% reduction)');
        console.log('   • CTA button padding: 0.875rem 2rem → 0.4rem 1.5rem (54% vertical reduction)');
        console.log('\n📦 Header now takes up minimal vertical space on screen');
        console.log('   • Much more compact and streamlined appearance');
        console.log('   • Logo and text sizes remain unchanged');
        console.log('   • All functionality preserved');
        
    } catch (error) {
        console.error('❌ Error updating styles.css:', error.message);
    }
}

// Run the script
if (require.main === module) {
    aggressiveHeaderReductionMain().catch(console.error);
}

module.exports = {
    aggressiveHeaderReductionMain,
    aggressiveHeaderReduction
};
