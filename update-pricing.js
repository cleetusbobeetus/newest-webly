#!/usr/bin/env node

/**
 * Pricing Update Script for Webly Industries
 * 
 * This script updates the pricing plans across all sublink HTML files
 * to ensure consistency with the main index.html pricing structure.
 * 
 * Usage: node update-pricing.js
 */

const fs = require('fs');
const path = require('path');

// Standard pricing structure from index.html
const STANDARD_PRICING = {
    consultation: {
        title: "Consultation",
        price: "$0",
        period: "completely free",
        features: [
            "Email Website Analysis",
            "Current Website Audit", 
            "Identify Weaknesses & Issues",
            "Improvement Recommendations",
            "Technology Upgrade Suggestions",
            "Performance Optimization Tips",
            "Custom Action Plan",
            "No Obligation"
        ],
        buttonText: "Book Now"
    },
    starterMaintenance: {
        title: "Starter Website + Maintenance",
        price: "$300",
        period: "installment",
        upkeep: "$99 monthly upkeep/installments",
        features: [
            "5-Page Custom Website",
            "Mobile Responsive Design",
            "Basic SEO Optimization",
            "Contact Form Integration",
            "SSL Certificate Included",
            "Monthly Updates & Changes",
            "Priority Support",
            "Performance Monitoring",
            "Security Updates"
        ],
        buttonText: "Get Started",
        isLaunchPromotion: true
    },
    starter: {
        title: "Starter",
        price: "$2,999",
        period: "or $299/month for 12 months",
        features: [
            "5-Page Custom Website",
            "Mobile Responsive Design",
            "Basic SEO Optimization",
            "Contact Form Integration",
            "3 Months Free Maintenance",
            "SSL Certificate Included"
        ],
        buttonText: "Get Started"
    },
    professional: {
        title: "Professional",
        price: "$7,999",
        period: "or $399/month for 24 months",
        features: [
            "15-Page Advanced Website",
            "3D Graphics & Animations",
            "AI-Powered Features",
            "E-commerce Integration",
            "Advanced Analytics",
            "6 Months Free Maintenance",
            "Priority Support",
            "Custom Admin Dashboard"
        ],
        buttonText: "Get Started"
    },
    enterprise: {
        title: "Enterprise",
        price: "$19,999",
        period: "or $999/month for 24 months",
        features: [
            "Unlimited Pages",
            "Custom WebGL Applications",
            "Advanced AI Integration",
            "Multi-language Support",
            "Custom API Development",
            "24/7 Priority Support",
            "White-label Solutions",
            "Custom Training"
        ],
        buttonText: "Get Started"
    }
};

// List of HTML files to update (excluding index.html as it's the source)
const HTML_FILES = [
    'ai-powered-intelligence.html',
    '3d-webgl-graphics.html',
    'lightning-performance.html',
    'mobile-first-design.html',
    'enterprise-security.html',
    'advanced-analytics.html'
];

/**
 * Generate pricing HTML for a single pricing option
 */
function generatePricingHTML(option, isServicePage = false) {
    const className = isServicePage ? 'pricing-option' : 'pricing-card';
    const featuredClass = option.isLaunchPromotion ? ' featured' : '';
    const launchBadge = option.isLaunchPromotion ? '<div class="launch-badge">🚀 Launch Promotion!</div>' : '';
    const upkeepDiv = option.upkeep ? `<div class="pricing-upkeep">${option.upkeep}</div>` : '';
    
    const featuresHTML = option.features.map(feature => `<li>${feature}</li>`).join('\n                        ');
    
    return `                <div class="${className}${featuredClass} fade-in">
                    ${launchBadge}
                    <h3 class="pricing-title">${option.title}</h3>
                    <div class="pricing-price">${option.price}</div>
                    <div class="pricing-period">${option.period}</div>
                    ${upkeepDiv}
                    <ul class="pricing-features">
                        ${featuresHTML}
                    </ul>
                    <a href="index.html#contact" class="btn-primary">${option.buttonText}</a>
                </div>`;
}

/**
 * Generate the complete pricing section HTML
 */
