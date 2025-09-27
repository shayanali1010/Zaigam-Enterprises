// src/components/layout/Footer.jsx
"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCode,
  FaExternalLinkAlt,
  FaRoad,
  FaRulerCombined,
  FaHardHat,
  FaShieldAlt,
  FaTint,
  FaHome,
} from "react-icons/fa";
import { motion } from "framer-motion";
import logoImage from "../../../public/images/logo.png";
import DeveloperProfile from "./DeveloperProfile";

const LinkSection = ({ title, items, handleLinkClick, activeSection }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800 inline-block">
      {title}
    </h4>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.href}>
          <button
            onClick={() => handleLinkClick(item.href)}
            className={`text-gray-400 hover:text-primary-500 transition-colors flex items-center group ${
              activeSection === item.href.replace("#", "")
                ? "text-primary-500 font-medium"
                : ""
            }`}
          >
            <FaArrowRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  </motion.div>
);

const ConstructionExpertise = ({ title, items }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800 inline-block">
      {title}
    </h4>
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-start">
          <div className="text-primary-500 text-xl mt-1 mr-3 flex-shrink-0">
            {item.icon}
          </div>
          <div>
            <h5 className="font-medium text-white">{item.title}</h5>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const Footer = () => {
  const [showDeveloperProfile, setShowDeveloperProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isScrolling = useRef(false);

  const checkDarkMode = useCallback(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [checkDarkMode]);

  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Our Team" },
    { href: "#contact", label: "Contact" },
  ];

  const constructionExpertise = [
    { icon: <FaRoad />, title: "Road Construction" },
    { icon: <FaRulerCombined />, title: "Paver Work" },
    { icon: <FaHardHat />, title: "Shuttering Work" },
    { icon: <FaShieldAlt />, title: "Waterproofing" },
    { icon: <FaTint />, title: "Sewerage Systems" },
    { icon: <FaHome />, title: "House Construction" },
  ];

  const contactInfo = [
    { type: "phone", icon: <FaPhone className="text-primary-500" />, text: "0313-1117066" },
    { type: "email", icon: <FaEnvelope className="text-primary-500" />, text: "mujtabahyder575@gmail.com" },
    { type: "address", icon: <FaMapMarkerAlt className="text-primary-500" />, text: "123 Construction Lane, Building City, Pakistan" },
  ];

  const currentYear = new Date().getFullYear();

  const developerInfo = {
    name: "Muhammad Shayan Ali",
    title: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/muhammad-shayan-ali-280a37276",
    phone: "+923151042392",
    email: "shayanali.1010.official@gmail.com",
    bio: "Experienced Software Engineer with a strong foundation in computer science and a passion for developing innovative solutions. Specialized in creating efficient, scalable, and maintainable software applications across various domains. Committed to staying current with emerging technologies and best practices in software development.",
  };

  // 🔹 Smooth scroll + active link handling
  const handleLinkClick = (href) => {
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      isScrolling.current = true;
      setActiveSection(targetId);

      const navbarHeight = 80;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementPosition - navbarHeight;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  // 🔹 Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollPosition = window.scrollY + 150;
      const sections = ["home", "about", "services", "team", "contact"];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
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
                <div className="relative w-10 h-10 rounded-full overflow-hidden !bg-white flex items-center justify-center shadow-lg">
                  <Image alt="Zaigam Enterprises Logo" src={logoImage} fill sizes="48px" className="object-contain" />
                </div>
                <span className="ml-3 text-xl sm:text-2xl font-bold">
                  Zaigam <span className="text-primary-500">Enterprises</span>
                </span>
              </a>
              <p className="text-gray-400 mb-6 max-w-md text-sm sm:text-base">
                Specializing in road construction, paver work, shuttering,
                waterproofing, sewerage systems, house construction, and steel
                work with uncompromising quality since 2010.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 flex-shrink-0">{info.icon}</div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-gray-400 text-sm ${
                          info.type === "phone" || info.type === "email"
                            ? "truncate"
                            : "break-words"
                        }`}
                      >
                        {info.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <LinkSection
              title="Quick Links"
              items={quickLinks}
              handleLinkClick={handleLinkClick}
              activeSection={activeSection}
            />

            {/* Construction Expertise */}
            <ConstructionExpertise title="Our Expertise" items={constructionExpertise} />
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
