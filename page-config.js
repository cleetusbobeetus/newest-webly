// Page Configuration for Webly Industries Service Pages
// This file contains all the data for each service page

const PAGE_CONFIG = {
    'ai-powered-intelligence': {
        PAGE_TITLE: 'AI-Powered Intelligence for Websites',
        PAGE_SUBTITLE: 'Advanced AI Integration',
        PAGE_DESCRIPTION: 'Transform your website with advanced AI integration. Personalized user experiences, smart content recommendations, and automated customer support. Get AI-powered websites starting at $300/month.',
        PAGE_KEYWORDS: 'AI-powered websites, artificial intelligence web development, smart content recommendations, automated customer support, personalized user experience, AI chatbot, machine learning websites, intelligent web design',
        PAGE_URL: 'ai-powered-intelligence.html',
        PAGE_IMAGE: 'ai-powered-intelligence',
        SERVICE_ICON: '🚀',
        HERO_SUBTITLE: 'Transform your website with advanced AI integration for personalized user experiences, smart content recommendations, and automated customer support',
        MAIN_HEADING: 'Revolutionize Your Website with AI-Powered Intelligence',
        LEAD_PARAGRAPH: 'At Webly Industries, we integrate cutting-edge Artificial Intelligence into your website to create truly dynamic and responsive digital experiences. Our AI solutions go beyond basic automation, offering personalized interactions that adapt to each user\'s unique journey.',
        FEATURES_GRID: `
            <div class="feature-item">
                <div class="feature-icon">🧠</div>
                <h3>Smart Content Recommendations</h3>
                <p>Our AI algorithms analyze user behavior and preferences to deliver personalized content recommendations, increasing engagement and time on site by up to 300%.</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">💬</div>
                <h3>Intelligent Chat Support</h3>
                <p>Advanced AI chatbots that understand context, provide instant responses, and escalate complex queries to human agents when needed. Available 24/7.</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">📊</div>
                <h3>Predictive Analytics</h3>
                <p>Machine learning models that predict user behavior, optimize conversion paths, and provide actionable insights for continuous improvement.</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">🎯</div>
                <h3>Personalized User Experience</h3>
                <p>Dynamic content adaptation based on user preferences, location, device, and browsing history for a truly customized experience.</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">⚡</div>
                <h3>Automated A/B Testing</h3>
                <p>AI-powered testing that continuously optimizes your website elements, headlines, and calls-to-action for maximum conversion rates.</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">🔍</div>
                <h3>Smart Search & Discovery</h3>
                <p>Intelligent search functionality that understands user intent, provides relevant results, and suggests related content automatically.</p>
            </div>
        `,
        ADDITIONAL_SECTIONS: `
            <div class="benefits-section">
                <h3>Why Choose AI-Powered Intelligence?</h3>
                <div class="benefits-grid">
                    <div class="benefit-item">
                        <h4>Increased Engagement</h4>
                        <p>Personalized experiences keep users engaged longer and coming back for more.</p>
                    </div>
                    <div class="benefit-item">
                        <h4>Higher Conversions</h4>
                        <p>AI-optimized user journeys lead to significantly higher conversion rates.</p>
                    </div>
                    <div class="benefit-item">
                        <h4>24/7 Customer Support</h4>
                        <p>Intelligent chatbots provide instant support without human intervention.</p>
                    </div>
                    <div class="benefit-item">
                        <h4>Data-Driven Insights</h4>
                        <p>Advanced analytics help you understand and optimize user behavior.</p>
                    </div>
                </div>
            </div>
        `,
        PRICING_OPTIONS: `
            <div class="pricing-option">
                <h4>Starter AI Package</h4>
                <div class="price">$300<span>/month</span></div>
                <ul>
                    <li>Basic AI chatbot integration</li>
                    <li>Simple content recommendations</li>
                    <li>Basic analytics dashboard</li>
                    <li>Email support</li>
                </ul>
                <a href="index.html#contact" class="btn-primary">Get Started</a>
            </div>
            <div class="pricing-option featured">
                <h4>Professional AI Package</h4>
                <div class="price">$799<span>/month</span></div>
                <ul>
                    <li>Advanced AI chatbot with NLP</li>
                    <li>Smart content personalization</li>
                    <li>Predictive analytics</li>
                    <li>A/B testing automation</li>
                    <li>Priority support</li>
                </ul>
                <a href="index.html#contact" class="btn-primary">Get Started</a>
            </div>
            <div class="pricing-option">
                <h4>Enterprise AI Package</h4>
                <div class="price">$1,999<span>/month</span></div>
                <ul>
                    <li>Custom AI model development</li>
                    <li>Advanced machine learning</li>
                    <li>Real-time personalization</li>
                    <li>Custom integrations</li>
                    <li>Dedicated support</li>
                </ul>
                <a href="index.html#contact" class="btn-primary">Get Started</a>
            </div>
        `,
        CTA_HEADING: 'Ready to Transform Your Website with AI?',
        CTA_DESCRIPTION: 'Join hundreds of businesses already using AI-powered intelligence to boost engagement, increase conversions, and provide exceptional user experiences.',
        CTA_BUTTON_1: 'Get Free AI Consultation',
        CTA_BUTTON_2: 'View All Pricing',
        CONTACT_HEADING: 'Ready to Get Started with AI?',
        CONTACT_SUBTITLE: 'Let\'s discuss how AI-powered intelligence can transform your website',
        CONTACT_DESCRIPTION: 'Ready to revolutionize your online presence with AI? Contact us to discuss your project and get a free consultation.',
        SERVICE_OPTIONS: `
            <option value="ai-starter">AI Starter Package</option>
            <option value="ai-professional">AI Professional Package</option>
            <option value="ai-enterprise">AI Enterprise Package</option>
            <option value="consultation">Free AI Consultation</option>
        `,
        MESSAGE_PLACEHOLDER: 'Tell us about your AI requirements and goals...',
        EMAIL_SUBJECT: '🤖 AI-POWERED INTELLIGENCE INQUIRY - Webly Industries',
        FOOTER_TAGLINE: 'Built with cutting-edge AI technology',
        SERVICE_TYPE: 'AI Integration Service',
        PRICING_JSON: `[
            {
                "@type": "Offer",
                "name": "Starter AI Package",
                "price": "300",
                "priceCurrency": "USD",
                "priceSpecification": {
                    "@type": "CompoundPriceSpecification",
                    "price": "300",
                    "priceCurrency": "USD",
                    "billingIncrement": "P1M"
                }
            },
            {
                "@type": "Offer",
                "name": "Professional AI Package",
                "price": "799",
                "priceCurrency": "USD",
                "priceSpecification": {
                    "@type": "CompoundPriceSpecification",
                    "price": "799",
                    "priceCurrency": "USD",
                    "billingIncrement": "P1M"
                }
            },
            {
                "@type": "Offer",
                "name": "Enterprise AI Package",
                "price": "1999",
                "priceCurrency": "USD",
                "priceSpecification": {
                    "@type": "CompoundPriceSpecification",
                    "price": "1999",
                    "priceCurrency": "USD",
                    "billingIncrement": "P1M"
                }
            }
        ]`
    },
    
    '3d-webgl-graphics': {
        PAGE_TITLE: '3D WebGL Graphics for Websites',
        PAGE_SUBTITLE: 'Stunning 3D Visualizations',
        PAGE_DESCRIPTION: 'Create stunning 3D visualizations and interactive elements with WebGL and Three.js. Immersive user experiences that captivate and convert. Professional 3D web development starting at $300/month.',
        PAGE_KEYWORDS: '3D WebGL graphics, Three.js development, 3D website design, WebGL animations, interactive 3D elements, 3D web development, immersive web experiences, 3D graphics programming',
        PAGE_URL: '3d-webgl-graphics.html',
        PAGE_IMAGE: '3d-webgl-graphics',
        SERVICE_ICON: '🎨',
        HERO_SUBTITLE: 'Create stunning 3D visualizations and interactive elements powered by WebGL and Three.js for immersive user experiences that captivate and convert',
        MAIN_HEADING: 'Bring Your Website to Life with 3D WebGL Graphics',
        LEAD_PARAGRAPH: 'At Webly Industries, we specialize in creating breathtaking 3D web experiences using cutting-edge WebGL technology and Three.js. Our 3D graphics solutions transform ordinary websites into immersive, interactive experiences that engage users and drive conversions.',
        FEATURES_GRID: `
            <div class="feature-item">
                <div class="feature-icon">🎯</div>
                <h3>Interactive 3D Models</h3>
                <p>Custom 3D models that users can rotate, zoom, and interact with in real-time. Perfect for product showcases, architectural visualizations, and educational content.</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">✨</div>
                <h3>Particle Systems</h3>
                <p>Dynamic particle effects that create stunning visual impact. From floating particles to complex simulations, we bring your ideas to life with fluid, responsive animations.</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">🌊</div>
                <h3>Fluid Animations</h3>
                <p>Smooth, 60fps animations that respond to user interactions. Our WebGL implementations ensure buttery-smooth performance across all devices and browsers.</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">🎮</div>
                <h3>Interactive Scenes</h3>
                <p>Immersive 3D environments that users can explore and interact with. Create engaging experiences that keep visitors on your site longer.</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">📱</div>
                <h3>Mobile Optimized</h3>
                <p>Responsive 3D graphics that work seamlessly on mobile devices. Touch controls and optimized performance for the best mobile experience.</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">⚡</div>
                <h3>Performance Optimized</h3>
                <p>Lightweight, efficient 3D implementations that load fast and run smoothly. We optimize for performance without sacrificing visual quality.</p>
            </div>
        `,
        ADDITIONAL_SECTIONS: `
            <div class="technology-section">
                <h3>Advanced 3D Technologies We Use</h3>
                <div class="tech-grid">
                    <div class="tech-item">
                        <h4>WebGL 2.0</h4>
                        <p>Latest WebGL standard for maximum performance and visual quality</p>
                    </div>
                    <div class="tech-item">
                        <h4>Three.js</h4>
                        <p>Industry-leading 3D library for web development</p>
                    </div>
                    <div class="tech-item">
                        <h4>GLSL Shaders</h4>
                        <p>Custom shaders for unique visual effects and materials</p>
                    </div>
                    <div class="tech-item">
                        <h4>GSAP Animations</h4>
                        <p>Professional-grade animations and timeline controls</p>
                    </div>
                    <div class="tech-item">
                        <h4>Physics Engines</h4>
                        <p>Realistic physics simulations for interactive elements</p>
                    </div>
                    <div class="tech-item">
                        <h4>Post-Processing</h4>
                        <p>Advanced effects like bloom, SSAO, and color grading</p>
                    </div>
                </div>
            </div>
        `,
        PRICING_OPTIONS: `
            <div class="pricing-option">
                <h4>Basic 3D Package</h4>
                <div class="price">$500<span>/month</span></div>
                <ul>
                    <li>Simple 3D animations</li>
                    <li>Basic particle effects</li>
                    <li>Mobile optimization</li>
                    <li>Email support</li>
                </ul>
                <a href="index.html#contact" class="btn-primary">Get Started</a>
            </div>
            <div class="pricing-option featured">
                <h4>Professional 3D Package</h4>
                <div class="price">$1,299<span>/month</span></div>
                <ul>
                    <li>Interactive 3D models</li>
                    <li>Custom shaders</li>
                    <li>Physics simulations</li>
                    <li>Advanced animations</li>
                    <li>Priority support</li>
                </ul>
                <a href="index.html#contact" class="btn-primary">Get Started</a>
            </div>
            <div class="pricing-option">
                <h4>Enterprise 3D Package</h4>
                <div class="price">$2,999<span>/month</span></div>
                <ul>
                    <li>Custom 3D applications</li>
                    <li>Complex simulations</li>
                    <li>VR/AR integration</li>
                    <li>Dedicated developer</li>
                    <li>24/7 support</li>
                </ul>
                <a href="index.html#contact" class="btn-primary">Get Started</a>
            </div>
        `,
        CTA_HEADING: 'Ready to Create Stunning 3D Experiences?',
        CTA_DESCRIPTION: 'Transform your website with cutting-edge 3D WebGL graphics that captivate your audience and set you apart from the competition.',
        CTA_BUTTON_1: 'Get Free 3D Consultation',
        CTA_BUTTON_2: 'View All Pricing',
        CONTACT_HEADING: 'Ready to Get Started with 3D Graphics?',
        CONTACT_SUBTITLE: 'Let\'s discuss how 3D WebGL graphics can transform your website',
        CONTACT_DESCRIPTION: 'Ready to create stunning 3D experiences? Contact us to discuss your project and get a free consultation.',
        SERVICE_OPTIONS: `
            <option value="3d-basic">Basic 3D Package</option>
            <option value="3d-professional">Professional 3D Package</option>
            <option value="3d-enterprise">Enterprise 3D Package</option>
            <option value="consultation">Free 3D Consultation</option>
        `,
        MESSAGE_PLACEHOLDER: 'Tell us about your 3D graphics requirements and vision...',
        EMAIL_SUBJECT: '🎨 3D WEBGL GRAPHICS INQUIRY - Webly Industries',
        FOOTER_TAGLINE: 'Built with cutting-edge 3D technology',
        SERVICE_TYPE: '3D WebGL Graphics Service',
        PRICING_JSON: `[
            {
                "@type": "Offer",
                "name": "Basic 3D Package",
                "price": "500",
                "priceCurrency": "USD",
                "priceSpecification": {
                    "@type": "CompoundPriceSpecification",
                    "price": "500",
                    "priceCurrency": "USD",
                    "billingIncrement": "P1M"
                }
            },
            {
                "@type": "Offer",
                "name": "Professional 3D Package",
                "price": "1299",
                "priceCurrency": "USD",
                "priceSpecification": {
                    "@type": "CompoundPriceSpecification",
                    "price": "1299",
                    "priceCurrency": "USD",
                    "billingIncrement": "P1M"
                }
            },
            {
                "@type": "Offer",
                "name": "Enterprise 3D Package",
                "price": "2999",
                "priceCurrency": "USD",
                "priceSpecification": {
                    "@type": "CompoundPriceSpecification",
                    "price": "2999",
                    "priceCurrency": "USD",
                    "billingIncrement": "P1M"
                }
            }
        ]`
    }
    
    // Add more service configurations here...
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PAGE_CONFIG;
}
