#!/usr/bin/env node

/**
 * Fix Navigation Links Script
 * Updates navigation links to properly scroll to sections on each page
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

// Function to update navigation links in a file
function updateNavigationLinks(filePath) {
    try {
        console.log(`🔄 Updating navigation links in: ${filePath}`);
        
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Create backup
        const backupPath = `${filePath}.backup.nav-fix.${Date.now()}`;
        fs.writeFileSync(backupPath, content, 'utf8');
        console.log(`📁 Backup created: ${backupPath}`);
        
        // Update navigation links based on the file type
        if (filePath === 'index.html') {
            // Main page - links should go to sections on the same page
            content = content.replace(/href="#home"/g, 'href="#home"');
            content = content.replace(/href="#process"/g, 'href="#process"');
            content = content.replace(/href="#features"/g, 'href="#features"');
            content = content.replace(/href="#pricing"/g, 'href="#pricing"');
            content = content.replace(/href="#contact"/g, 'href="#contact"');
            console.log(`✅ Updated main page navigation links`);
        } else {
            // Sublink pages - links should go to main page sections
            content = content.replace(/href="#home"/g, 'href="index.html#home"');
            content = content.replace(/href="#process"/g, 'href="index.html#process"');
            content = content.replace(/href="#features"/g, 'href="index.html#features"');
            content = content.replace(/href="#pricing"/g, 'href="index.html#pricing"');
            content = content.replace(/href="#contact"/g, 'href="index.html#contact"');
            console.log(`✅ Updated sublink page navigation links`);
        }
        
        // Write the updated content
        fs.writeFileSync(filePath, content, 'utf8');
        
        return true;
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Function to add smooth scrolling behavior
function addSmoothScrolling(filePath) {
    try {
        console.log(`🔄 Adding smooth scrolling to: ${filePath}`);
        
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if smooth scrolling is already present
        if (content.includes('scroll-behavior: smooth')) {
            console.log(`⚠️  Smooth scrolling already present in ${filePath}`);
            return true;
        }
        
        // Add smooth scrolling CSS
        const smoothScrollingCSS = `
        <style>
            html {
                scroll-behavior: smooth;
            }
            
            /* Enhanced smooth scrolling for better UX */
            @media (prefers-reduced-motion: no-preference) {
                html {
                    scroll-behavior: smooth;
                }
            }
            
            /* Respect user's motion preferences */
            @media (prefers-reduced-motion: reduce) {
                html {
                    scroll-behavior: auto;
                }
            }
        </style>
        `;
        
        // Add before the closing head tag
        const headEndPattern = /<\/head>/;
        if (headEndPattern.test(content)) {
            content = content.replace(headEndPattern, smoothScrollingCSS + '</head>');
            console.log(`✅ Added smooth scrolling to ${filePath}`);
        } else {
            console.log(`⚠️  Could not find </head> tag in ${filePath}`);
            return false;
        }
        
        // Write the updated content
        fs.writeFileSync(filePath, content, 'utf8');
        
        return true;
        
    } catch (error) {
        console.error(`❌ Error adding smooth scrolling to ${filePath}:`, error.message);
        return false;
    }
}

// Main function to fix navigation links
async function fixNavigationLinks() {
    console.log('🚀 Starting navigation links fix for all pages...\n');
    
    let successCount = 0;
    let totalCount = htmlFiles.length;
    
    for (const file of htmlFiles) {
        if (fs.existsSync(file)) {
            // Update navigation links
            if (updateNavigationLinks(file)) {
                successCount++;
            }
            
            // Add smooth scrolling
            addSmoothScrolling(file);
            
        } else {
            console.log(`⚠️  File not found: ${file}`);
        }
        console.log(''); // Add spacing between files
    }
    
    console.log(`📊 Navigation Links Fix Summary:`);
    console.log(`   ✅ Successfully updated: ${successCount}/${totalCount} files`);
    console.log(`   ❌ Failed updates: ${totalCount - successCount}/${totalCount} files`);
    
    if (successCount === totalCount) {
        console.log('\n🎉 All navigation links fixed successfully!');
        console.log('💡 Navigation now works correctly:');
        console.log('   • Home button → Scrolls to top of page');
        console.log('   • Process button → Scrolls to process section');
        console.log('   • Features button → Scrolls to features section');
        console.log('   • Pricing button → Scrolls to pricing section');
        console.log('   • Contact button → Scrolls to contact section');
        console.log('   • Smooth scrolling behavior added');
        console.log('   • Respects user motion preferences');
    } else {
        console.log('\n⚠️  Some updates failed. Please check the error messages above.');
    }
}

// Run the fix
if (require.main === module) {
    fixNavigationLinks().catch(console.error);
}

module.exports = { fixNavigationLinks, updateNavigationLinks, addSmoothScrolling };
