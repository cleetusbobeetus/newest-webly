#!/usr/bin/env node

/**
 * Pricing Styling Fix Script
 * Ensures consultation and launch promotion boxes have correct colored styling on all sublink pages
 */

const fs = require('fs');
const path = require('path');

// List of sublink pages that need pricing styling fixes
const sublinkPages = [
    'ai-powered-intelligence.html',
    '3d-webgl-graphics.html',
    'lightning-performance.html',
    'mobile-first-design.html',
    'enterprise-security.html',
    'advanced-analytics.html'
];

// Function to fix pricing card classes and styling
function fixPricingStyling(content) {
    let updatedContent = content;
    
    // Fix consultation card (first pricing-option)
    // Add consultation class to the first pricing-option
    updatedContent = updatedContent.replace(
        /(<div class="pricing-option fade-in">\s*<h3 class="pricing-title">Consultation<\/h3>)/,
        '<div class="pricing-option consultation fade-in">\n                    <h3 class="pricing-title">Consultation</h3>'
    );
    
    // Fix launch promotion card
    // Ensure it has the launch-promotion class
    updatedContent = updatedContent.replace(
        /(<div class="pricing-option featured fade-in">\s*<div class="launch-badge">🚀 Launch Promotion!<\/div>)/,
        '<div class="pricing-option launch-promotion featured fade-in">\n                    <div class="launch-badge">🚀 Launch Promotion!</div>'
    );
    
    return updatedContent;
}

// Function to add missing CSS for pricing-option classes
function addPricingOptionCSS(content) {
    // Check if the CSS is already present
    if (content.includes('.pricing-option.consultation')) {
        return content;
    }
    
    // Add CSS for consultation and launch promotion styling
    const consultationCSS = `
        /* Consultation card styling for sublink pages */
        .pricing-option.consultation {
            border-color: var(--secondary);
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
        }
        
        .pricing-option.consultation .pricing-price {
            background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        /* Launch promotion styling for sublink pages */
        .pricing-option.launch-promotion {
            border: 3px solid #fbbf24;
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%);
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.4), 0 0 80px rgba(245, 158, 11, 0.2);
            transform: scale(1.02);
            position: relative;
            overflow: visible;
        }
        
        .pricing-option.launch-promotion::before {
            content: '';
            position: absolute;
            top: -8px;
            left: -8px;
            right: -8px;
            bottom: -8px;
            background: linear-gradient(45deg, #fbbf24, #f59e0b, #fbbf24, #f59e0b, #fbbf24);
            border-radius: 20px;
            z-index: -1;
            animation: launchGlow 8s ease-in-out infinite alternate;
            opacity: 0.8;
        }
        
        .pricing-option.launch-promotion .pricing-price {
            color: #000000;
            font-weight: 900;
            text-shadow: 0 1px 3px rgba(255, 255, 255, 0.9);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
            letter-spacing: -0.02em;
            filter: contrast(1.1) brightness(1.05);
        }
        
        .pricing-option.launch-promotion .pricing-period {
            color: #000000;
            font-weight: 700;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }
        
        .pricing-option.launch-promotion .pricing-upkeep {
            color: #000000;
            font-weight: 700;
            font-size: 1.1rem;
            margin-top: 0.1rem;
            margin-bottom: 1rem;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }
        
        .pricing-option.launch-promotion .pricing-features li {
            color: #000000 !important;
            font-weight: 600;
            font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
            line-height: 1.6;
        }
        
        .pricing-option.launch-promotion .pricing-features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #fbbf24;
            font-weight: bold;
            font-size: 1.1em;
            text-shadow: 0 0 8px rgba(251, 191, 36, 0.6);
        }
    `;
    
    // Insert the CSS before the closing </style> tag
    const styleEndPattern = /<\/style>/;
    if (styleEndPattern.test(content)) {
        updatedContent = content.replace(styleEndPattern, `${consultationCSS}\n    </style>`);
    } else {
        // If no style tag found, add it before the closing head tag
        const headEndPattern = /<\/head>/;
        updatedContent = content.replace(headEndPattern, `    <style>${consultationCSS}\n    </style>\n</head>`);
    }
    
    return updatedContent;
}

// Function to update pricing styling in a file
function updatePricingStylingInFile(filePath) {
    try {
        console.log(`\n🔄 Fixing pricing styling in: ${filePath}`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix the HTML classes
        content = fixPricingStyling(content);
        
        // Add the CSS styling
        content = addPricingOptionCSS(content);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        
        console.log(`✅ Successfully fixed pricing styling in ${filePath}`);
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

// Main function to fix all pricing styling
async function fixAllPricingStyling() {
    console.log('🚀 Starting pricing styling fix process...\n');
    
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
        
        // Fix pricing styling
        if (updatePricingStylingInFile(filePath)) {
            successCount++;
        }
    }
    
    console.log(`\n📊 Update Summary:`);
    console.log(`   ✅ Successfully updated: ${successCount}/${totalCount} files`);
    console.log(`   ❌ Failed updates: ${totalCount - successCount}/${totalCount} files`);
    
    if (successCount === totalCount) {
        console.log('\n🎉 All pricing styling has been successfully fixed!');
        console.log('💡 Consultation boxes now have teal/green gradient styling.');
        console.log('💡 Launch promotion boxes now have orange/gold styling with glow effects.');
    } else {
        console.log('\n⚠️  Some updates failed. Please check the error messages above.');
    }
}

// Run the fix process
if (require.main === module) {
    fixAllPricingStyling().catch(console.error);
}

module.exports = { fixAllPricingStyling, updatePricingStylingInFile };
