"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS, MEGA_MENU } from "@/constants";
import { COLORS } from "@/constants";
import { PRODUCTS } from "@/data/products";

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
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const isNavItemActive = (href: string) => {
    if (href === "/products") return pathname === "/products" || pathname.startsWith("/products/");
    if (href === "/solutions") return pathname === "/solutions" || pathname.startsWith("/solutions/");
    if (href === "/resources")
      return (
        pathname === "/resources" ||
        pathname.startsWith("/resources/") ||
        pathname === "/downloads" ||
        pathname.startsWith("/downloads/") ||
        pathname === "/gallery" ||
        pathname.startsWith("/gallery/") ||
        pathname === "/blog" ||
        pathname.startsWith("/blog/")
      );
    if (href === "/industries") return pathname === "/industries";
    if (href === "/about") return pathname === "/about";
    if (href === "/contact") return pathname === "/contact";
    return pathname === href;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    const targetId = hash.replace(/^#/, "");
    if (!targetId) return;

    const scrollToHash = () => {
      const element = document.getElementById(targetId);
      if (!element) return;

      const top = element.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    };

    requestAnimationFrame(scrollToHash);
  }, [pathname]);

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

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as
      | ((props: { className?: string }) => React.ReactElement)
      | undefined;
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  const renderMegaMenu = (menuKey: string) => {
    if (!MEGA_MENU[menuKey as keyof typeof MEGA_MENU]) return null;

    const menu = MEGA_MENU[menuKey as keyof typeof MEGA_MENU];

    if (menuKey === "products") {
      return (
        <motion.div
          className="absolute left-1/2 mt-3 w-[720px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-2xl backdrop-blur-xl"
          variants={megaMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseEnter={() => setActiveMegaMenu(menuKey)}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Product Categories
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {menu.items.map((item) => {
                  const IconComponent = item.icon
                    ? (Icons[item.icon as keyof typeof Icons] as
                        | ((props: { className?: string }) => React.ReactElement)
                        | undefined)
                    : undefined;

                  return (
                    <Link
                      key={`${menuKey}-${item.label}-${item.href}`}
                      href={item.href}
                      className="group rounded-xl border border-slate-200 bg-slate-50/60 p-3 transition-colors hover:border-orange-200 hover:bg-white"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                          {IconComponent ? <IconComponent className="h-5 w-5" /> : null}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                            <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-orange-500" />
                          </div>
                          <p className="mt-1 text-xs leading-5 text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Featured Products
              </div>
              <div className="space-y-3">
                {PRODUCTS.slice(0, 3).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 transition-colors hover:border-orange-200 hover:bg-orange-50/40"
                  >
                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-slate-100">
                      <img
                        src={product.images[0]?.url ?? "/products/placeholder.jpg"}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex max-w-full truncate rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-700">
                        {product.compatibleEngines[0] ?? product.brand}
                      </span>
                      <div className="mt-1 text-sm font-semibold text-slate-800">{product.name}</div>
                    </div>
                    <span className="text-xs font-medium text-sky-700">View</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    if (menuKey === "solutions") {
      return (
        <motion.div
          className="absolute left-1/2 mt-3 w-[440px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-2xl backdrop-blur-xl"
          variants={megaMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseEnter={() => setActiveMegaMenu(menuKey)}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {menu.items.map((item) => {
              const IconComponent = item.icon
                ? (Icons[item.icon as keyof typeof Icons] as
                    | ((props: { className?: string }) => React.ReactElement)
                    | undefined)
                : undefined;

              return (
                <Link
                  key={`${menuKey}-${item.label}-${item.href}`}
                  href={item.href}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition-colors hover:border-orange-200 hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                      {IconComponent ? <IconComponent className="h-5 w-5" /> : null}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                      <div className="text-xs text-slate-600">{item.description}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        className="absolute left-1/2 mt-3 w-[420px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-2xl backdrop-blur-xl"
        variants={megaMenuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onMouseEnter={() => setActiveMegaMenu(menuKey)}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="grid gap-2">
          {menu.items.map((item) => (
            <Link
              key={`${menuKey}-${item.label}`}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-orange-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    );
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
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(item.href);
              const isMegaMenuItem =
                item.label === "Products" ||
                item.label === "Solutions" ||
                item.label === "Resources";

              return (
                <div key={item.href} className="relative group">
                  {isMegaMenuItem ? (
                    <button
                      type="button"
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-all",
                        isScrolled
                          ? isActive
                            ? "text-orange-600 bg-orange-50"
                            : "text-gray-900 hover:bg-gray-100"
                          : isActive
                            ? "text-white bg-white/10"
                            : "text-white hover:bg-white/10",
                        "shadow-none"
                      )}
                      style={
                        !isScrolled
                          ? { textShadow: "0 2px 4px rgba(0,0,0,0.3)" }
                          : {}
                      }
                      onMouseEnter={() => {
                        setActiveMegaMenu(item.label.toLowerCase());
                      }}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                      <span className="flex items-center space-x-1">
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex px-3 py-2 rounded-md text-sm font-medium transition-all",
                        isScrolled
                          ? isActive
                            ? "text-orange-600 bg-orange-50"
                            : "text-gray-900 hover:bg-gray-100"
                          : isActive
                            ? "text-white bg-white/10"
                            : "text-white hover:bg-white/10"
                      )}
                      style={
                        !isScrolled
                          ? { textShadow: "0 2px 4px rgba(0,0,0,0.3)" }
                          : {}
                      }
                    >
                      {item.label}
                    </Link>
                  )}

                  {isMegaMenuItem && (
                    <AnimatePresence>
                      {activeMegaMenu === item.label.toLowerCase() &&
                        renderMegaMenu(item.label.toLowerCase())}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
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
                {MAIN_NAV_ITEMS.map((item) => {
                  const isActive = isNavItemActive(item.href);

                  return (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-3 py-2 rounded-md transition-colors",
                          isActive
                            ? "bg-orange-50 text-orange-600 font-semibold"
                            : "text-gray-900 hover:bg-gray-100"
                        )}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </div>
                  );
                })}
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
