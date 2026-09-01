import { fetchAPI } from "@/lib/fetchAPI";
import type { Testimonial, StrapiTestimonialEntry } from "@/types/testimonial";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "default-1",
    name: "Daniel Morgan",
    role: "Operations Director",
    company: "Atlas Power Systems",
    quote: "Reliable supply, technical support, and consistent product performance across our mission-critical operations.",
    rating: 5,
  },
  {
    id: "default-2",
    name: "Priya Sharma",
    role: "Fleet Maintenance Lead",
    company: "Northstar Logistics",
    quote: "The quality and support from this team helped reduce downtime and improve fleet efficiency noticeably.",
    rating: 5,
  },
];

function normalizeTestimonial(entry: { id?: number | string; attributes?: StrapiTestimonialEntry }): Testimonial | null {
  const attributes = entry?.attributes;
  if (!attributes) {
    return null;
  }

  return {
    id: String(entry.id ?? attributes.name ?? "testimonial"),
    name: attributes.name ?? "Customer",
    role: attributes.role ?? "Customer",
    company: attributes.company ?? "Customer Company",
    quote: attributes.quote ?? "",
    avatar: attributes.avatar?.url,
    rating: attributes.rating ?? 5,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiTestimonialEntry }> }>("/testimonials", {
    populate: ["avatar"],
    sort: "displayOrder:asc",
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => normalizeTestimonial(entry))
      .filter((item): item is Testimonial => Boolean(item));

    if (mapped.length > 0) {
      return mapped;
    }
  }

  return FALLBACK_TESTIMONIALS;
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getTestimonials();
  return testimonials.filter((testimonial) => (testimonial.rating ?? 0) >= 4);
}
