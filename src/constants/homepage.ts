/**
 * Homepage Data Constants
 * Including categories, testimonials, FAQs, industries, certifications, etc.
 */

export type ClientLogo = {
  id: string;
  name: string;
  logo?: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  image?: string;
  rating: number;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type Industry = {
  id: string;
  name: string;
  icon: string;
  image?: string;
  description: string;
};

export type Certification = {
  id: string;
  name: string;
  logo?: string;
  description: string;
};

export type FeatureCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

// Client Logos for Trusted By Section
export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "1", name: "Caterpillar" },
  { id: "2", name: "Cummins" },
  { id: "3", name: "Volvo" },
  { id: "4", name: "MAN" },
  { id: "5", name: "Scania" },
  { id: "6", name: "DAF" },
  { id: "7", name: "Siemens" },
  { id: "8", name: "ABB" },
];

// Product Categories
export const PRODUCT_CATEGORIES_HOMEPAGE: ProductCategory[] = [
  {
    id: "engine-braking",
    name: "Engine Braking Systems",
    description: "Advanced engine braking solutions for maximum safety and performance",
    icon: "Zap",
  },
  {
    id: "bleeder-brakes",
    name: "Bleeder Brakes",
    description: "Precision-engineered bleeder brakes for heavy-duty applications",
    icon: "Gauge",
  },
  {
    id: "generator-accessories",
    name: "Generator Accessories",
    description: "Complete range of generator accessories and components",
    icon: "Cpu",
  },
  {
    id: "ats-controllers",
    name: "ATS Controllers",
    description: "Intelligent Automatic Transfer Switch controllers",
    icon: "Wifi",
  },
  {
    id: "avr-modules",
    name: "AVR Modules",
    description: "Automatic Voltage Regulator modules for optimal power output",
    icon: "Zap",
  },
  {
    id: "diesel-parts",
    name: "Diesel Engine Spare Parts",
    description: "Genuine OEM diesel engine components and spare parts",
    icon: "Wrench",
  },
  {
    id: "sensors",
    name: "Sensors & Wiring",
    description: "Industrial sensors and precision wiring systems",
    icon: "Radio",
  },
  {
    id: "heavy-duty",
    name: "Heavy Duty Components",
    description: "Robust components designed for extreme operating conditions",
    icon: "Shield",
  },
];

// Why Choose Us Features
export const WHY_CHOOSE_US: FeatureCard[] = [
  {
    id: "oem-quality",
    title: "OEM Quality",
    description: "Certified Original Equipment Manufacturer components meeting international standards",
    icon: "Award",
  },
  {
    id: "engineering-support",
    title: "Engineering Support",
    description: "Expert technical support from our experienced engineering team",
    icon: "Users",
  },
  {
    id: "global-shipping",
    title: "Global Shipping",
    description: "Fast and reliable shipping to over 50 countries worldwide",
    icon: "Globe",
  },
  {
    id: "genuine-components",
    title: "Genuine Components",
    description: "100% authentic parts with full warranty and certification",
    icon: "CheckCircle",
  },
  {
    id: "fast-delivery",
    title: "Fast Delivery",
    description: "Expedited processing and delivery for urgent requirements",
    icon: "Zap",
  },
  {
    id: "competitive-pricing",
    title: "Competitive Pricing",
    description: "Best market prices without compromising on quality",
    icon: "DollarSign",
  },
];

// Industries Served
export const INDUSTRIES_SERVED: Industry[] = [
  {
    id: "commercial-trucks",
    name: "Commercial Trucks",
    icon: "Truck",
    description: "Heavy-duty trucking and transportation solutions",
  },
  {
    id: "mining",
    name: "Mining",
    icon: "Pickaxe",
    description: "Robust equipment for mining operations",
  },
  {
    id: "marine",
    name: "Marine",
    icon: "Anchor",
    description: "Marine and offshore applications",
  },
  {
    id: "construction",
    name: "Construction",
    icon: "Hammer",
    description: "Heavy construction equipment solutions",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: "Leaf",
    description: "Agricultural machinery and equipment",
  },
  {
    id: "power-plants",
    name: "Power Plants",
    icon: "Zap",
    description: "Power generation and distribution systems",
  },
  {
    id: "public-transport",
    name: "Public Transport",
    icon: "Bus",
    description: "Public transportation vehicle solutions",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: "Factory",
    description: "Industrial manufacturing operations",
  },
];

// Statistics
export const STATISTICS = [
  { label: "Years Experience", value: 25, suffix: "+" },
  { label: "Products", value: 500, suffix: "+" },
  { label: "Clients", value: 5000, suffix: "+" },
  { label: "Countries Served", value: 50, suffix: "+" },
];

// Certifications
export const CERTIFICATIONS: Certification[] = [
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    description: "Quality Management System Certified",
  },
  {
    id: "iso-14001",
    name: "ISO 14001:2015",
    description: "Environmental Management Certified",
  },
  {
    id: "iso-45001",
    name: "ISO 45001:2018",
    description: "Occupational Health & Safety",
  },
  {
    id: "api-certification",
    name: "API Certified",
    description: "American Petroleum Institute Certified",
  },
];

// Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "Exceptional quality and unmatched customer service. These components have been critical to our fleet operations.",
    author: "John Anderson",
    title: "Fleet Manager",
    company: "TransGlobal Logistics",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "The OEM-quality parts and technical support have significantly reduced our downtime and maintenance costs.",
    author: "Sarah Mitchell",
    title: "Operations Director",
    company: "Mining Excellence Inc.",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Reliable supplier with competitive pricing and excellent delivery times. Highly recommended for industrial applications.",
    author: "Robert Chen",
    title: "Procurement Manager",
    company: "PowerGen Solutions",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Outstanding technical expertise and support. They understand our complex requirements and deliver accordingly.",
    author: "Maria Garcia",
    title: "Engineering Lead",
    company: "Marine Systems Corp",
    rating: 5,
  },
];

// FAQs
export const FAQS: FAQ[] = [
  {
    id: "1",
    question: "Are your components genuine OEM parts?",
    answer:
      "Yes, all our components are 100% genuine OEM-certified parts sourced directly from manufacturers. Each product comes with proper certification and warranty documentation.",
    category: "quality",
  },
  {
    id: "2",
    question: "What is your typical delivery timeframe?",
    answer:
      "Our standard delivery is 5-10 business days for in-stock items. We also offer expedited shipping options for urgent requirements with delivery within 2-3 days.",
    category: "shipping",
  },
  {
    id: "3",
    question: "Do you offer technical support for installation?",
    answer:
      "Yes, our technical team provides comprehensive support including installation guidance, troubleshooting, and compatibility verification. Contact our engineering support for detailed assistance.",
    category: "support",
  },
  {
    id: "4",
    question: "What warranty do you provide?",
    answer:
      "All products come with manufacturer warranty ranging from 1-3 years depending on the component. We also offer extended warranty options for critical applications.",
    category: "warranty",
  },
  {
    id: "5",
    question: "Can you supply bulk orders for fleet operators?",
    answer:
      "Absolutely. We specialize in bulk orders for fleet operators and have dedicated account managers for large contracts. Contact our sales team for volume pricing.",
    category: "orders",
  },
  {
    id: "6",
    question: "Do you have parts compatibility information?",
    answer:
      "Yes, we maintain a comprehensive compatibility database. Our technical team can verify compatibility for your specific equipment. Always provide your equipment model and year for accurate recommendations.",
    category: "compatibility",
  },
];
