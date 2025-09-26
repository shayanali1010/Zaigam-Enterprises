// src/components/layout/Navbar.jsx
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import logoImage from '../../../public/images/logo.png';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    setDarkMode(currentTheme === 'dark');
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' },
  ];

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05,
      color: darkMode ? "#f97316" : "#ea580c",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      rotate: darkMode ? 180 : 0,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full bg-white dark:bg-gray-800 shadow-md z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a 
          href='#home' 
          className="flex items-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-500 flex items-center justify-center shadow-md">
            <Image 
              alt='Zaigam Enterprises Logo' 
              height='40' 
              width='40' 
              src={logoImage}
              className="object-cover"
            />
          </div>
          <span className="ml-2 text-xl font-bold">Zaigam <span className='text-primary-500'>Enterprises</span></span>
        </motion.a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              variants={linkVariants}
              whileHover="hover"
              className="text-gray-700 dark:text-gray-300 font-medium transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'} transition-colors shadow-sm`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </motion.button>
        </div>
        
        {/* Mobile Menu Button */}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={toggleMenu} 
          className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="px-4 py-6">
              {/* Logo and Company Name in Mobile Menu */}
              <div className="flex items-center justify-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-500 flex items-center justify-center shadow-md">
                  <Image 
                    alt='Zaigam Enterprises Logo' 
                    height='48' 
                    width='48' 
                    src={logoImage}
                    className="object-cover"
                  />
                </div>
                <span className="ml-3 text-2xl font-bold">Zaigam <span className='text-primary-500'>Enterprises</span></span>
              </div>
              
              {/* Navigation Links */}
              <div className="space-y-4 mb-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={linkVariants}
                    whileHover="hover"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              
              {/* Dark Mode Toggle in Mobile Menu */}
              <div className="flex justify-center">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleDarkMode} 
                  className={`flex items-center justify-center w-14 h-14 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'} transition-colors shadow-md`}
                >
                  {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;