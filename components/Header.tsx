import React, { useState, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  currentPage?: string;
  showGetStarted?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentPage = 'home', 
  showGetStarted = true 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  const navItems = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'features', label: 'Features', href: 'index.html#features' },
    { id: 'pricing', label: 'Pricing', href: 'index.html#pricing' },
    { id: 'contact', label: 'Contact', href: 'index.html#contact' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <a href="index.html" onClick={(e) => {
            if (currentPage === 'home') {
              e.preventDefault();
              scrollToSection('hero');
            }
          }}>
            <img 
              src="../Public/Images/webly logo.png" 
              alt="Webly Industries" 
              className="logo-image"
            />
            <span className="logo-text">Webly Industries</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a 
                href={item.href}
                className={currentPage === item.id ? 'active' : ''}
                onClick={(e) => {
                  if (currentPage === 'home' && item.id !== 'home') {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        {showGetStarted && (
          <a 
            href="index.html#contact" 
            className="cta-button"
            onClick={(e) => {
              if (currentPage === 'home') {
                e.preventDefault();
                scrollToSection('contact');
              }
            }}
          >
            Get Started
          </a>
        )}

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={item.href}
                  className={currentPage === item.id ? 'active' : ''}
                  onClick={(e) => {
                    if (currentPage === 'home' && item.id !== 'home') {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }
                    closeMobileMenu();
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          {showGetStarted && (
            <a 
              href="index.html#contact" 
              className="mobile-cta-button"
              onClick={(e) => {
                if (currentPage === 'home') {
                  e.preventDefault();
                  scrollToSection('contact');
                }
                closeMobileMenu();
              }}
            >
              Get Started
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