function generatePricingSection(isServicePage = false) {
    const sectionClass = isServicePage ? 'pricing-section' : 'pricing';
    const gridClass = isServicePage ? 'pricing-options' : 'pricing-grid';
    const containerClass = isServicePage ? '' : 'pricing-container';
    
    const pricingHTML = Object.values(STANDARD_PRICING)
        .map(option => generatePricingHTML(option, isServicePage))
        .join('\n                \n');
    
    const containerOpen = containerClass ? `<div class="${containerClass}">` : '';
    const containerClose = containerClass ? '</div>' : '';
    
    return `${containerOpen}
            <h2 class="section-title fade-in">Flexible Pricing Plans</h2>
            <p class="section-subtitle fade-in">Choose the perfect plan for your business with our flexible installment options and monthly maintenance services</p>
            
            <div class="${gridClass}">
${pricingHTML}
            </div>
        ${containerClose}`;
}

/**
 * Update pricing section in HTML content
 */
function updatePricingInHTML(content, isServicePage = false) {
    // Pattern to match the pricing section
    const pricingSectionPattern = /<section class="pricing[^"]*"[^>]*>[\s\S]*?<\/section>/g;
    
    // Generate new pricing section
    const newPricingSection = `<section class="${isServicePage ? 'pricing-section' : 'pricing'}" id="pricing">
        ${generatePricingSection(isServicePage)}
    </section>`;
    
    // Replace the pricing section
    return content.replace(pricingSectionPattern, newPricingSection);
}

/**
 * Update pricing options in service pages
 */
function updateServicePagePricing(content) {
    // Pattern to match pricing options in service pages
    const pricingOptionsPattern = /<div class="pricing-section">[\s\S]*?<\/div>\s*<\/div>/g;
    
    // Generate new pricing section for service pages
    const newPricingSection = `<div class="pricing-section">
                    <h3>Flexible Pricing Plans</h3>
                    <p class="section-subtitle">Choose the perfect plan for your business with our flexible installment options and monthly maintenance services</p>
                    <div class="pricing-options">
                        ${Object.values(STANDARD_PRICING)
                            .map(option => generatePricingHTML(option, true))
                            .join('\n                        \n')}
                    </div>
                </div>`;
    
    return content.replace(pricingOptionsPattern, newPricingSection);
}

/**
 * Main function to update all HTML files
 */
async function updateAllPricing() {
    console.log('🚀 Starting pricing update for Webly Industries...\n');
    
    let updatedFiles = 0;
    let errorFiles = [];
    
    for (const filename of HTML_FILES) {
        try {
            console.log(`📄 Processing ${filename}...`);
            
            // Read the file
            const filePath = path.join(__dirname, filename);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Check if it's a service page (has pricing-section class)
            const isServicePage = content.includes('pricing-section');
            
            let updatedContent;
            if (isServicePage) {
                // Update service page pricing
                updatedContent = updateServicePagePricing(content);
            } else {
                // Update main pricing section
                updatedContent = updatePricingInHTML(content, false);
            }
            
            // Write the updated content back
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            
            console.log(`✅ Successfully updated ${filename}`);
            updatedFiles++;
            
        } catch (error) {
            console.error(`❌ Error updating ${filename}:`, error.message);
            errorFiles.push(filename);
        }
    }
    
    // Summary
    console.log('\n📊 Update Summary:');
    console.log(`✅ Successfully updated: ${updatedFiles} files`);
    if (errorFiles.length > 0) {
        console.log(`❌ Errors in: ${errorFiles.length} files`);
        errorFiles.forEach(file => console.log(`   - ${file}`));
    }
    
    console.log('\n🎉 Pricing update completed!');
    console.log('\n📋 Updated pricing structure:');
    console.log('   • Consultation: $0 (free)');
    console.log('   • Starter Website + Maintenance: $300 + $99/month (Launch Promotion!)');
    console.log('   • Starter: $2,999 (or $299/month for 12 months)');
    console.log('   • Professional: $7,999 (or $399/month for 24 months)');
    console.log('   • Enterprise: $19,999 (or $999/month for 24 months)');
}

// Run the script
if (require.main === module) {
    updateAllPricing().catch(console.error);
}

module.exports = {
    updateAllPricing,
    STANDARD_PRICING,
    generatePricingHTML,
    generatePricingSection
};