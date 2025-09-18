#!/usr/bin/env node

/**
 * Header Template Update Script
 * Updates all sublink pages with the standardized header from index.html
 */

const fs = require('fs');
const path = require('path');

// List of sublink pages that need header updates
const sublinkPages = [
    'ai-powered-intelligence.html',
    '3d-webgl-graphics.html',
    'lightning-performance.html',
    'mobile-first-design.html',
    'enterprise-security.html',
    'advanced-analytics.html'
];

// The new standardized header template
const newHeader = `    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <a href="index.html">
                    <img src="Public/Images/webly logo.png" alt="Webly Industries" class="logo-image">
                    <span class="logo-text">Webly Industries</span>
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="index.html#process">Process</a></li>
                <li><a href="index.html#features">Features</a></li>
                <li><a href="index.html#pricing">Pricing</a></li>
                <li><a href="index.html#contact">Contact</a></li>
            </ul>
            <a href="index.html#contact" class="cta-button">Get Started</a>
        </div>
    </nav>`;

// Function to find and replace the navigation section
function updateHeaderInFile(filePath) {
    try {
        console.log(`\n🔄 Updating header in: ${filePath}`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Pattern to match the existing navigation section
        const navPattern = /<!-- Navigation -->[\s\S]*?<\/nav>/;
        
        // Check if navigation exists
        if (!navPattern.test(content)) {
            console.log(`⚠️  No navigation section found in ${filePath}`);
            return false;
        }
        
        // Replace the navigation section
        const updatedContent = content.replace(navPattern, newHeader);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log(`✅ Successfully updated header in ${filePath}`);
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

// Main function to update all headers
async function updateAllHeaders() {
    console.log('🚀 Starting header template update process...\n');
    
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
        
        // Update header
        if (updateHeaderInFile(filePath)) {
            successCount++;
        }
    }
    
    console.log(`\n📊 Update Summary:`);
    console.log(`   ✅ Successfully updated: ${successCount}/${totalCount} files`);
    console.log(`   ❌ Failed updates: ${totalCount - successCount}/${totalCount} files`);
    
    if (successCount === totalCount) {
        console.log('\n🎉 All headers have been successfully updated!');
        console.log('💡 Backup files have been created with timestamps for safety.');
    } else {
        console.log('\n⚠️  Some updates failed. Please check the error messages above.');
    }
}

// Run the update process
if (require.main === module) {
    updateAllHeaders().catch(console.error);
}

module.exports = { updateAllHeaders, updateHeaderInFile };
