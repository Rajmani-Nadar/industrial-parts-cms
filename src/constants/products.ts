/**
 * Product Data Structure for Industrial B2B Website
 * Placeholder structure for products, categories, and specifications
 */

export type ProductSpecification = {
  key: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  price: string;
  image?: string;
  features: string[];
  specifications: ProductSpecification[];
  inStock: boolean;
  rating?: number;
  reviews?: number;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
};

// Placeholder product data
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "automation",
    name: "Automation Systems",
    slug: "automation",
    description: "Industrial automation and robotics solutions",
    icon: "Cpu",
  },
  {
    id: "control",
    name: "Control Systems",
    slug: "control",
    description: "Advanced control and monitoring systems",
    icon: "Zap",
  },
  {
    id: "monitoring",
    name: "Monitoring Tools",
    slug: "monitoring",
    description: "Real-time monitoring and analytics",
    icon: "Eye",
  },
  {
    id: "safety",
    name: "Safety Systems",
    slug: "safety",
    description: "Enterprise safety and compliance solutions",
    icon: "Shield",
  },
  {
    id: "connectivity",
    name: "Connectivity Solutions",
    slug: "connectivity",
    description: "Industrial IoT and connectivity",
    icon: "Wifi",
  },
];

// Placeholder products
export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Industrial Automation Suite Pro",
    category: "automation",
    shortDescription: "Enterprise-grade automation platform",
    description:
      "Complete automation solution for large-scale industrial operations with real-time control and monitoring capabilities.",
    price: "Contact for pricing",
    features: [
      "Real-time processing",
      "Scalable architecture",
      "Advanced analytics",
      "Custom integrations",
      "24/7 support",
    ],
    specifications: [
      { key: "Processing Power", value: "Up to 10,000 events/sec" },
      { key: "Uptime SLA", value: "99.99%" },
      { key: "Supported Devices", value: "5,000+" },
      { key: "APIs", value: "RESTful & GraphQL" },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 247,
  },
  {
    id: "prod-002",
    name: "Smart Control System X5000",
    category: "control",
    shortDescription: "Advanced control and optimization",
    description:
      "Next-generation control system with AI-powered optimization and predictive maintenance capabilities.",
    price: "Contact for pricing",
    features: [
      "AI-powered optimization",
      "Predictive maintenance",
      "Multi-site management",
      "Custom dashboards",
      "Mobile access",
    ],
    specifications: [
      { key: "Input Channels", value: "Up to 1,000" },
      { key: "Response Time", value: "< 10ms" },
      { key: "Data Storage", value: "Unlimited cloud" },
      { key: "Update Frequency", value: "Real-time" },
    ],
    inStock: true,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "prod-003",
    name: "Monitoring & Analytics Platform",
    category: "monitoring",
    shortDescription: "Comprehensive monitoring solution",
    description:
      "Enterprise monitoring platform providing deep insights into system performance and operational metrics.",
    price: "Contact for pricing",
    features: [
      "Real-time dashboards",
      "Custom alerts",
      "Historical analysis",
      "Trend predictions",
      "Custom reports",
    ],
    specifications: [
      { key: "Monitored Metrics", value: "Unlimited" },
      { key: "Data Retention", value: "7+ years" },
      { key: "Query Speed", value: "< 1 second" },
      { key: "Users", value: "Unlimited" },
    ],
    inStock: true,
    rating: 4.9,
    reviews: 312,
  },
];

// Placeholder for company statistics
export const COMPANY_STATS = [
  { label: "Enterprise Customers", value: "500+" },
  { label: "Global Installations", value: "2,000+" },
  { label: "Uptime Guarantee", value: "99.99%" },
  { label: "Support Engineers", value: "24/7" },
];
