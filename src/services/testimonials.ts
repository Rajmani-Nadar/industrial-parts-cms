import { get } from "@/lib/strapi";
import type { Testimonial, StrapiTestimonialEntry } from "@/types/testimonial";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "default-1",
    name: "Daniel Morgan",
    role: "Operations Director",
    company: "Atlas Power Systems",
    quote: "Reliable supply, technical support, and consistent product performance across our mission-critical operations.",
  },
  {
    id: "default-2",
    name: "Priya Sharma",
    role: "Fleet Maintenance Lead",
    company: "Northstar Logistics",
    quote: "The quality and support from this team helped reduce downtime and improve fleet efficiency noticeably.",
  },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  const response = await get<{ data: Array<{ id: number; attributes: StrapiTestimonialEntry }> }>("/testimonials", {
    populate: "*",
  });

  if (response?.data && Array.isArray(response.data)) {
    const mapped = response.data
      .map((entry) => {
        const attrs = entry?.attributes;
        if (!attrs) return null;
        return {
          id: String(entry.id ?? attrs.name ?? Math.random()),
          name: attrs.name ?? "Customer",
          role: attrs.role ?? "Customer",
          company: attrs.company ?? "Customer Company",
          quote: attrs.quote ?? "",
          avatar: attrs.avatar?.url,
          rating: attrs.rating ?? 5,
        } satisfies Testimonial;
      })
      .filter(Boolean) as Testimonial[];

    if (mapped.length > 0) {
      return mapped;
    }
  }

  return FALLBACK_TESTIMONIALS;
}
