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

function toText(value: unknown): string {
  if (!value) return "";

  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "text" in item && typeof (item as { text?: string }).text === "string") {
          return (item as { text?: string }).text ?? "";
        }
        if (item && typeof item === "object" && "children" in item && Array.isArray((item as { children?: unknown[] }).children)) {
          return toText((item as { children?: unknown[] }).children);
        }
        return "";
      })
      .join(" ")
      .trim();
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (record.text && typeof record.text === "string") return record.text;
    if (Array.isArray(record.children)) return toText(record.children);
  }

  return String(value);
}

function normalizeTestimonial(entry: { id?: number | string; attributes?: StrapiTestimonialEntry } | StrapiTestimonialEntry): Testimonial | null {
  const record = "attributes" in entry && entry.attributes ? entry.attributes : entry;
  if (!record || typeof record !== "object") {
    return null;
  }

  const photo = (record as StrapiTestimonialEntry).photo ?? (record as StrapiTestimonialEntry).avatar;

  return {
    id: String(("id" in entry ? entry.id : (record as StrapiTestimonialEntry).id) ?? (record as StrapiTestimonialEntry).name ?? "testimonial"),
    name: (record as StrapiTestimonialEntry).name ?? "Customer",
    role: (record as StrapiTestimonialEntry).designation ?? (record as StrapiTestimonialEntry).role ?? "Customer",
    company: (record as StrapiTestimonialEntry).companyName ?? (record as StrapiTestimonialEntry).company ?? "Customer Company",
    quote: toText((record as StrapiTestimonialEntry).review ?? (record as StrapiTestimonialEntry).quote ?? ""),
    avatar: photo?.url,
    rating: (record as StrapiTestimonialEntry).rating ?? 5,
  };
}

function getEntries(response: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(response)) return response as Array<Record<string, unknown>>;
  if (response && typeof response === "object") {
    const source = response as { data?: unknown };
    if (Array.isArray(source.data)) return source.data as Array<Record<string, unknown>>;
    if (source.data && typeof source.data === "object") return [source.data as Record<string, unknown>];
  }
  return [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const response = await fetchAPI<{ data: Array<{ id: number | string; attributes: StrapiTestimonialEntry }> } | Array<StrapiTestimonialEntry>>('/testimonials', {
    populate: ["photo"],
    sort: "displayOrder:asc",
  });

  const entries = getEntries(response);
  const mapped = entries
    .map((entry) => normalizeTestimonial(entry as { id?: number | string; attributes?: StrapiTestimonialEntry } | StrapiTestimonialEntry))
    .filter((item): item is Testimonial => Boolean(item));

  if (mapped.length > 0) {
    return mapped;
  }

  return FALLBACK_TESTIMONIALS;
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getTestimonials();
  return testimonials;
}
