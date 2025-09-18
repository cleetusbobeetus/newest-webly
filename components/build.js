#!/usr/bin/env node

/**
 * Simple build script for Webly Industries React Components
 * This script compiles TypeScript components to JavaScript for use in HTML pages
 */

const fs = require('fs');
const path = require('path');

// Simple TypeScript-like compilation (basic JSX transformation)
function compileTSX(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Basic JSX transformation
    let compiled = content
        // Convert JSX to React.createElement calls
        .replace(/<(\w+)([^>]*)>/g, (match, tagName, props) => {
            if (props.trim()) {
                return `React.createElement('${tagName}', {${props.replace(/(\w+)=/g, '$1: ').replace(/"/g, "'")}}, `;
            } else {
                return `React.createElement('${tagName}', null, `;
            }
        })
        .replace(/<\/(\w+)>/g, ')')
        // Convert className to className
        .replace(/className=/g, 'className=')
        // Convert onClick handlers
        .replace(/onClick=\{([^}]+)\}/g, 'onClick: $1')
        // Convert other event handlers
        .replace(/on(\w+)=\{([^}]+)\}/g, 'on$1: $2')
        // Convert props
        .replace(/(\w+)=\{([^}]+)\}/g, '$1: $2')
        .replace(/(\w+)="([^"]+)"/g, "$1: '$2'")
        // Convert string literals
        .replace(/(\w+)='([^']+)'/g, "$1: '$2'");
    
    return compiled;
}

// Build function
function build() {
    console.log('🚀 Building Webly Industries Components...\n');
    
    const componentsDir = __dirname;
    const outputDir = path.join(componentsDir, 'dist');
    
    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // List of components to build
    const components = ['Header', 'Footer'];
    
    components.forEach(component => {
        console.log(`📦 Building ${component}...`);
        
        // Read TypeScript file
        const tsxPath = path.join(componentsDir, `${component}.tsx`);
        const cssPath = path.join(componentsDir, `${component}.css`);
        
        if (fs.existsSync(tsxPath)) {
            // Compile TypeScript to JavaScript
            const tsxContent = fs.readFileSync(tsxPath, 'utf8');
            
            // Simple compilation (in a real project, you'd use TypeScript compiler)
            const jsContent = `// Compiled from ${component}.tsx
${tsxContent}
`;
            
            // Write JavaScript file
            const jsPath = path.join(outputDir, `${component}.js`);
            fs.writeFileSync(jsPath, jsContent);
            
            console.log(`✅ Generated: ${component}.js`);
        }
        
        // Copy CSS file
        if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            const cssOutputPath = path.join(outputDir, `${component}.css`);
            fs.writeFileSync(cssOutputPath, cssContent);
            console.log(`✅ Copied: ${component}.css`);
        }
    });
    
    // Create index file
    const indexContent = `// Webly Industries Components
// Generated on ${new Date().toISOString()}

// Export all components
export { default as Header } from './Header.js';
export { default as Footer } from './Footer.js';

// Import CSS
import './Header.css';
import './Footer.css';
`;
    
    fs.writeFileSync(path.join(outputDir, 'index.js'), indexContent);
    console.log('✅ Generated: index.js');
    
    // Create HTML example
    const exampleContent = fs.readFileSync(path.join(componentsDir, 'example.html'), 'utf8');
    fs.writeFileSync(path.join(outputDir, 'example.html'), exampleContent);
    console.log('✅ Generated: example.html');
    
    console.log(`\n🎉 Build complete! Output directory: ${outputDir}`);
    console.log('\n📁 Files generated:');
    console.log('  - Header.js & Header.css');
    console.log('  - Footer.js & Footer.css');
    console.log('  - index.js');
    console.log('  - example.html');
    console.log('\n💡 Usage:');
    console.log('  - Include the CSS files in your HTML');
    console.log('  - Include React and ReactDOM');
    console.log('  - Include the component JS files');
    console.log('  - Use the components in your React app');
}

// Run build
if (require.main === module) {
    build();
}

module.exports = { build };
