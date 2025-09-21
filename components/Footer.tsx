import React from 'react';
import './Footer.css';

interface FooterProps {
  currentPage?: string;
  tagline?: string;
  showFullFooter?: boolean;
}

const Footer: React.FC<FooterProps> = ({ 
  currentPage = 'home',
  tagline = 'Built with cutting-edge technology',
  showFullFooter = true 
}) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', href: 'index.html' },
    { label: 'Features', href: 'index.html#features' },
    { label: 'Pricing', href: 'index.html#pricing' },
    { label: 'Contact', href: 'index.html#contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {showFullFooter && (
          <>
            {/* Main Footer Content */}
            <div className="footer-main">
              <div className="footer-section">
                <h3 className="footer-title">Webly Industries</h3>
                <p className="footer-description">
                  Transforming the web with cutting-edge technology, AI-powered solutions, 
                  and stunning 3D experiences that captivate and convert.
                </p>
                <div className="footer-contact">
                  <p>📧 ZaneLaFaver@gmail.com</p>
                  <p>📱 +1 (385) 253-2721</p>
                  <p>🌐 Available worldwide</p>
                </div>
              </div>

              <div className="footer-section">
                <h4 className="footer-subtitle">Quick Links</h4>
                <ul className="footer-links">
                  {footerLinks.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        onClick={(e) => {
                          if (currentPage === 'home' && link.href.includes('#')) {
                            e.preventDefault();
                            const sectionId = link.href.split('#')[1];
                            scrollToSection(sectionId);
                          }
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h4 className="footer-subtitle">Services</h4>
                <ul className="footer-links">
                  <li><a href="ai-powered-intelligence.html">AI-Powered Intelligence</a></li>
                  <li><a href="3d-webgl-graphics.html">3D WebGL Graphics</a></li>
                  <li><a href="lightning-performance.html">Lightning Performance</a></li>
                  <li><a href="mobile-first-design.html">Mobile-First Design</a></li>
                  <li><a href="enterprise-security.html">Enterprise Security</a></li>
                  <li><a href="advanced-analytics.html">Advanced Analytics</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4 className="footer-subtitle">Resources</h4>
                <ul className="footer-links">
                  <li><a href="index.html#pricing">Pricing Plans</a></li>
                  <li><a href="index.html#contact">Get Started</a></li>
                  <li><a href="mailto:ZaneLaFaver@gmail.com">Support</a></li>
                  <li><a href="https://weblyindustries.com">Documentation</a></li>
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div className="footer-social">
              <h4 className="footer-subtitle">Follow Us</h4>
              <div className="social-links">
                <a href="https://twitter.com/WeblyIndustries" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">🐦</span>
                  Twitter
                </a>
                <a href="https://linkedin.com/company/webly-industries" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">💼</span>
                  LinkedIn
                </a>
                <a href="https://github.com/webly-industries" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">🐙</span>
                  GitHub
                </a>
              </div>
            </div>
          </>
        )}

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {currentYear} Webly Industries. All rights reserved.
            </p>
            {tagline && (
              <p className="footer-tagline">| {tagline}</p>
            )}
            <button 
              className="scroll-to-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              ↑
            </button>
          </div>
          
          <div className="footer-legal">
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="terms-of-service.html">Terms of Service</a>
            <a href="cookie-policy.html">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
