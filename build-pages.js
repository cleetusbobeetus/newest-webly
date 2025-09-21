// Build Script for Webly Industries Service Pages
// This script generates individual pages from the template and configuration

const fs = require('fs');
const path = require('path');

// Read the template file
const templatePath = path.join(__dirname, 'page-template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Read the configuration file
const configPath = path.join(__dirname, 'page-config.js');
const configContent = fs.readFileSync(configPath, 'utf8');

// Extract the PAGE_CONFIG object from the config file
const configMatch = configContent.match(/const PAGE_CONFIG = ({[\s\S]*?});/);
if (!configMatch) {
    console.error('Could not find PAGE_CONFIG in page-config.js');
    process.exit(1);
}

const PAGE_CONFIG = eval('(' + configMatch[1] + ')');

// Function to replace placeholders in template
function replacePlaceholders(template, data) {
    let result = template;
    
    // Replace all placeholders with their values
    for (const [key, value] of Object.entries(data)) {
        const placeholder = `{{${key}}}`;
        result = result.replace(new RegExp(placeholder, 'g'), value);
    }
    
    return result;
}

// Function to build a single page
function buildPage(pageKey, pageData) {
    console.log(`Building page: ${pageKey}`);
    
    // Replace placeholders in template
    const pageContent = replacePlaceholders(template, pageData);
    
    // Write the generated page
    const outputPath = path.join(__dirname, pageData.PAGE_URL);
    fs.writeFileSync(outputPath, pageContent, 'utf8');
    
    console.log(`✅ Generated: ${pageData.PAGE_URL}`);
}

// Function to build all pages
function buildAllPages() {
    console.log('🚀 Starting page generation...\n');
    
    for (const [pageKey, pageData] of Object.entries(PAGE_CONFIG)) {
        buildPage(pageKey, pageData);
    }
    
    console.log(`\n✅ Successfully generated ${Object.keys(PAGE_CONFIG).length} pages!`);
}

// Function to build a specific page
function buildSpecificPage(pageKey) {
    if (!PAGE_CONFIG[pageKey]) {
        console.error(`❌ Page configuration not found for: ${pageKey}`);
        console.log('Available pages:', Object.keys(PAGE_CONFIG).join(', '));
        process.exit(1);
    }
    
    console.log(`🚀 Building specific page: ${pageKey}\n`);
    buildPage(pageKey, PAGE_CONFIG[pageKey]);
    console.log(`\n✅ Successfully generated ${pageKey}!`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
    // Build all pages
    buildAllPages();
} else {
    // Build specific page
    const pageKey = args[0];
    buildSpecificPage(pageKey);
}

// Usage examples:
// node build-pages.js                    # Build all pages
// node build-pages.js ai-powered-intelligence  # Build specific page
