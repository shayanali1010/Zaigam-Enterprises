// src/components/sections/Hero.jsx
"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { fadeInUp, float, pulseGlow } from '@/components/utils/animations';
import { FaChevronDown, FaArrowRight, FaEnvelope, FaTimes, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import mainImage from '../../../public/images/main_image.png'
import Image from 'next/image';

const Hero = () => {
  const heroRef = useRef(null);
  const [isCircleHovered, setIsCircleHovered] = useState(false);
  const [isCircleClicked, setIsCircleClicked] = useState(false);
  const [showContactCard, setShowContactCard] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    // Initial check
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    // Cleanup
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const handleCircleClick = () => {
    setIsCircleClicked(true);
    setTimeout(() => {
      setIsCircleClicked(false);
      setShowContactCard(true);
    }, 1000);
  };

  const handleCloseContactCard = () => {
    setShowContactCard(false);
  };

  // Circle animation variants
  const circleVariants = {
    initial: { 
      scale: 1, 
      rotate: 0,
      borderRadius: "50%"
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 0 30px rgba(249, 115, 22, 0.7)",
      transition: { 
        duration: 0.5, 
        ease: "easeInOut" 
      }
    },
    click: { 
      scale: [1, 0.9, 1.1, 1],
      boxShadow: ["0 0 0px rgba(249, 115, 22, 0.7)", "0 0 40px rgba(249, 115, 22, 0.9)", "0 0 0px rgba(249, 115, 22, 0.7)"],
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" 
      }
    }
  };

  // Glow animation variants
  const glowVariants = {
    initial: { 
      opacity: 0.5, 
      scale: 1 
    },
    hover: { 
      opacity: 0.8, 
      scale: 1.3,
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        repeatType: "reverse" 
      }
    },
    click: { 
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.5, 1],
      transition: { 
        duration: 1, 
        ease: "easeInOut" 
      }
    }
  };

  // Enhanced floating dots for background - more visible
  const floatingDots = Array(50).fill(0).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.3
  }));

  return (
    <section id="home" ref={heroRef} className="relative top-16 min-h-screen flex items-center pt-8 justify-center overflow-hidden parallax">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-black"></div>
        
        {/* Blueprint grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid bg-[length:40px_40px]"></div>
        </div>
        
        {/* Enhanced floating dots - more visible */}
        {floatingDots.map(dot => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-primary-400"
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [dot.opacity * 0.7, dot.opacity, dot.opacity * 0.7],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary-600/20 blur-3xl animate-pulse"></div>
        </div>
      </div>

      <Container className="z-10">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Building <span className="text-primary-400">Excellence</span> in Construction
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                Zaigam Enterprises is a leading construction company specializing in steel work, waterproofing, road construction, and sewerage systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button href="#services" variant="primary" className="group">
                  Our Services
                </Button>
                <Button 
                  onClick={() => setShowContactCard(true)} 
                  variant="secondary" 
                  className="group"
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={float}
              className="relative cursor-pointer"
              onHoverStart={() => setIsCircleHovered(true)}
              onHoverEnd={() => setIsCircleHovered(false)}
              onClick={handleCircleClick}
            >
              <motion.div 
                variants={circleVariants}
                initial="initial"
                animate={isCircleClicked ? "click" : (isCircleHovered ? "hover" : "initial")}
                className="w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/20"
              >
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-full !bg-white overflow-hidden flex items-center justify-center">
                  <Image 
                    src={mainImage} 
                    alt='Construction' 
                    height='100%' 
                    width='100%' 
                    className="object-cover"
                  />
                </div>
              </motion.div>
              <motion.div 
                variants={glowVariants}
                initial="initial"
                animate={isCircleClicked ? "click" : (isCircleHovered ? "hover" : "initial")}
                className="absolute -inset-4 bg-primary-500/20 rounded-full blur-xl"
              />
              
              {/* Enhanced Hover Hint */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isCircleHovered ? 1 : 0, y: isCircleHovered ? 0 : 10 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm"
              >
                Click for contact info
              </motion.div>
              
              {/* Ripple effect on click */}
              <AnimatePresence>
                {isCircleClicked && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.7 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-full border-4 border-primary-400"
                    transition={{ duration: 1 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Enhanced Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-10">
        <motion.div 
          className="flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="mb-2 text-sm">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            <FaChevronDown />
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Card Modal - Slides in from right */}
      <AnimatePresence>
        {showContactCard && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={handleCloseContactCard}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className={`fixed top-0 right-0 z-50 h-full w-full md:w-96 shadow-2xl overflow-hidden ${
                isDarkMode ? 'dark:bg-gray-800' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h3 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Contact Information
                  </h3>
                  <button 
                    onClick={handleCloseContactCard}
                    className={`p-2 rounded-full ${
                      isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="space-y-8 flex-1 overflow-y-auto pr-2">
                  <div className={`rounded-xl p-6 ${
                    isDarkMode ? 'bg-primary-900/30' : 'bg-primary-50'
                  }`}>
                    <h4 className={`text-lg font-semibold mb-4 ${
                      isDarkMode ? 'text-primary-400' : 'text-primary-600'
                    }`}>
                      Get in Touch
                    </h4>
                    <p className={`mb-6 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Have a project in mind? Reach out to our team for a consultation.
                    </p>
                    <Button 
                      href="#contact" 
                      variant="primary" 
                      className="w-full"
                      onClick={handleCloseContactCard}
                    >
                      Contact Form
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-full mr-4 ${
                        isDarkMode ? 'bg-primary-900/30' : 'bg-primary-100'
                      }`}>
                        <FaPhone className={`${
                          isDarkMode ? 'text-primary-400' : 'text-primary-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Phone
                        </h4>
                        <p className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          0313-1117066
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`p-3 rounded-full mr-4 ${
                        isDarkMode ? 'bg-primary-900/30' : 'bg-primary-100'
                      }`}>
                        <FaEnvelope className={`${
                          isDarkMode ? 'text-primary-400' : 'text-primary-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Email
                        </h4>
                        <p className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          mujtabahyder575@gmail.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`p-3 rounded-full mr-4 ${
                        isDarkMode ? 'bg-primary-900/30' : 'bg-primary-100'
                      }`}>
                        <FaMapMarkerAlt className={`${
                          isDarkMode ? 'text-primary-400' : 'text-primary-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Address
                        </h4>
                        <p className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          123 Construction Lane, Building City, Pakistan
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`rounded-xl p-4 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <h4 className={`font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Business Hours
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className={`flex justify-between ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className={`flex justify-between ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className={`flex justify-between ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;