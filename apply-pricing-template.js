#!/usr/bin/env node

/**
 * Apply Pricing Template Script for Webly Industries
 * 
 * This script applies the current 4-card pricing layout template
 * to all sublink pages, removing Enterprise option and updating CSS
 * 
 * Usage: node apply-pricing-template.js
 */

const fs = require('fs');
const path = require('path');

// Sublink pages that need pricing template updates
const SUBLINK_PAGES = [
    'ai-powered-intelligence.html',
    '3d-webgl-graphics.html',
    'lightning-performance.html',
    'mobile-first-design.html',
    'enterprise-security.html',
    'advanced-analytics.html'
];

/**
 * Remove Enterprise pricing option from HTML content
 */
function removeEnterpriseOption(content) {
    let updatedContent = content;
    
    // Remove Enterprise pricing card (look for the pattern with pricing-option class)
    const enterpriseCardPattern = /<div class="pricing-option fade-in">\s*<h3 class="pricing-title">Enterprise<\/h3>[\s\S]*?<\/div>\s*<\/div>/g;
    updatedContent = updatedContent.replace(enterpriseCardPattern, '');
    
    return updatedContent;
}

/**
 * Update CSS for 4-card layout in sublink pages
 */
function updatePricingCSS(content) {
    let updatedContent = content;
    
    const cssUpdates = [
        // Update pricing-options grid to work with 4 cards
        { 
            from: 'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));', 
            to: 'grid-template-columns: repeat(4, 1fr);' 
        },
        
        // Reduce gap for better fit
        { 
            from: 'gap: 2rem;', 
            to: 'gap: 1rem;' 
        },
        
        // Update pricing-option constraints
        { 
            from: 'max-width: 350px;', 
            to: 'max-width: 100%;' 
        },
        
        { 
            from: 'min-width: 300px;', 
            to: 'min-width: 0;' 
        }
    ];
    
    // Apply CSS updates
    cssUpdates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    // Update responsive breakpoints for sublink pages
    const responsiveUpdates = [
        {
            from: `@media (max-width: 1200px) {
        .pricing-options {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
        }
    }

    @media (max-width: 1024px) {
        .pricing-options {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }
    }`,
            to: `@media (max-width: 1200px) {
        .pricing-options {
            max-width: 1200px;
            gap: 0.8rem;
        }
    }

    @media (max-width: 1024px) {
        .pricing-options {
            grid-template-columns: repeat(2, 1fr);
            max-width: 800px;
            gap: 1.5rem;
        }
    }

    @media (max-width: 768px) {
        .pricing-options {
            grid-template-columns: 1fr;
            max-width: 400px;
            gap: 2rem;
        }
    }`
        }
    ];
    
    // Apply responsive updates
    responsiveUpdates.forEach(update => {
        updatedContent = updatedContent.replace(update.from, update.to);
    });
    
    return updatedContent;
}

/**
 * Update a single HTML file with the pricing template
 */
function updateHTMLFile(filePath) {
    try {
        console.log(`📄 Processing ${path.basename(filePath)}...`);
        
        // Read the file
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Remove Enterprise option
        let updatedContent = removeEnterpriseOption(content);
        
        // Update CSS for 4-card layout
        updatedContent = updatePricingCSS(updatedContent);
        
        // Write the updated content back
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log(`✅ Successfully updated ${path.basename(filePath)}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error updating ${path.basename(filePath)}:`, error.message);
        return false;
    }
}

/**
 * Main function to apply pricing template to all sublink pages
 */
async function applyPricingTemplateMain() {
    console.log('🚀 Starting pricing template application to all sublink pages...\n');
    
    let updatedFiles = 0;
    let errorFiles = [];
    
    for (const filename of SUBLINK_PAGES) {
        const filePath = path.join(__dirname, filename);
        
        if (fs.existsSync(filePath)) {
            const success = updateHTMLFile(filePath);
            if (success) {
                updatedFiles++;
            } else {
                errorFiles.push(filename);
            }
        } else {
            console.log(`⚠️  File not found: ${filename}`);
            errorFiles.push(filename);
        }
    }
    
    // Summary
    console.log('\n📊 Pricing Template Application Summary:');
    console.log(`✅ Successfully updated: ${updatedFiles} files`);
    if (errorFiles.length > 0) {
        console.log(`❌ Errors in: ${errorFiles.length} files`);
        errorFiles.forEach(file => console.log(`   - ${file}`));
    }
    
    console.log('\n🎉 Pricing template application completed!');
    console.log('\n📏 Changes applied to all sublink pages:');
    console.log('   • Removed Enterprise pricing option');
    console.log('   • Updated grid to display 4 cards in one row');
    console.log('   • Reduced gap from 2rem to 1rem for better fit');
    console.log('   • Updated card constraints (max-width: 100%, min-width: 0)');
    console.log('   • Updated responsive breakpoints for optimal scaling');
    console.log('\n📦 All sublink pages now use the same 4-card pricing template');
    console.log('   • Desktop (1200px+): 4 cards in one row');
    console.log('   • Tablet (768px-1024px): 2 cards per row');
    console.log('   • Mobile (768px and below): 1 card per row');
}

// Run the script
if (require.main === module) {
    applyPricingTemplateMain().catch(console.error);
}

module.exports = {
    applyPricingTemplateMain,
    removeEnterpriseOption,
    updatePricingCSS,
    updateHTMLFile
};
