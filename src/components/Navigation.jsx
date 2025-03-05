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

  // Navigation items
  const navItems = [
    { name: 'Programs', target: 'features' },
    { name: 'About', target: 'about' },
    { name: 'Success Stories', target: 'testimonials' },
    { name: 'Contact', target: 'contact' }
  ];

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
          <Link 
            to="header" 
            spy={true} 
            smooth={true} 
            className="navbar-brand" 
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#c4a43f',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
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
            Nexus Academy
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu" style={{ 
            display: 'flex', 
            gap: '40px',
            alignItems: 'center',
            '@media (max-width: 992px)': {
              display: 'none'
            }
          }}>
            {navItems.map((item) => (
              <Link
                key={item.target}
                to={item.target}
                spy={true}
                smooth={true}
                offset={-80}
                duration={800}
                activeClass="active-nav-item"
                onClick={() => {
                  if (isMobileMenuOpen) setMobileMenuOpen(false);
                  requestAnimationFrame(() => {
                    const target = document.getElementById(item.target);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  });
                }}
                style={{
                  color: '#fff',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '8px 0',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                {item.name}
                <motion.div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#c4a43f',
                    scaleX: 0,
                    transformOrigin: 'right'
                  }}
                  whileHover={{ scaleX: 1, transformOrigin: 'left' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              '@media (max-width: 992px)': {
                display: 'block'
              }
            }}
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 45, y: 5 },
                closed: { rotate: 0 }
              }}
              style={{
                width: '30px',
                height: '2px',
                background: '#c4a43f',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '30px',
                  height: '2px',
                  background: '#c4a43f',
                  top: '-8px',
                  left: 0,
                  transition: 'all 0.3s ease'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '30px',
                  height: '2px',
                  background: '#c4a43f',
                  top: '8px',
                  left: 0,
                  transition: 'all 0.3s ease'
                }
              }}
            />
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '300px',
                  background: 'rgba(5, 36, 83, 0.98)',
                  backdropFilter: 'blur(12px)',
                  padding: '100px 30px',
                  zIndex: 999,
                  boxShadow: '-4px 0 20px rgba(0,0,0,0.2)'
                }}
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.target}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                  >
                    <Link
                      to={item.target}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={800}
                      activeClass="active-nav-item"
                      onClick={() => {
                        if (isMobileMenuOpen) setMobileMenuOpen(false);
                        requestAnimationFrame(() => {
                          const target = document.getElementById(item.target);
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        });
                      }}
                      style={{
                        display: 'block',
                        color: '#fff',
                        fontSize: '1.4rem',
                        padding: '15px 0',
                        borderBottom: '1px solid rgba(196, 164, 63, 0.2)',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#c4a43f',
                          paddingLeft: '15px'
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};
