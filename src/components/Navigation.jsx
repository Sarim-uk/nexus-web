import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';

export const Navigation = (props) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu-overlay') && !e.target.closest('.menu-button')) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMobileMenuOpen]);

  // Navigation items
  const navItems = [
    { name: 'Programs', target: 'features' },
    { name: 'About', target: 'about' },
    { name: 'Success Stories', target: 'testimonials' },
    { name: 'Contact', target: 'contact' }
  ];

  // Handle navigation click
  const handleNavClick = (targetId) => {
    console.log(`Navigating to: ${targetId}`);
    setMobileMenuOpen(false);
    
    // Use setTimeout to allow the menu to close first
    setTimeout(() => {
      // Try to find the element with the exact ID
      let targetElement = document.getElementById(targetId);
      
      // If not found, try to find it as a child element
      if (!targetElement) {
        console.log(`Element with ID ${targetId} not found directly, searching for children...`);
        const sections = document.querySelectorAll(`[id*="${targetId}"]`);
        if (sections.length > 0) {
          targetElement = sections[0];
          console.log(`Found element with ID containing ${targetId}`);
        }
      }
      
      if (targetElement) {
        console.log(`Found element, scrolling to ${targetId}`);
        const navbarHeight = 80;
        
        // Use scrollIntoView for better compatibility
        targetElement.scrollIntoView({ behavior: 'smooth' });
        
        // Apply offset after scrolling
        setTimeout(() => {
          window.scrollBy({
            top: -navbarHeight,
            behavior: 'smooth'
          });
        }, 100);
      } else {
        console.error(`Element with ID ${targetId} not found`);
      }
    }, 300);
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar navbar-default navbar-fixed-top"
      style={{ 
        background: scrolled ? 'rgba(5, 36, 83, 0.95)' : 'rgba(5, 36, 83, 0.8)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s ease',
        height: '80px',
        padding: '0 5%',
        borderBottom: `2px solid ${scrolled ? '#c4a43f55' : 'transparent'}`
      }}
    >
      <div className="container" style={{ 
        maxWidth: '1400px',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="flex-space-between" style={{ 
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo/Brand */}
          <div 
            className="navbar-brand" 
            onClick={() => handleNavClick('header')}
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#c4a43f',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
          >
            <img 
              src={process.env.PUBLIC_URL + '/img/nexus-logo.png'} 
              alt="Nexus Academy" 
              style={{ 
                height: '50px', 
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                display: 'block',
                width: 'auto',
                marginRight: '12px'
              }}
            />
            <span className="brand-text">Nexus Academy</span>
          </div>

          {/* Menu Button (visible on all screen sizes) */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="menu-button"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1050,
              position: 'relative',
              width: '40px',
              height: '40px',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.3 }}
                className="mobile-menu-overlay"
              >
                <div className="mobile-menu-content">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.target}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mobile-menu-item"
                    >
                      <div
                        onClick={() => handleNavClick(item.target)}
                        className="mobile-nav-link"
                      >
                        {item.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};
