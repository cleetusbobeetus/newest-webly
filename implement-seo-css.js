#!/usr/bin/env node

/**
 * SEO-Optimized CSS Implementation Script
 * Replaces the current CSS with the new SEO-optimized version
 */

const fs = require('fs');
const path = require('path');

// List of HTML files to update
const htmlFiles = [
    'index.html',
    'ai-powered-intelligence.html',
    '3d-webgl-graphics.html',
    'lightning-performance.html',
    'mobile-first-design.html',
    'enterprise-security.html',
    'advanced-analytics.html'
];

// Function to backup original CSS
function backupOriginalCSS() {
    try {
        const timestamp = Date.now();
        const backupPath = `styles.css.backup.${timestamp}`;
        fs.copyFileSync('styles.css', backupPath);
        console.log(`📁 Original CSS backed up as: ${backupPath}`);
        return backupPath;
    } catch (error) {
        console.error('❌ Error backing up CSS:', error.message);
        return null;
    }
}

// Function to replace CSS file
function replaceCSSFile() {
    try {
        console.log('🔄 Replacing CSS with SEO-optimized version...');
        
        // Read the new SEO-optimized CSS
        const newCSS = fs.readFileSync('styles-seo-optimized.css', 'utf8');
        
        // Write to styles.css
        fs.writeFileSync('styles.css', newCSS, 'utf8');
        
        console.log('✅ CSS successfully replaced with SEO-optimized version');
        return true;
    } catch (error) {
        console.error('❌ Error replacing CSS:', error.message);
        return false;
    }
}

// Function to add critical CSS to HTML files
function addCriticalCSSToHTML(filePath) {
    try {
        console.log(`🔄 Adding critical CSS to: ${filePath}`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Read critical CSS
        const criticalCSS = fs.readFileSync('critical.css', 'utf8');
        
        // Check if critical CSS is already present
        if (content.includes('<!-- Critical CSS -->')) {
            console.log(`⚠️  Critical CSS already present in ${filePath}`);
            return true;
        }
        
        // Add critical CSS before the main stylesheet link
        const criticalCSSBlock = `    <!-- Critical CSS - Above the Fold -->
    <style>
${criticalCSS}
    </style>
    
`;
        
        // Find the styles.css link and add critical CSS before it
        const stylesLinkPattern = /<link rel="stylesheet" href="styles\.css">/;
        if (stylesLinkPattern.test(content)) {
            content = content.replace(stylesLinkPattern, criticalCSSBlock + '    <link rel="stylesheet" href="styles.css">');
        } else {
            // If no styles.css link found, add before closing head tag
            const headEndPattern = /<\/head>/;
            content = content.replace(headEndPattern, criticalCSSBlock + '</head>');
        }
        
        // Write updated content
        fs.writeFileSync(filePath, content, 'utf8');
        
        console.log(`✅ Critical CSS added to ${filePath}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Function to add performance optimizations to HTML
function addPerformanceOptimizations(filePath) {
    try {
        console.log(`🔄 Adding performance optimizations to: ${filePath}`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add preload for critical resources
        const preloadOptimizations = `    <!-- Performance Optimizations -->
    <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="styles.css"></noscript>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"></noscript>
    
`;
        
        // Add before closing head tag
        const headEndPattern = /<\/head>/;
        if (headEndPattern.test(content)) {
            content = content.replace(headEndPattern, preloadOptimizations + '</head>');
        }
        
        // Write updated content
        fs.writeFileSync(filePath, content, 'utf8');
        
        console.log(`✅ Performance optimizations added to ${filePath}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error adding performance optimizations to ${filePath}:`, error.message);
        return false;
    }
}

// Main function to implement SEO-optimized CSS
async function implementSEOCSS() {
    console.log('🚀 Starting SEO-optimized CSS implementation...\n');
    
    let successCount = 0;
    let totalCount = htmlFiles.length + 1; // +1 for CSS file
    
    // Step 1: Backup original CSS
    console.log('📁 Step 1: Backing up original CSS...');
    const backupPath = backupOriginalCSS();
    if (backupPath) {
        successCount++;
    }
    
    // Step 2: Replace CSS file
    console.log('\n🔄 Step 2: Replacing CSS with SEO-optimized version...');
    if (replaceCSSFile()) {
        successCount++;
    }
    
    // Step 3: Update HTML files
    console.log('\n📄 Step 3: Updating HTML files...');
    for (const file of htmlFiles) {
        if (fs.existsSync(file)) {
            // Create backup
            const backupPath = `${file}.backup.${Date.now()}`;
            fs.copyFileSync(file, backupPath);
            console.log(`📁 Backup created: ${backupPath}`);
            
            // Add critical CSS
            if (addCriticalCSSToHTML(file)) {
                successCount++;
            }
            
            // Add performance optimizations
            addPerformanceOptimizations(file);
        } else {
            console.log(`⚠️  File not found: ${file}`);
        }
    }
    
    console.log(`\n📊 Implementation Summary:`);
    console.log(`   ✅ Successfully updated: ${successCount}/${totalCount} files`);
    console.log(`   ❌ Failed updates: ${totalCount - successCount}/${totalCount} files`);
    
    if (successCount === totalCount) {
        console.log('\n🎉 SEO-optimized CSS implementation complete!');
        console.log('💡 Key improvements:');
        console.log('   • Critical CSS inlined for faster loading');
        console.log('   • Performance-optimized CSS structure');
        console.log('   • SEO-friendly semantic markup');
        console.log('   • Accessibility improvements');
        console.log('   • Mobile-first responsive design');
        console.log('   • Hardware-accelerated animations');
    } else {
        console.log('\n⚠️  Some updates failed. Please check the error messages above.');
    }
}

// Run the implementation
if (require.main === module) {
    implementSEOCSS().catch(console.error);
}

module.exports = { implementSEOCSS, addCriticalCSSToHTML, addPerformanceOptimizations };
