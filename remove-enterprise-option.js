#!/usr/bin/env node

/**
 * Remove Enterprise Option Script for Webly Industries
 * 
 * This script removes the Enterprise pricing option from the website
 * and optimizes the layout for 4 pricing cards instead of 5
 * 
 * Usage: node remove-enterprise-option.js
 */

const fs = require('fs');
const path = require('path');

/**
 * Remove Enterprise option from HTML
 */
function removeEnterpriseOption(content) {
    let updatedContent = content;
    
    // Remove Enterprise pricing card
    const enterpriseCardPattern = /<div class="pricing-card fade-in">\s*<h3 class="pricing-title">Enterprise<\/h3>[\s\S]*?<\/div>\s*<\/div>/g;
    updatedContent = updatedContent.replace(enterpriseCardPattern, '');
    
    // Remove Enterprise option from contact form
    updatedContent = updatedContent.replace(/<option value="enterprise">Enterprise Package<\/option>\s*/g, '');
    
    // Remove Enterprise from JSON-LD structured data
    const enterpriseOfferPattern = /{\s*"@type": "Offer",\s*"itemOffered": {\s*"@type": "Service",\s*"name": "Enterprise Package",[\s\S]*?},\s*"price": "19999",\s*"priceCurrency": "USD"\s*},?\s*/g;
    updatedContent = updatedContent.replace(enterpriseOfferPattern, '');
    
    // Fix trailing comma in JSON-LD
    updatedContent = updatedContent.replace(/},\s*\]/g, '}');
    
    return updatedContent;
}

/**
 * Update CSS for 4-card layout
 */
function updateCSSForFourCards(content) {
    let updatedContent = content;
    
    const cssUpdates = [
        // Update grid to work better with 4 cards
        { 
            from: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));', 
            to: 'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));' 
        },
        
        // Increase gap for better spacing
        { 
            from: 'gap: 1.2rem;', 
            to: 'gap: 1.5rem;' 
        },
        
        // Reduce max-width since we have fewer cards
        { 
            from: 'max-width: 1400px;', 
            to: 'max-width: 1200px;' 
        },
        
        // Update card constraints
        { 
            from: 'max-width: 320px;\n    min-width: 280px;', 
            to: 'max-width: 350px;\n    min-width: 300px;' 
        }
    ];
    
    // Apply CSS updates
    cssUpdates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    return updatedContent;
}

/**
 * Main function to remove Enterprise option
 */
async function removeEnterpriseOptionMain() {
    console.log('🚀 Starting Enterprise option removal...\n');
    
    try {
        // Update HTML file
        console.log('📄 Processing index.html...');
        const htmlPath = path.join(__dirname, 'index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        const updatedHtmlContent = removeEnterpriseOption(htmlContent);
        fs.writeFileSync(htmlPath, updatedHtmlContent, 'utf8');
        console.log('✅ Successfully updated index.html');
        
        // Update CSS file
        console.log('📄 Processing styles.css...');
        const cssPath = path.join(__dirname, 'styles.css');
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        const updatedCssContent = updateCSSForFourCards(cssContent);
        fs.writeFileSync(cssPath, updatedCssContent, 'utf8');
        console.log('✅ Successfully updated styles.css');
        
        // Summary
        console.log('\n📊 Enterprise Removal Summary:');
        console.log('✅ Successfully updated: 2 files (index.html, styles.css)');
        
        console.log('\n🎉 Enterprise option removal completed!');
        console.log('\n📏 Changes made:');
        console.log('   • Removed Enterprise pricing card from HTML');
        console.log('   • Removed Enterprise option from contact form dropdown');
        console.log('   • Removed Enterprise from JSON-LD structured data');
        console.log('   • Updated CSS grid for optimal 4-card layout');
        console.log('   • Increased card minimum width to 300px');
        console.log('   • Increased card maximum width to 350px');
        console.log('   • Optimized responsive breakpoints for 4 cards');
        console.log('\n📦 Pricing section now displays 4 cards optimally');
        
    } catch (error) {
        console.error('❌ Error updating files:', error.message);
    }
}

// Run the script
if (require.main === module) {
    removeEnterpriseOptionMain().catch(console.error);
}

module.exports = {
    removeEnterpriseOptionMain,
    removeEnterpriseOption,
    updateCSSForFourCards
};
