// src/components/layout/DeveloperProfile.jsx
"use client";
import React from "react";
import { FaLinkedin, FaEnvelope, FaPhone, FaTimes, FaCopy } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ContactItem = ({ 
  icon: Icon, 
  text, 
  itemKey, 
  isDarkMode, 
  copyToClipboard, 
  copied, 
  copiedItem, 
  showCopyHint, 
  setShowCopyHint 
}) => (
  <div className="relative">
    <div
      onClick={() => copyToClipboard(text, itemKey)}
      onMouseEnter={() => setShowCopyHint(itemKey)}
      onMouseLeave={() => setShowCopyHint(null)}
      className={`flex items-center cursor-pointer p-3 rounded-lg border transition-colors ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
          : "bg-gray-50 border-gray-300 hover:bg-gray-200"
      }`}
    >
      <Icon className="text-primary-500 mr-3 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <span
          className={`text-sm sm:text-base block truncate ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {text}
        </span>
      </div>
      <div className="flex items-center ml-2 flex-shrink-0">
        {copied && copiedItem === itemKey && (
          <span
            className={`text-xs font-medium mr-2 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            Copied!
          </span>
        )}
        {showCopyHint === itemKey && !copied && (
          <span
            className={`text-xs mr-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Click to copy
          </span>
        )}
        <FaCopy className="text-sm" />
      </div>
    </div>
  </div>
);

const DeveloperProfile = ({
  showDeveloperProfile,
  setShowDeveloperProfile,
  isDarkMode,
  developerInfo,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [showCopyHint, setShowCopyHint] = React.useState(null);
  const [copiedItem, setCopiedItem] = React.useState(null);

  const copyToClipboard = React.useCallback((text, item) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedItem(item);
    setTimeout(() => {
      setCopied(false);
      setCopiedItem(null);
    }, 2000);
  }, []);

  return (
    <AnimatePresence>
      {showDeveloperProfile && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowDeveloperProfile(false)}
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Popup Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25 }}
              className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {developerInfo.name}
                    </h2>
                    <p className="text-primary-100 mt-1">
                      {developerInfo.title}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDeveloperProfile(false)}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Bio */}
                <div className="mb-6">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    About
                  </h3>
                  <p
                    className={`text-sm sm:text-base ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {developerInfo.bio}
                  </p>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 mb-6">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Contact Information
                  </h3>

                  <ContactItem
                    icon={FaPhone}
                    text={developerInfo.phone}
                    itemKey="phone"
                    isDarkMode={isDarkMode}
                    copyToClipboard={copyToClipboard}
                    copied={copied}
                    copiedItem={copiedItem}
                    showCopyHint={showCopyHint}
                    setShowCopyHint={setShowCopyHint}
                  />

                  <ContactItem
                    icon={FaEnvelope}
                    text={developerInfo.email}
                    itemKey="email"
                    isDarkMode={isDarkMode}
                    copyToClipboard={copyToClipboard}
                    copied={copied}
                    copiedItem={copiedItem}
                    showCopyHint={showCopyHint}
                    setShowCopyHint={setShowCopyHint}
                  />
                </div>

                {/* LinkedIn Links */}
                <div className="space-y-3">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Connect
                  </h3>

                  <motion.a
                    href={developerInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaLinkedin className="mr-2" />
                    View LinkedIn Profile
                  </motion.a>

                  <ContactItem
                    icon={FaLinkedin}
                    text={developerInfo.linkedin}
                    itemKey="linkedin"
                    isDarkMode={isDarkMode}
                    copyToClipboard={copyToClipboard}
                    copied={copied}
                    copiedItem={copiedItem}
                    showCopyHint={showCopyHint}
                    setShowCopyHint={setShowCopyHint}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeveloperProfile;
