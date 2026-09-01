export type BlogCategory =
  | "Engine Braking"
  | "Generator Accessories"
  | "ATS Controllers"
  | "AVR Modules"
  | "Maintenance"
  | "Installation Guides"
  | "Industry News";

export interface BlogAuthor {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface BlogTocItem {
  id: string;
  label: string;
}

export interface BlogSection {
  id: string;
  heading: string;
  type: "paragraph" | "list" | "callout" | "tips" | "faq";
  body?: string[];
  items?: string[];
  title?: string;
  content?: string;
  question?: string;
  answer?: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  image: string;
  author: BlogAuthor;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  toc: BlogTocItem[];
  sections: BlogSection[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "bleeder-brakes-heavy-vehicle-safety",
    title: "How Bleeder Brakes Improve Heavy Vehicle Safety",
    category: "Engine Braking",
    excerpt: "A practical guide to why bleeder brake design matters for down-slope control, reliability, and operator confidence.",
    image: "https://images.unsplash.com/photo-1581092921461-4a7e8a9f84f0?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Arjun Mehta",
      role: "Senior Engine Systems Engineer",
      bio: "Arjun leads heavy-duty braking research and field diagnostics for industrial fleets.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-08-18",
    readTime: "7 min read",
    featured: true,
    tags: ["safety", "engine braking", "fleet reliability"],
    toc: [
      { id: "why-it-matters", label: "Why it matters" },
      { id: "control-performance", label: "Control performance" },
      { id: "maintenance-essentials", label: "Maintenance essentials" },
      { id: "faq", label: "FAQ" },
    ],
    sections: [
      {
        id: "why-it-matters",
        heading: "Why it matters",
        type: "paragraph",
        body: [
          "In heavy vehicle applications, braking is not only a stopping function—it is a thermal and mechanical management strategy. Bleeder brake assemblies support smoother deceleration and reduce excessive stress across drivetrain components.",
          "When braking intermittently on long descents or high-load duties, retaining a stable, controlled response helps operators avoid brake fade, overheating, and uneven wear patterns. That makes the component selection and compatibility standards particularly important for industrial work cycles.",
        ],
      },
      {
        id: "control-performance",
        heading: "Control performance",
        type: "list",
        items: [
          "Improves thermal stability under repeated downhill loads.",
          "Reduces wheel lock risk when operating mixed gradients and payloads.",
          "Protects engine and drivetrain components from repeated shock loads.",
        ],
      },
      {
        id: "maintenance-essentials",
        heading: "Maintenance essentials",
        type: "tips",
        title: "Field tip",
        content: "Inspect lining wear patterns, air leakage, and actuator response during scheduled maintenance windows to prevent degradation before failure conditions appear.",
      },
      {
        id: "faq",
        heading: "FAQ",
        type: "faq",
        question: "How often should bleeder brakes be inspected?",
        answer: "Inspection intervals should align with duty cycle intensity, but a preventive review every 500-1000 operating hours is a practical starting point for high-load fleets.",
      },
    ],
  },
  {
    slug: "choosing-right-ats-controller",
    title: "Choosing the Right ATS Controller",
    category: "ATS Controllers",
    excerpt: "A concise decision framework for selecting automated transfer switch controllers based on load profile and deployment complexity.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Neha Singh",
      role: "Power Systems Consultant",
      bio: "Neha helps facilities choose resilient transfer control systems for mission-critical power environments.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-08-11",
    readTime: "6 min read",
    tags: ["ATS", "power resilience", "selection"],
    toc: [
      { id: "load-profile", label: "Match the load profile" },
      { id: "control-features", label: "Critical control features" },
      { id: "commissioning", label: "Commissioning checklist" },
    ],
    sections: [
      { id: "load-profile", heading: "Match the load profile", type: "paragraph", body: ["The single most important decision factor is the load profile. For hospitals or water treatment sites, the controller must prioritize seamless changeover timing, remote diagnostics, and precise source synchronization." ] },
      { id: "control-features", heading: "Critical control features", type: "list", items: ["Source priority logic", "Adaptive delay sequencing", "Closed transition capability", "Event logging and alarms"] },
      { id: "commissioning", heading: "Commissioning checklist", type: "callout", title: "Commissioning note", content: "Verify transfer time, ensure no phase mismatch during mission-critical switching, and validate alarm escalation to maintenance teams before schedule sign-off." },
    ],
  },
  {
    slug: "generator-avr-troubleshooting-guide",
    title: "Generator AVR Troubleshooting Guide",
    category: "AVR Modules",
    excerpt: "Diagnose unstable voltage, excitation faults, and poor generator response with a methodical AVR service approach.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Sanjay Verma",
      role: "Field Service Engineer",
      bio: "Sanjay specializes in generator protection, excitation systems, and field diagnostics.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-07-30",
    readTime: "8 min read",
    tags: ["AVR", "troubleshooting", "voltage regulation"],
    toc: [
      { id: "symptoms", label: "Common symptoms" },
      { id: "diagnostic-flow", label: "Diagnostic flow" },
      { id: "preventive-actions", label: "Preventive actions" },
    ],
    sections: [
      { id: "symptoms", heading: "Common symptoms", type: "list", items: ["Voltage drift under load", "Rapid surging during startup", "Erratic output at low RPM", "Burnt smell indicating thermal stress"] },
      { id: "diagnostic-flow", heading: "Diagnostic flow", type: "paragraph", body: ["Start with the supply voltage, excitation lead integrity, and load-sharing signals. A stable AVR is only as reliable as the sensing circuit that feeds it." ] },
      { id: "preventive-actions", heading: "Preventive actions", type: "tips", title: "Maintenance tip", content: "Schedule periodic checks for terminal tightness, dust ingress, and signal noise to reduce nuisance AVR trips." },
    ],
  },
  {
    slug: "oem-vs-aftermarket-diesel-components",
    title: "OEM vs Aftermarket Diesel Components",
    category: "Industry News",
    excerpt: "A measured comparison of quality, compatibility, and lifecycle performance across OEM and aftermarket diesel components.",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Rohit Nair",
      role: "Procurement Strategist",
      bio: "Rohit supports industrial buyers with sourcing and lifecycle risk analysis.",
      avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-07-22",
    readTime: "5 min read",
    tags: ["procurement", "diesel components", "quality"],
    toc: [
      { id: "decision-factors", label: "Decision factors" },
      { id: "risk-management", label: "Risk management" },
    ],
    sections: [
      { id: "decision-factors", heading: "Decision factors", type: "list", items: ["Fitment precision", "Material traceability", "Service lead time", "Warranty and field support"] },
      { id: "risk-management", heading: "Risk management", type: "callout", title: "Procurement note", content: "Aftermarket reliability depends heavily on supplier quality controls, testing traceability, and application-specific documentation." },
    ],
  },
  {
    slug: "preventive-maintenance-engine-brakes",
    title: "Preventive Maintenance for Engine Brakes",
    category: "Maintenance",
    excerpt: "Smart inspection routines can reduce unplanned downtime and help fleets avoid expensive drivetrain failures.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Amit Joshi",
      role: "Maintenance Planning Lead",
      bio: "Amit helps industrial operators plan lifecycle maintenance for heavy-duty power systems.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-07-08",
    readTime: "9 min read",
    tags: ["maintenance", "downtime reduction", "engine braking"],
    toc: [
      { id: "inspection-flow", label: "Inspection flow" },
      { id: "performance-signs", label: "Performance signs" },
    ],
    sections: [
      { id: "inspection-flow", heading: "Inspection flow", type: "paragraph", body: ["Maintenance planning should start with heat signatures, wear patterns, and actuator response. The most valuable data often appears before an obvious breakdown event." ] },
      { id: "performance-signs", heading: "Performance signs", type: "list", items: ["Unusual noise under compression", "Delayed response under load", "Uneven wear across brake assemblies", "High operating temperature during normal grade travel"] },
    ],
  },
  {
    slug: "installing-compact-generator-accessories",
    title: "Installing Generator Accessories for Reliable Output",
    category: "Generator Accessories",
    excerpt: "Learn how accessory layout, mounting, and protection details influence long-term generator performance.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Priya Shah",
      role: "Generator Design Engineer",
      bio: "Priya develops generator accessory integration strategies for industrial backup systems.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-06-29",
    readTime: "6 min read",
    tags: ["generator accessories", "installation", "power output"],
    toc: [
      { id: "mounting", label: "Mounting accuracy" },
      { id: "protection", label: "Protection layers" },
    ],
    sections: [
      { id: "mounting", heading: "Mounting accuracy", type: "paragraph", body: ["Installation quality directly influences generator efficiency. Proper alignment, vibration damping, and cabling discipline reduce noise and avoid future thermal drift." ] },
      { id: "protection", heading: "Protection layers", type: "tips", title: "Best practice", content: "Use shielding, strain relief, and corrosion-safe fasteners in exposed or humid environments to preserve long-term output reliability." },
    ],
  },
  {
    slug: "engineering-maintenance-routine-for-ats",
    title: "Engineering a Maintenance Routine for ATS Systems",
    category: "ATS Controllers",
    excerpt: "A preventive maintenance model for transfer switches that operate in utility-sensitive, 24/7 environments.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Karan Iyer",
      role: "Automation Reliability Engineer",
      bio: "Karan specializes in site reliability and control-system health monitoring.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-06-18",
    readTime: "7 min read",
    tags: ["ATS", "maintenance", "reliability"],
    toc: [
      { id: "routine-design", label: "Routine design" },
      { id: "failure-signs", label: "Failure signs" },
    ],
    sections: [
      { id: "routine-design", heading: "Routine design", type: "list", items: ["Inspect transfer relay timing", "Review event log integrity", "Verify utility and generator synchronization signals", "Clean contact surfaces and test actuator movement"] },
      { id: "failure-signs", heading: "Failure signs", type: "callout", title: "Alert", content: "Frequent nuisance transfers, delayed source selection, and inconsistent analog sensor readings are early indicators of ATS health issues." },
    ],
  },
  {
    slug: "installation-guide-for-voltage-regulators",
    title: "Installation Guide for Voltage Regulators",
    category: "Installation Guides",
    excerpt: "Avoid common installation errors with a disciplined regulator setup process and signal verification checklist.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Maya Patel",
      role: "Power Electronics Specialist",
      bio: "Maya supports industrial control projects with voltage, protection, and subsystem commissioning expertise.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-06-03",
    readTime: "8 min read",
    tags: ["installation", "voltage regulator", "field setup"],
    toc: [
      { id: "precheck", label: "Pre-installation checks" },
      { id: "calibration", label: "Calibration" },
    ],
    sections: [
      { id: "precheck", heading: "Pre-installation checks", type: "paragraph", body: ["Confirm nominal voltage tolerances, mounting conditions, and signal reference stability before energizing the regulator. Minor setup drift can produce unstable output under varying loads." ] },
      { id: "calibration", heading: "Calibration", type: "tips", title: "Field practice", content: "Set your verification points against actual load conditions, not bench assumptions, to avoid post-deployment output mismatch." },
    ],
  },
  {
    slug: "industrial-trend-maintenance-data",
    title: "Why Maintenance Data Drives Industrial Decisions",
    category: "Industry News",
    excerpt: "Operational data helps teams reduce reactive repair cycles and focus on reliability investment where it matters most.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Ritika Rao",
      role: "Industrial Data Analyst",
      bio: "Ritika translates field performance data into practical maintenance strategies for industrial operators.",
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-05-14",
    readTime: "4 min read",
    tags: ["industrial trends", "maintenance", "analytics"],
    toc: [
      { id: "data-priority", label: "Data priority" },
      { id: "decision-value", label: "Decision value" },
    ],
    sections: [
      { id: "data-priority", heading: "Data priority", type: "list", items: ["Track thermal variation", "Measure downtime windows", "Benchmark repair turnaround", "Review maintenance delay rate"] },
      { id: "decision-value", heading: "Decision value", type: "callout", title: "Insight", content: "Maintenance decisions become far more precise when data is paired with service history and equipment lifecycle context." },
    ],
  },
  {
    slug: "protecting-critical-power-loads",
    title: "Protecting Critical Power Loads in High-Risk Environments",
    category: "Generator Accessories",
    excerpt: "A technical look at protection layers, surge handling, and support accessories for critical load continuity.",
    image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Vivek Khanna",
      role: "Protection Systems Advisor",
      bio: "Vivek helps operators design safe power protection for manufacturing and site-critical infrastructure.",
      avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-04-28",
    readTime: "6 min read",
    tags: ["protection", "power continuity", "surge mitigation"],
    toc: [
      { id: "risk-layers", label: "Risk layers" },
      { id: "surge-strategy", label: "Surge strategy" },
    ],
    sections: [
      { id: "risk-layers", heading: "Risk layers", type: "paragraph", body: ["Critical facilities need layered protection: robust generator accessories, proper grounding, and predictable response during transient events." ] },
      { id: "surge-strategy", heading: "Surge strategy", type: "tips", title: "Recommendation", content: "Validate surge levels and protection thresholds against site-critical loads rather than generic design limits." },
    ],
  },
];

export const blogCategories = [
  "Engine Braking",
  "Generator Accessories",
  "ATS Controllers",
  "AVR Modules",
  "Maintenance",
  "Installation Guides",
  "Industry News",
] as const;

export function getBlogArticleBySlug(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}
