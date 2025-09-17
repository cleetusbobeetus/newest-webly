// Advanced SEO Analytics and Tracking for Webly Industries
// This script provides comprehensive analytics and SEO monitoring

class SEOAnalytics {
    constructor() {
        this.config = {
            googleAnalyticsId: 'G-567CX2EMCP',
            enableHeatmaps: true,
            enableScrollTracking: true,
            enableClickTracking: true,
            enableFormTracking: true,
            enablePerformanceTracking: true,
            enableConversionTracking: true
        };
        
        this.init();
    }

    init() {
        this.setupGoogleAnalytics();
        this.setupCustomTracking();
        this.setupPerformanceMonitoring();
        this.setupConversionTracking();
        this.setupSEOMonitoring();
    }

    // Enhanced Google Analytics Setup
    setupGoogleAnalytics() {
        // Google Analytics 4
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', this.config.googleAnalyticsId, {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
                'custom_parameter_1': 'service_type',
                'custom_parameter_2': 'budget_range',
                'custom_parameter_3': 'lead_source'
            }
        });

        // Enhanced ecommerce tracking
        this.trackEcommerceEvents();
    }

    // Custom Event Tracking
    setupCustomTracking() {
        // Track page views with enhanced data
        this.trackPageView();
        
        // Track user interactions
        this.trackUserInteractions();
        
        // Track form submissions
        this.trackFormSubmissions();
        
        // Track pricing interactions
        this.trackPricingInteractions();
        
        // Track 3D scene interactions
        this.track3DInteractions();
    }

    trackPageView() {
        const pageData = {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            color_depth: screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language
        };

        // Send to Google Analytics
        gtag('event', 'page_view', pageData);
        
        // Send to custom analytics endpoint
        this.sendAnalyticsData('page_view', pageData);
    }

    trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (event) => {
            const element = event.target;
            const interactionData = {
                element_type: element.tagName.toLowerCase(),
                element_id: element.id || null,
                element_class: element.className || null,
                element_text: element.textContent?.trim().substring(0, 100) || null,
                click_position: {
                    x: event.clientX,
                    y: event.clientY
                },
                timestamp: new Date().toISOString()
            };

            gtag('event', 'click', interactionData);
            this.sendAnalyticsData('click', interactionData);
        });

        // Track scroll depth
        if (this.config.enableScrollTracking) {
            this.trackScrollDepth();
        }

        // Track time on page
        this.trackTimeOnPage();
    }

    trackScrollDepth() {
        let maxScroll = 0;
        const scrollThresholds = [25, 50, 75, 90, 100];
        const triggeredThresholds = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            maxScroll = Math.max(maxScroll, scrollPercent);
            
            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !triggeredThresholds.has(threshold)) {
                    triggeredThresholds.add(threshold);
                    gtag('event', 'scroll', {
                        scroll_depth: threshold,
                        max_scroll: maxScroll
                    });
                }
            });
        });
    }

    trackTimeOnPage() {
        const startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            gtag('event', 'timing_complete', {
                name: 'time_on_page',
                value: timeOnPage
            });
        });
    }

    trackFormSubmissions() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                const formData = new FormData(form);
                const formAnalytics = {
                    form_id: form.id || 'unknown',
                    form_action: form.action || 'unknown',
                    form_method: form.method || 'unknown',
                    field_count: form.querySelectorAll('input, select, textarea').length,
                    service_type: formData.get('service') || 'unknown',
                    budget_range: formData.get('budget') || 'unknown',
                    timestamp: new Date().toISOString()
                };

                gtag('event', 'form_submit', formAnalytics);
                this.sendAnalyticsData('form_submit', formAnalytics);
            });
        });
    }

    trackPricingInteractions() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                gtag('event', 'pricing_hover', {
                    card_index: index,
                    card_title: card.querySelector('.pricing-title')?.textContent || 'unknown',
                    timestamp: new Date().toISOString()
                });
            });

            card.addEventListener('click', () => {
                gtag('event', 'pricing_click', {
                    card_index: index,
                    card_title: card.querySelector('.pricing-title')?.textContent || 'unknown',
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    track3DInteractions() {
        // Track 3D scene interactions
        const canvas = document.getElementById('heroCanvas');
        if (canvas) {
            canvas.addEventListener('mousemove', (event) => {
                gtag('event', '3d_interaction', {
                    interaction_type: 'mouse_move',
                    coordinates: {
                        x: event.clientX,
                        y: event.clientY
                    },
                    timestamp: new Date().toISOString()
                });
            });
        }
    }

    // Performance Monitoring
    setupPerformanceMonitoring() {
        if (this.config.enablePerformanceTracking) {
            // Track Core Web Vitals
            this.trackCoreWebVitals();
            
            // Track page load performance
            this.trackPageLoadPerformance();
            
            // Track resource loading
            this.trackResourceLoading();
        }
    }

    trackCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            gtag('event', 'web_vitals', {
                metric_name: 'LCP',
                metric_value: Math.round(lastEntry.startTime),
                metric_rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs_improvement' : 'poor'
            });
        }).observe({entryTypes: ['largest-contentful-paint']});

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                gtag('event', 'web_vitals', {
                    metric_name: 'FID',
                    metric_value: Math.round(entry.processingStart - entry.startTime),
                    metric_rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs_improvement' : 'poor'
                });
            });
        }).observe({entryTypes: ['first-input']});

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            
            gtag('event', 'web_vitals', {
                metric_name: 'CLS',
                metric_value: Math.round(clsValue * 1000),
                metric_rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
            });
        }).observe({entryTypes: ['layout-shift']});
    }

    trackPageLoadPerformance() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            
            gtag('event', 'page_load_performance', {
                load_time: Math.round(loadTime),
                dom_content_loaded: Math.round(domContentLoaded),
                first_byte: Math.round(navigation.responseStart - navigation.requestStart),
                dns_lookup: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
                tcp_connection: Math.round(navigation.connectEnd - navigation.connectStart)
            });
        });
    }

    trackResourceLoading() {
        const resources = performance.getEntriesByType('resource');
        
        resources.forEach(resource => {
            gtag('event', 'resource_load', {
                resource_name: resource.name,
                resource_type: resource.initiatorType,
                load_time: Math.round(resource.duration),
                resource_size: resource.transferSize || 0
            });
        });
    }

    // Conversion Tracking
    setupConversionTracking() {
        if (this.config.enableConversionTracking) {
            // Track contact form conversions
            this.trackContactConversions();
            
            // Track pricing page views
            this.trackPricingPageViews();
            
            // Track payment initiations
            this.trackPaymentInitiations();
        }
    }

    trackContactConversions() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                gtag('event', 'conversion', {
                    send_to: this.config.googleAnalyticsId,
                    event_category: 'lead_generation',
                    event_label: 'contact_form_submission',
                    value: 1
                });
            });
        }
    }

    trackPricingPageViews() {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gtag('event', 'pricing_page_view', {
                            event_category: 'engagement',
                            event_label: 'pricing_section_viewed'
                        });
                    }
                });
            });
            
            observer.observe(pricingSection);
        }
    }

    trackPaymentInitiations() {
        const paymentButtons = document.querySelectorAll('.btn-payment, .btn-primary');
        
        paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                gtag('event', 'payment_initiation', {
                    event_category: 'conversion',
                    event_label: 'payment_button_clicked',
                    value: 1
                });
            });
        });
    }

    // SEO Monitoring
    setupSEOMonitoring() {
        // Track SEO-related metrics
        this.trackSEOMetrics();
        
        // Monitor page performance for SEO
        this.monitorSEOPerformance();
    }

    trackSEOMetrics() {
        // Track internal link clicks
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#"]');
            if (link) {
                gtag('event', 'internal_link_click', {
                    link_text: link.textContent.trim(),
                    link_href: link.getAttribute('href'),
                    event_category: 'seo'
                });
            }
        });

        // Track external link clicks
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="http"]');
            if (link && !link.href.includes(window.location.hostname)) {
                gtag('event', 'external_link_click', {
                    link_text: link.textContent.trim(),
                    link_href: link.getAttribute('href'),
                    event_category: 'seo'
                });
            }
        });
    }

    monitorSEOPerformance() {
        // Monitor page speed for SEO
        const seoMetrics = {
            page_load_time: performance.timing.loadEventEnd - performance.timing.navigationStart,
            dom_ready_time: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            first_byte_time: performance.timing.responseStart - performance.timing.navigationStart
        };

        gtag('event', 'seo_performance', seoMetrics);
    }

    // Ecommerce Tracking
    trackEcommerceEvents() {
        // Track service views
        this.trackServiceViews();
        
        // Track add to cart events (for service selection)
        this.trackAddToCart();
    }

    trackServiceViews() {
        const serviceCards = document.querySelectorAll('.feature-card, .pricing-card');
        
        serviceCards.forEach((card, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gtag('event', 'view_item', {
                            currency: 'USD',
                            value: this.getServiceValue(card),
                            items: [{
                                item_id: `service_${index}`,
                                item_name: card.querySelector('h3')?.textContent || 'Unknown Service',
                                category: 'Web Development',
                                quantity: 1
                            }]
                        });
                    }
                });
            });
            
            observer.observe(card);
        });
    }

    trackAddToCart() {
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                gtag('event', 'add_to_cart', {
                    currency: 'USD',
                    value: this.getServiceValue(button.closest('.pricing-card')),
                    items: [{
                        item_id: 'web_development_service',
                        item_name: 'Web Development Service',
                        category: 'Web Development',
                        quantity: 1
                    }]
                });
            });
        });
    }

    getServiceValue(element) {
        const priceElement = element?.querySelector('.pricing-price');
        if (priceElement) {
            const priceText = priceElement.textContent.replace(/[^0-9]/g, '');
            return parseInt(priceText) || 0;
        }
        return 0;
    }

    // Utility Methods
    sendAnalyticsData(eventType, data) {
        // Send to custom analytics endpoint
        fetch('/api/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_type: eventType,
                data: data,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                user_agent: navigator.userAgent
            })
        }).catch(error => {
            console.log('Analytics data not sent:', error);
        });
    }

    // Public API
    trackCustomEvent(eventName, parameters = {}) {
        gtag('event', eventName, parameters);
        this.sendAnalyticsData(eventName, parameters);
    }

    trackConversion(value, currency = 'USD') {
        gtag('event', 'purchase', {
            currency: currency,
            value: value,
            transaction_id: `webly_${Date.now()}`
        });
    }
}

// Initialize SEO Analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.seoAnalytics = new SEOAnalytics();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOAnalytics;
}
