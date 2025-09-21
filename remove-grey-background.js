#!/usr/bin/env node

/**
 * Remove Grey Background Script
 * Removes the ugly grey background from logo images on all sublink pages
 */

const fs = require('fs');
const path = require('path');

// List of sublink HTML files to update
const sublinkFiles = [
    'ai-powered-intelligence.html',
    '3d-webgl-graphics.html',
    'lightning-performance.html',
    'mobile-first-design.html',
    'enterprise-security.html',
    'advanced-analytics.html'
];

// Function to remove grey background from logo styling
function removeGreyBackground(filePath) {
    try {
        console.log(`🔄 Removing grey background from: ${filePath}`);
        
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Create backup
        const backupPath = `${filePath}.backup.grey-fix.${Date.now()}`;
        fs.writeFileSync(backupPath, content, 'utf8');
        console.log(`📁 Backup created: ${backupPath}`);
        
        // Remove the grey background styling from .logo-image
        const greyBackgroundPattern = /background:\s*rgba\(255,\s*255,\s*255,\s*0\.1\);/g;
        const borderPattern = /border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.2\);/g;
        const backdropPattern = /backdrop-filter:\s*blur\(10px\);/g;
        const paddingPattern = /padding:\s*16px;/g;
        
        // Remove these specific styling properties
        content = content.replace(greyBackgroundPattern, '');
        content = content.replace(borderPattern, '');
        content = content.replace(backdropPattern, '');
        content = content.replace(paddingPattern, '');
        
        // Also remove any extra semicolons and clean up the CSS
        content = content.replace(/;\s*;/g, ';');
        content = content.replace(/;\s*}/g, '}');
        
        console.log(`✅ Grey background removed from ${filePath}`);
        
        // Write the updated content
        fs.writeFileSync(filePath, content, 'utf8');
        
        return true;
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Main function to remove grey backgrounds
async function removeGreyBackgrounds() {
    console.log('🚀 Starting grey background removal from all sublink pages...\n');
    
    let successCount = 0;
    let totalCount = sublinkFiles.length;
    
    for (const file of sublinkFiles) {
        if (fs.existsSync(file)) {
            if (removeGreyBackground(file)) {
                successCount++;
            }
        } else {
            console.log(`⚠️  File not found: ${file}`);
        }
        console.log(''); // Add spacing between files
    }
    
    console.log(`📊 Grey Background Removal Summary:`);
    console.log(`   ✅ Successfully updated: ${successCount}/${totalCount} files`);
    console.log(`   ❌ Failed updates: ${totalCount - successCount}/${totalCount} files`);
    
    if (successCount === totalCount) {
        console.log('\n🎉 All grey backgrounds removed successfully!');
        console.log('💡 Logo images now have clean, transparent backgrounds:');
        console.log('   • Removed grey background: rgba(255, 255, 255, 0.1)');
        console.log('   • Removed grey border: rgba(255, 255, 255, 0.2)');
        console.log('   • Removed backdrop blur effect');
        console.log('   • Removed extra padding');
        console.log('   • Clean, modern appearance');
    } else {
        console.log('\n⚠️  Some updates failed. Please check the error messages above.');
    }
}

// Run the removal
if (require.main === module) {
    removeGreyBackgrounds().catch(console.error);
}

module.exports = { removeGreyBackgrounds, removeGreyBackground };
