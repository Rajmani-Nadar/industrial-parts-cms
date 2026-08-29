"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS, MEGA_MENU } from "@/constants";
import { COLORS } from "@/constants";

/**
 * Navbar Component
 * Sticky transparent navbar with mega menu placeholder
 * Features:
 * - Transparent background with scroll detection
 * - Mobile-responsive hamburger menu
 * - Mega menu placeholder for products/solutions
 * - Smooth animations with Framer Motion
 */

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
        setActiveMegaMenu(null);
      }
    };

    if (isMobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobileOpen]);

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const megaMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled
          ? "bg-white/95 shadow-lg border-b border-gray-100"
          : "bg-black/20"
      )}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <div
              className="w-10 h-10 rounded-lg"
              style={{ backgroundColor: COLORS.navy[500] }}
            />
            <span
              className="text-xl font-bold hidden sm:inline transition-colors duration-300"
              style={{
                color: isScrolled ? COLORS.navy[500] : "white",
                textShadow: isScrolled ? "none" : "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Industrial
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <div key={item.href} className="relative group">
                <button
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all",
                    isScrolled
                      ? "text-gray-900 hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  )}
                  style={
                    !isScrolled
                      ? { textShadow: "0 2px 4px rgba(0,0,0,0.3)" }
                      : {}
                  }
                  onMouseEnter={() => {
                    if (
                      item.label === "Products" ||
                      item.label === "Solutions"
                    ) {
                      setActiveMegaMenu(item.label.toLowerCase());
                    }
                  }}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <span className="flex items-center space-x-1">
                    <span>{item.label}</span>
                    {(item.label === "Products" ||
                      item.label === "Solutions") && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {/* Mega Menu Placeholder */}
                {(item.label === "Products" || item.label === "Solutions") && (
                  <AnimatePresence>
                    {activeMegaMenu ===
                      item.label.toLowerCase() && (
                      <motion.div
                        className="absolute left-0 mt-0 w-96 bg-white rounded-lg shadow-2xl p-6 border border-gray-200"
                        variants={megaMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onMouseEnter={() =>
                          setActiveMegaMenu(item.label.toLowerCase())
                        }
                        onMouseLeave={() => setActiveMegaMenu(null)}
                      >
                        <div className="space-y-4">
                          <div>
                            <h3
                              className="font-bold text-sm mb-3"
                              style={{ color: COLORS.navy[500] }}
                            >
                              Featured
                            </h3>
                            <p className="text-xs text-gray-600">
                              Mega menu content placeholder for{" "}
                              {item.label}
                            </p>
                          </div>

                          <div className="space-y-2">
                            {["Option 1", "Option 2", "Option 3"].map(
                              (option) => (
                                <Link
                                  key={option}
                                  href="#"
                                  className="block text-sm text-gray-700 hover:text-orange-500 transition-colors"
                                >
                                  {option}
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="hidden sm:inline-block px-6 py-2 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: COLORS.orange[500],
                color: COLORS.white,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <X
                  className="w-6 h-6"
                  style={{ color: COLORS.navy[500] }}
                />
              ) : (
                <Menu
                  className="w-6 h-6"
                  style={{
                    color: isScrolled
                      ? COLORS.navy[500]
                      : COLORS.white,
                  }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-gray-200"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="px-4 py-4 space-y-2">
                {MAIN_NAV_ITEMS.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
                <button
                  className="w-full mt-4 px-4 py-2 rounded-lg font-medium"
                  style={{
                    backgroundColor: COLORS.orange[500],
                    color: COLORS.white,
                  }}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
