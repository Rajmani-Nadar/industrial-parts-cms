import type { IndustryCardItem } from "@/components/industries/IndustryCard";

const FALLBACK_INDUSTRIES: IndustryCardItem[] = [
  {
    title: "Power Generation",
    description: "Backup power and critical infrastructure support.",
    image: "/images/industries/power-generation.jpg",
    products: ["Generator Accessories", "AVR Modules"],
    applications: ["Data centers", "Industrial backup systems", "Prime power stations"],
    href: "/products?category=generator-accessories",
  },
  {
    title: "Commercial Transport",
    description: "Heavy-duty braking and engine reliability.",
    image: "/images/industries/commercial-transport.jpg",
    products: ["Engine Braking", "Bleeder Brakes"],
    applications: ["Buses", "Fleet vehicles", "Commercial logistics"],
    href: "/products?category=engine-braking-systems",
  },
  {
    title: "Mining & Construction",
    description: "Durable components for harsh-duty environments.",
    image: "/images/industries/mining-construction.jpg",
    products: ["Spare Parts", "Sensors"],
    applications: ["Excavators", "Crushers", "Heavy earthmoving equipment"],
    href: "/products?category=heavy-duty-components",
  },
];

export async function getIndustries(): Promise<IndustryCardItem[]> {
  return FALLBACK_INDUSTRIES;
}
