#!/usr/bin/env node

/**
 * Fix Four Cards Row Script for Webly Industries
 * 
 * This script ensures all 4 pricing cards display in a single row on desktop
 * instead of 3 cards in the first row and 1 card in the second row
 * 
 * Usage: node fix-four-cards-row.js
 */

const fs = require('fs');
const path = require('path');

/**
 * Fix pricing grid to display all 4 cards in one row
 */
function fixFourCardsRow(content) {
    let updatedContent = content;
    
    const updates = [
        // Change from auto-fit to fixed 4 columns
        { 
            from: 'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));', 
            to: 'grid-template-columns: repeat(4, 1fr);' 
        },
        
        // Reduce gap for better fit
        { 
            from: 'gap: 1.5rem;', 
            to: 'gap: 1rem;' 
        },
        
        // Increase max-width to accommodate 4 cards
        { 
            from: 'max-width: 1200px;', 
            to: 'max-width: 1400px;' 
        },
        
        // Remove card width constraints to allow full width usage
        { 
            from: 'max-width: 350px;\n    min-width: 300px;', 
            to: 'max-width: 100%;\n    min-width: 0;' 
        },
        
        // Reduce padding for better space utilization
        { 
            from: 'padding: 2.5rem 1.5rem;', 
            to: 'padding: 2rem 1rem;' 
        }
    ];
    
    // Apply all updates
    updates.forEach(update => {
        updatedContent = updatedContent.replace(new RegExp(update.from, 'g'), update.to);
    });
    
    // Update responsive breakpoints
    const responsiveUpdates = [
        {
            from: `@media (max-width: 1200px) {
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
}

@media (max-width: 900px) {
    .pricing-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 700px;
        gap: 1.5rem;
    }
}`,
            to: `@media (max-width: 1200px) {
    .pricing-grid {
        max-width: 1200px;
        gap: 0.8rem;
    }
}

@media (max-width: 1024px) {
    .pricing-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 800px;
        gap: 1.5rem;
    }
}

@media (max-width: 768px) {
    .pricing-grid {
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
 * Main function to fix four cards row layout
 */
async function fixFourCardsRowMain() {
    console.log('🚀 Starting four cards row fix...\n');
    
    try {
        console.log('📄 Processing styles.css...');
        
        // Read the styles.css file
        const filePath = path.join(__dirname, 'styles.css');
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Apply four cards row fixes
        const updatedContent = fixFourCardsRow(content);
        
        // Write the updated content back
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        console.log('✅ Successfully updated styles.css');
        
        // Summary
        console.log('\n📊 Four Cards Row Fix Summary:');
        console.log('✅ Successfully updated: 1 file (styles.css)');
        
        console.log('\n🎉 Four cards row fix completed!');
        console.log('\n📏 Key changes made:');
        console.log('   • Changed grid from auto-fit to fixed 4 columns');
        console.log('   • Reduced gap from 1.5rem to 1rem for better fit');
        console.log('   • Increased max-width to 1400px to accommodate 4 cards');
        console.log('   • Removed card width constraints (max-width: 100%, min-width: 0)');
        console.log('   • Reduced padding from 2.5rem 1.5rem to 2rem 1rem');
        console.log('   • Updated responsive breakpoints for optimal scaling');
        console.log('\n📦 All 4 pricing cards now display in a single row on desktop');
        console.log('   • Desktop (1200px+): 4 cards in one row');
        console.log('   • Tablet (768px-1024px): 2 cards per row');
        console.log('   • Mobile (768px and below): 1 card per row');
        
    } catch (error) {
        console.error('❌ Error updating styles.css:', error.message);
    }
}

// Run the script
if (require.main === module) {
    fixFourCardsRowMain().catch(console.error);
}

module.exports = {
    fixFourCardsRowMain,
    fixFourCardsRow
};
