#!/usr/bin/env node

/**
 * Update All Headers Script
 * Updates all sublink pages with the consistent header from index.html
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

// The correct header from index.html
const correctHeader = `    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <a href="#home">
                    <img src="Public/Images/webly logo.png" alt="Webly Industries" class="logo-image">
                    <span class="logo-text">Webly Industries</span>
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#process">Process</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <a href="#contact" class="cta-button">Get Started</a>
        </div>
    </nav>`;

// Function to update header in a file
function updateHeaderInFile(filePath) {
    try {
        console.log(`🔄 Updating header in: ${filePath}`);
        
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Create backup
        const backupPath = `${filePath}.backup.${Date.now()}`;
        fs.writeFileSync(backupPath, content, 'utf8');
        console.log(`📁 Backup created: ${backupPath}`);
        
        // Find and replace the navbar section
        const navbarPattern = /<nav class="navbar">[\s\S]*?<\/nav>/;
        
        if (navbarPattern.test(content)) {
            content = content.replace(navbarPattern, correctHeader);
            console.log(`✅ Header updated in ${filePath}`);
        } else {
            console.log(`⚠️  No navbar found in ${filePath}`);
            return false;
        }
        
        // Write the updated content
        fs.writeFileSync(filePath, content, 'utf8');
        
        return true;
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Main function to update all headers
async function updateAllHeaders() {
    console.log('🚀 Starting header update for all sublink pages...\n');
    
    let successCount = 0;
    let totalCount = sublinkFiles.length;
    
    for (const file of sublinkFiles) {
        if (fs.existsSync(file)) {
            if (updateHeaderInFile(file)) {
                successCount++;
            }
        } else {
            console.log(`⚠️  File not found: ${file}`);
        }
        console.log(''); // Add spacing between files
    }
    
    console.log(`📊 Header Update Summary:`);
    console.log(`   ✅ Successfully updated: ${successCount}/${totalCount} files`);
    console.log(`   ❌ Failed updates: ${totalCount - successCount}/${totalCount} files`);
    
    if (successCount === totalCount) {
        console.log('\n🎉 All headers updated successfully!');
        console.log('💡 All sublink pages now have consistent headers with:');
        console.log('   • Logo links to #home (main page)');
        console.log('   • Navigation links to main page sections');
        console.log('   • CTA button links to #contact');
        console.log('   • Consistent styling and structure');
    } else {
        console.log('\n⚠️  Some updates failed. Please check the error messages above.');
    }
}

// Run the update
if (require.main === module) {
    updateAllHeaders().catch(console.error);
}

module.exports = { updateAllHeaders, updateHeaderInFile };
