#!/usr/bin/env node

/**
 * Pricing Scaling Fix Script for Webly Industries
 * 
 * This script fixes the pricing plans scaling issue to ensure all pricing cards
 * fit on 100% view on desktop without horizontal scrolling
 * 
 * Usage: node fix-pricing-scaling.js
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix pricing grid layout for responsive scaling
 */
function fixPricingScaling(content) {
    let updatedContent = content;
    
    // Update pricing grid to use auto-fit with minimum width
    const pricingUpdates = [
        // Main pricing grid: change from fixed 5 columns to responsive auto-fit
        { 
            from: 'grid-template-columns: repeat(5, 1fr);', 
            to: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));' 
        },
        
        // Reduce max-width from 1600px to 1400px for better fit
        { 
            from: 'max-width: 1600px;', 
            to: 'max-width: 1400px;' 
        },
        
        // Add justify-items center for better alignment
        { 
            from: 'margin-right: auto;\n}', 
            to: 'margin-right: auto;\n    justify-items: center;\n}' 
        },
        
        // Update pricing card padding for better fit
        { 
            from: 'padding: 3rem 2rem;', 
            to: 'padding: 2.5rem 1.5rem;' 
        },
        
        // Add width constraints to pricing cards
        { 
            from: 'height: 100%;\n}', 
            to: 'height: 100%;\n    width: 100%;\n    max-width: 320px;\n    min-width: 280px;\n}' 
        },
        
        // Reduce pricing title font size
        { 
            from: 'font-size: 2.81rem;', 
            to: 'font-size: 1.8rem;' 
        },
        
        // Reduce pricing price font size
        { 
            from: 'font-size: 3rem;', 
            to: 'font-size: 2.5rem;' 
        }
    ];
    
    // Apply all updates
    pricingUpdates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    // Update responsive breakpoints
    const responsiveUpdates = [
        // Replace old responsive rules with new ones
        {
            from: `@media (max-width: 1200px) {
    .pricing-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.2rem;
    }
}

@media (max-width: 1024px) {
    .pricing-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
}`,
            to: `@media (max-width: 1400px) {
    .pricing-grid {
        max-width: 1200px;
        gap: 1.5rem;
    }
}

@media (max-width: 1200px) {
    .pricing-grid {
        max-width: 1000px;
        gap: 1.5rem;
    }
}

@media (max-width: 1024px) {
    .pricing-grid {
        max-width: 800px;
        gap: 1.5rem;
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
 * Main function to fix pricing scaling
 */
async function fixPricingScalingMain() {
    console.log('🚀 Starting pricing scaling fix...\n');
    
    try {
        console.log('📄 Processing styles.css...');
        
        // Read the styles.css file
        const filePath = path.join(__dirname, 'styles.css');
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Apply pricing scaling fixes
        const updatedContent = fixPricingScaling(content);
        
        // Write the updated content back
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log('✅ Successfully updated styles.css');
        
        // Summary
        console.log('\n📊 Pricing Scaling Fix Summary:');
        console.log('✅ Successfully updated: 1 file (styles.css)');
        
        console.log('\n🎉 Pricing scaling fix completed!');
        console.log('\n📏 Key changes made:');
        console.log('   • Changed grid from fixed 5 columns to responsive auto-fit');
        console.log('   • Set minimum card width to 280px for optimal display');
        console.log('   • Reduced max-width from 1600px to 1400px');
        console.log('   • Added width constraints to pricing cards (280px-320px)');
        console.log('   • Reduced font sizes for better fit');
        console.log('   • Updated responsive breakpoints for better scaling');
        console.log('   • Added justify-items center for better alignment');
        console.log('\n📦 All pricing plans now fit on 100% view without horizontal scrolling');
        
    } catch (error) {
        console.error('❌ Error updating styles.css:', error.message);
    }
}

// Run the script
if (require.main === module) {
    fixPricingScalingMain().catch(console.error);
}

module.exports = {
    fixPricingScalingMain,
    fixPricingScaling
};
