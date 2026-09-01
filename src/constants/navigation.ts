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
    label: "Industries",
    href: "/industries",
    description: "Industry applications and use cases",
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
        label: "Engine Braking Systems",
        href: "/products?category=engine-braking-systems",
        description: "High-performance braking components for diesel powertrains",
        icon: "Gauge",
      },
      {
        label: "Bleeder Brakes",
        href: "/products?category=bleeder-brakes",
        description: "Precision brake assemblies and repair kits",
        icon: "ShieldCheck",
      },
      {
        label: "Generator Accessories",
        href: "/products?category=generator-accessories",
        description: "Power generation support components and spares",
        icon: "BatteryCharging",
      },
      {
        label: "ATS Controllers",
        href: "/products?category=ats-controllers",
        description: "Automatic transfer switch control solutions",
        icon: "CircuitBoard",
      },
      {
        label: "AVR Modules",
        href: "/products?category=avr-modules",
        description: "Voltage regulation modules for stable power output",
        icon: "Cpu",
      },
      {
        label: "Diesel Engine Spare Parts",
        href: "/products?category=diesel-engine-spare-parts",
        description: "Critical replacements for engine uptime and reliability",
        icon: "Wrench",
      },
      {
        label: "Sensors & Wiring Harnesses",
        href: "/products?category=sensors",
        description: "Monitoring sensors and wiring solutions for industrial control systems",
        icon: "ScanEye",
      },
      {
        label: "Heavy Duty Components",
        href: "/products?category=heavy-duty-components",
        description: "Robust solutions for severe-duty applications",
        icon: "HardHat",
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
        href: "/industries",
        description: "Smart factory solutions",
        icon: "Factory",
      },
      {
        label: "Logistics",
        href: "/industries",
        description: "Supply chain optimization",
        icon: "Truck",
      },
      {
        label: "Energy",
        href: "/industries",
        description: "Power management systems",
        icon: "Zap",
      },
      {
        label: "Infrastructure",
        href: "/industries",
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
        label: "Downloads",
        href: "/downloads",
        description: "Product documentation and downloads",
        icon: "Download",
      },
      {
        label: "Technical Blog",
        href: "/blog",
        description: "Insights, maintenance tips and product updates",
        icon: "BookOpen",
      },
      {
        label: "Installation Manuals",
        href: "/downloads",
        description: "Field setup and installation guidance",
        icon: "FileText",
      },
      {
        label: "Product Catalogues",
        href: "/downloads",
        description: "Browse our industrial product range",
        icon: "FolderOpen",
      },
      {
        label: "Certifications",
        href: "/certifications",
        description: "Quality standards and compliance records",
        icon: "ShieldCheck",
      },
      {
        label: "FAQ",
        href: "/#faq",
        description: "Common product and support questions",
        icon: "HelpCircle",
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
      { label: "Industries", href: "/industries" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  products: {
    title: "Products",
    links: [
      { label: "Engine Braking Systems", href: "/products?category=engine-braking-systems" },
      { label: "Bleeder Brakes", href: "/products?category=bleeder-brakes" },
      { label: "Generator Accessories", href: "/products?category=generator-accessories" },
      { label: "ATS Controllers", href: "/products?category=ats-controllers" },
      { label: "AVR Modules", href: "/products?category=avr-modules" },
      { label: "Diesel Engine Spare Parts", href: "/products?category=diesel-engine-spare-parts" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Downloads", href: "/downloads" },
      { label: "Certifications", href: "/certifications" },
      { label: "Documentation", href: "/downloads" },
      { label: "Support", href: "/contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Compliance", href: "/certifications" },
    ],
  },
};

export const SOCIAL_LINKS = [
  { platform: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { platform: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { platform: "GitHub", href: "https://github.com", icon: "Github" },
  { platform: "YouTube", href: "https://youtube.com", icon: "Youtube" },
];
