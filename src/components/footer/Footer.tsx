"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { FOOTER_LINKS, SOCIAL_LINKS, COLORS } from "@/constants";

/**
 * Footer Component
 * Premium enterprise footer with multiple sections, links, and contact information
 */

export function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer
      className="bg-gray-900 text-gray-100"
      style={{ backgroundColor: COLORS.navy[900] }}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div
                className="w-10 h-10 rounded-lg"
                style={{ backgroundColor: COLORS.orange[500] }}
              />
              <span className="text-xl font-bold">Industrial</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Enterprise industrial automation and control solutions for modern
              manufacturing.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:hello@industrial.com"
                className="flex items-center space-x-2 text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@industrial.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (234) 567-890</span>
              </a>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(FOOTER_LINKS).map(([key, section]) => (
            <motion.div key={key} variants={itemVariants}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ backgroundColor: COLORS.orange[500] }}
                  whileHover={{ scale: 1.1 }}
                  title={social.platform}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {/* Icon placeholder */}
                    <span className="text-xs font-bold">
                      {social.platform.charAt(0)}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="font-medium text-white mb-2 text-sm">
                Subscribe to updates
              </h4>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded text-sm bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": COLORS.orange[500] } as any}
                />
                <motion.button
                  type="submit"
                  className="px-4 py-2 rounded text-sm font-medium text-white transition-all"
                  style={{ backgroundColor: COLORS.orange[500] }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t py-8"
        style={{ borderColor: COLORS.navy[700] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Industrial. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
