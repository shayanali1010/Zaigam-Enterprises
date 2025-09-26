// src/components/layout/Footer.jsx
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaLinkedin, FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import logoImage from '../../../public/images/logo.png';
import DeveloperProfile from "./DeveloperProfile";

const Footer = () => {
  const [showDeveloperProfile, setShowDeveloperProfile] = useState(false);
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
  
  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Our Team" },
    { href: "#contact", label: "Contact" },
  ];

  const services = [
    { href: "#", label: "Steel Work" },
    { href: "#", label: "Waterproofing" },
    { href: "#", label: "Road Construction" },
    { href: "#", label: "Sewerage Systems" },
  ];

  const contactInfo = [
    {
      type: 'phone',
      icon: <FaPhone className="text-primary-500" />,
      text: "0313-1117066"
    },
    {
      type: 'email',
      icon: <FaEnvelope className="text-primary-500" />,
      text: "mujtabahyder575@gmail.com"
    },
    {
      type: 'address',
      icon: <FaMapMarkerAlt className="text-primary-500" />,
      text: "123 Construction Lane, Building City, Pakistan"
    }
  ];

  const currentYear = new Date().getFullYear();

  const developerInfo = {
    name: "Muhammad Shayan Ali",
    title: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/muhammad-shayan-ali-280a37276",
    phone: "+923151042392",
    email: "shayanali.1010.official@gmail.com",
    bio: "Experienced Software Engineer with a strong foundation in computer science and a passion for developing innovative solutions. Specialized in creating efficient, scalable, and maintainable software applications across various domains. Committed to staying current with emerging technologies and best practices in software development."
  };

  return (
    <>
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid bg-[length:40px_40px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Company Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <a href="#home" className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-500 flex items-center justify-center shadow-lg">
                  <Image
                    alt="Zaigam Enterprises Logo"
                    height="48"
                    width="48"
                    src={logoImage}
                    className="object-cover"
                  />
                </div>
                <span className="ml-3 text-xl sm:text-2xl font-bold">
                  Zaigam <span className="text-primary-500">Enterprises</span>
                </span>
              </a>
              <p className="text-gray-400 mb-6 max-w-md text-sm sm:text-base">
                Building excellence in construction with innovative solutions and 
                unwavering commitment to quality since 2010.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-gray-400 text-sm ${
                        info.type === 'phone' || info.type === 'email' ? 'truncate' : 'break-words'
                      }`}>
                        {info.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-500 transition-colors flex items-center group"
                    >
                      <FaArrowRight className="text-xs mr-2 opacity:0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800 inline-block">
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.href}>
                    <a
                      href={service.href}
                      className="text-gray-400 hover:text-primary-500 transition-colors flex items-center group"
                    >
                      <FaArrowRight className="text-xs mr-2 opacity:0 group-hover:opacity-100 transition-opacity" />
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Developer Credit & Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0 text-center md:text-left text-sm">
                &copy; {currentYear} Zaigam Enterprises. All rights reserved.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2 sm:mb-0 sm:mr-3">
                  <FaCode className="text-primary-500 mr-2" />
                  <span>Website developed by:</span>
                </div>
                <motion.button
                  onClick={() => setShowDeveloperProfile(true)}
                  className="flex items-center bg-primary-900/50 hover:bg-primary-900/70 text-primary-400 hover:text-primary-300 transition-colors group px-4 py-2 rounded-full cursor-pointer text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-medium">Muhammad Shayan Ali</span>
                  <FaExternalLinkAlt className="ml-2 text-xs transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Developer Profile Popup */}
      <DeveloperProfile 
        showDeveloperProfile={showDeveloperProfile}
        setShowDeveloperProfile={setShowDeveloperProfile}
        isDarkMode={isDarkMode}
        developerInfo={developerInfo}
      />
    </>
  );
};

export default Footer;