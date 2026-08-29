/**
 * Navigation Structure for Industrial B2B Website
 * Defines main navigation items and mega menu categories
 */

export type NavItemType = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  subItems?: NavItemType[];
};

export type MegaMenuCategory = {
  title: string;
  items: NavItemType[];
  featured?: {
    title: string;
    description: string;
    image?: string;
  };
};

export const MAIN_NAV_ITEMS: NavItemType[] = [
  {
    label: "Products",
    href: "/products",
    description: "Explore our industrial solutions",
  },
  {
    label: "Solutions",
    href: "/solutions",
    description: "Industry-specific solutions",
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Documentation and guides",
  },
  {
    label: "About",
    href: "/about",
    description: "Learn about us",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch",
  },
];

export const MEGA_MENU: Record<string, MegaMenuCategory> = {
  products: {
    title: "Products",
    items: [
      {
        label: "Automation Systems",
        href: "/products/automation",
        description: "Industrial automation solutions",
        icon: "Cpu",
      },
      {
        label: "Control Systems",
        href: "/products/control",
        description: "Advanced control technologies",
        icon: "Zap",
      },
      {
        label: "Monitoring Tools",
        href: "/products/monitoring",
        description: "Real-time system monitoring",
        icon: "Eye",
      },
      {
        label: "Safety Systems",
        href: "/products/safety",
        description: "Enterprise safety solutions",
        icon: "Shield",
      },
    ],
    featured: {
      title: "Enterprise Solution Suite",
      description: "Complete integration across all industrial operations",
    },
  },
  solutions: {
    title: "Solutions",
    items: [
      {
        label: "Manufacturing",
        href: "/solutions/manufacturing",
        description: "Smart factory solutions",
        icon: "Factory",
      },
      {
        label: "Logistics",
        href: "/solutions/logistics",
        description: "Supply chain optimization",
        icon: "Truck",
      },
      {
        label: "Energy",
        href: "/solutions/energy",
        description: "Power management systems",
        icon: "Zap",
      },
      {
        label: "Infrastructure",
        href: "/solutions/infrastructure",
        description: "Critical infrastructure protection",
        icon: "Building2",
      },
    ],
    featured: {
      title: "Industry 4.0 Ready",
      description: "Next-generation industrial solutions",
    },
  },
  resources: {
    title: "Resources",
    items: [
      {
        label: "Documentation",
        href: "/resources/docs",
        description: "Technical documentation",
        icon: "BookOpen",
      },
      {
        label: "API Reference",
        href: "/resources/api",
        description: "Integration guides",
        icon: "Code",
      },
      {
        label: "Case Studies",
        href: "/resources/case-studies",
        description: "Success stories from customers",
        icon: "Briefcase",
      },
      {
        label: "White Papers",
        href: "/resources/white-papers",
        description: "In-depth industry analysis",
        icon: "FileText",
      },
    ],
    featured: {
      title: "Knowledge Base",
      description: "Comprehensive technical resources",
    },
  },
};

// Footer Navigation
export const FOOTER_LINKS = {
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
    ],
  },
  products: {
    title: "Products",
    links: [
      { label: "Automation", href: "/products/automation" },
      { label: "Control Systems", href: "/products/control" },
      { label: "Monitoring", href: "/products/monitoring" },
      { label: "Safety", href: "/products/safety" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/resources/docs" },
      { label: "API Docs", href: "/resources/api" },
      { label: "Support", href: "/support" },
      { label: "Community", href: "/community" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
};

export const SOCIAL_LINKS = [
  { platform: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { platform: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { platform: "GitHub", href: "https://github.com", icon: "Github" },
  { platform: "YouTube", href: "https://youtube.com", icon: "Youtube" },
];
