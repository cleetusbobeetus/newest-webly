#!/usr/bin/env node

/**
 * Update Copyright to 2025 Script
 * Updates copyright notice to "© 2025 Webly Industries LLC. All rights reserved."
 */

const fs = require('fs');
const path = require('path');

// List of all HTML files to update
const htmlFiles = [
    'index.html',
    'ai-powered-intelligence.html',
    '3d-webgl-graphics.html',
    'lightning-performance.html',
    'mobile-first-design.html',
    'enterprise-security.html',
    'advanced-analytics.html'
];

// Function to update copyright in a file
function updateCopyright(filePath) {
    try {
        console.log(`🔄 Updating copyright in: ${filePath}`);
        
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Create backup
        const backupPath = `${filePath}.backup.copyright-2025.${Date.now()}`;
        fs.writeFileSync(backupPath, content, 'utf8');
        console.log(`📁 Backup created: ${backupPath}`);
        
        // Update meta copyright tag
        content = content.replace(
            /<meta name="copyright" content="© 2024 Webly Industries\. All rights reserved\.">/g,
            '<meta name="copyright" content="© 2025 Webly Industries LLC. All rights reserved.">'
        );
        
        // Update footer copyright text
        content = content.replace(
            /&copy; 2024 Webly Industries\. All rights reserved\./g,
            '&copy; 2025 Webly Industries LLC. All rights reserved.'
        );
        
        // Also update any other variations
        content = content.replace(
            /© 2024 Webly Industries\. All rights reserved\./g,
            '© 2025 Webly Industries LLC. All rights reserved.'
        );
        
        console.log(`✅ Copyright updated in ${filePath}`);
        
        // Write the updated content
        fs.writeFileSync(filePath, content, 'utf8');
        
        return true;
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Main function to update copyright
async function updateCopyright2025() {
    console.log('🚀 Starting copyright update to 2025 for all pages...\n');
    
    let successCount = 0;
    let totalCount = htmlFiles.length;
    
    for (const file of htmlFiles) {
        if (fs.existsSync(file)) {
            if (updateCopyright(file)) {
                successCount++;
            }
        } else {
            console.log(`⚠️  File not found: ${file}`);
        }
        console.log(''); // Add spacing between files
    }
    
    console.log(`📊 Copyright Update Summary:`);
    console.log(`   ✅ Successfully updated: ${successCount}/${totalCount} files`);
    console.log(`   ❌ Failed updates: ${totalCount - successCount}/${totalCount} files`);
    
    if (successCount === totalCount) {
        console.log('\n🎉 All copyright notices updated successfully!');
        console.log('💡 Copyright now shows:');
        console.log('   • © 2025 Webly Industries LLC. All rights reserved.');
        console.log('   • Updated in meta tags and footer text');
        console.log('   • Consistent across all pages');
    } else {
        console.log('\n⚠️  Some updates failed. Please check the error messages above.');
    }
}

// Run the update
if (require.main === module) {
    updateCopyright2025().catch(console.error);
}

module.exports = { updateCopyright2025, updateCopyright };
