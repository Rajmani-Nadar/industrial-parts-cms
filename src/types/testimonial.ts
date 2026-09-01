export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating?: number;
}

export interface StrapiTestimonialEntry {
  id?: number;
  name?: string;
  role?: string;
  company?: string;
  quote?: string;
  avatar?: {
    url?: string;
    alternativeText?: string;
  } | null;
  rating?: number;
}
