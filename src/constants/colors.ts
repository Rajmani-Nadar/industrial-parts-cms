/**
 * Color Palette for Industrial B2B Website
 * Premium enterprise color scheme with Navy, Steel Gray, White, and Orange accents
 */

export const COLORS = {
  // Primary Colors
  navy: {
    50: "#F0F4F9",
    100: "#DFE8F3",
    200: "#BFD1E7",
    300: "#9FBADB",
    400: "#7FA3CF",
    500: "#003366", // Primary Navy
    600: "#002952",
    700: "#00203D",
    800: "#001829",
    900: "#001014",
  },

  // Secondary Colors - Steel Gray
  steel: {
    50: "#F7F9FB",
    100: "#EFF3F7",
    200: "#DFE7EF",
    300: "#CFDBE7",
    400: "#BFCFDF",
    500: "#4A6FA5", // Steel Gray
    600: "#3E5A88",
    700: "#32456B",
    800: "#26304E",
    900: "#1A1B31",
  },

  // Accent Colors
  orange: {
    50: "#FFF5E6",
    100: "#FFEBCC",
    200: "#FFD699",
    300: "#FFC266",
    400: "#FFAD33",
    500: "#FF9800", // Primary Orange
    600: "#E68900",
    700: "#CC7700",
    800: "#B36600",
    900: "#995500",
  },

  // Neutral Colors
  white: "#FFFFFF",
  black: "#000000",

  // Neutral Grays
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Status Colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
} as const;

// CSS variable names for Tailwind
export const TAILWIND_COLORS = {
  primary: "var(--color-navy-500)",
  secondary: "var(--color-steel-500)",
  accent: "var(--color-orange-500)",
  background: "var(--color-white)",
  foreground: "var(--color-navy-900)",
} as const;
