#!/usr/bin/env node

/**
 * Pricing Layout Update Script
 * Updates all sublink pages to use the new horizontal pricing layout
 */

const fs = require('fs');
const path = require('path');

// List of sublink pages that need pricing layout updates
const sublinkPages = [
    'ai-powered-intelligence.html',
    '3d-webgl-graphics.html',
    'lightning-performance.html',
    'mobile-first-design.html',
    'enterprise-security.html',
    'advanced-analytics.html'
];

// Function to remove conflicting pricing CSS from sublink pages
function removeConflictingPricingCSS(content) {
    // Remove the inline pricing-options CSS that conflicts with main styles.css
    const pricingOptionsPattern = /\.pricing-options\s*\{[^}]*\}/g;
    const updatedContent = content.replace(pricingOptionsPattern, '');
    
    // Also remove any responsive pricing-options overrides
    const responsivePricingPattern = /\.pricing-options\s*\{[^}]*grid-template-columns:[^}]*\}/g;
    const finalContent = updatedContent.replace(responsivePricingPattern, '');
    
    return finalContent;
}

// Function to update pricing layout in a file
function updatePricingLayoutInFile(filePath) {
    try {
        console.log(`\n🔄 Updating pricing layout in: ${filePath}`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove conflicting CSS
        const updatedContent = removeConflictingPricingCSS(content);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log(`✅ Successfully updated pricing layout in ${filePath}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Function to backup a file before making changes
function backupFile(filePath) {
    try {
        const backupPath = `${filePath}.backup.${Date.now()}`;
        fs.copyFileSync(filePath, backupPath);
        console.log(`📁 Backup created: ${backupPath}`);
        return backupPath;
    } catch (error) {
        console.error(`❌ Error creating backup for ${filePath}:`, error.message);
        return null;
    }
}

// Main function to update all pricing layouts
async function updateAllPricingLayouts() {
    console.log('🚀 Starting pricing layout update process...\n');
    
    let successCount = 0;
    let totalCount = sublinkPages.length;
    
    for (const page of sublinkPages) {
        const filePath = path.join(__dirname, page);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  File not found: ${filePath}`);
            continue;
        }
        
        // Create backup
        backupFile(filePath);
        
        // Update pricing layout
        if (updatePricingLayoutInFile(filePath)) {
            successCount++;
        }
    }
    
    console.log(`\n📊 Update Summary:`);
    console.log(`   ✅ Successfully updated: ${successCount}/${totalCount} files`);
    console.log(`   ❌ Failed updates: ${totalCount - successCount}/${totalCount} files`);
    
    if (successCount === totalCount) {
        console.log('\n🎉 All pricing layouts have been successfully updated!');
        console.log('💡 Pricing plans now display in a single horizontal row on all sublink pages.');
        console.log('📱 The layout is responsive and will stack vertically on mobile devices.');
    } else {
        console.log('\n⚠️  Some updates failed. Please check the error messages above.');
    }
}

// Run the update process
if (require.main === module) {
    updateAllPricingLayouts().catch(console.error);
}

module.exports = { updateAllPricingLayouts, updatePricingLayoutInFile };
