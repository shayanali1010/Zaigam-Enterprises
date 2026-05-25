// src/components/layout/Navbar.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import logoImage from "../../../public/images/logo.png";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef(null);
  const isScrolling = useRef(false);

  // 🔹 Detect system theme + localStorage preference
  useEffect(() => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const storedTheme = localStorage.getItem("theme");

    const initialDarkMode = storedTheme
      ? storedTheme === "dark"
      : systemPrefersDark;

    setDarkMode(initialDarkMode);
    document.documentElement.classList.toggle("dark", initialDarkMode);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

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

    // Handle initial hash
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      setActiveSection(targetId);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          window.scrollTo({
            top: targetElement.offsetTop - (navRef.current?.offsetHeight || 0),
            behavior: "smooth",
          });
        }, 100);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Toggle theme manually
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (href) => {
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setIsMenuOpen(false);
      isScrolling.current = true;
      setActiveSection(targetId);

      setTimeout(() => {
        const navbarHeight = navRef.current?.offsetHeight || 0;
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const targetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }, 400);
    }
  };

  const navLinks = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#services", label: "Services", id: "services" },
    // { href: "#team", label: "Team", id: "team" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, scaleY: 0, transformOrigin: "top" },
    visible: { opacity: 1, scaleY: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.2 } },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      color: darkMode ? "#f97316" : "#ea580c",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      rotate: darkMode ? 180 : 0,
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.nav
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full bg-white dark:bg-gray-800 shadow-md z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="flex items-center cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsMenuOpen(false);
            setActiveSection("home");
          }}
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden !bg-white flex items-center justify-center shadow-md">
            <Image
              alt="Zaigam Enterprises Logo"
              src={logoImage}
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
            Zaigam <span className="text-primary-500">Enterprises</span>
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.button
              key={link.href}
              variants={linkVariants}
              whileHover="hover"
              onClick={() => handleLinkClick(link.href)}
              className={`text-gray-700 dark:text-gray-300 font-medium transition-colors bg-transparent border-none cursor-pointer relative ${
                activeSection === link.id
                  ? "text-primary-500 dark:text-primary-400"
                  : ""
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 dark:bg-primary-400"
                  layoutId="activeSection"
                />
              )}
            </motion.button>
          ))}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-200 text-gray-700"
            } transition-colors shadow-sm`}
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
            className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50"
          >
            <div className="px-4 py-6">
              {/* Logo */}
              <div className="flex items-center justify-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative w-9 h-9 rounded-full overflow-hidden !bg-white flex items-center justify-center shadow-md">
                  <Image
                    alt="Zaigam Enterprises Logo"
                    src={logoImage}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                  Zaigam <span className="text-primary-500">Enterprises</span>
                </span>
              </div>

              {/* Links */}
              <div className="space-y-4 mb-8">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    variants={linkVariants}
                    whileHover="hover"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleLinkClick(link.href)}
                    className={`block w-full text-left py-3 px-4 text-lg font-medium transition-colors bg-transparent border-none cursor-pointer rounded-lg ${
                      activeSection === link.id
                        ? "bg-primary-100 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex justify-center">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleDarkMode}
                  className={`flex items-center justify-center w-14 h-14 rounded-full ${
                    darkMode
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-200 text-gray-700"
                  } transition-colors shadow-md`}
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
