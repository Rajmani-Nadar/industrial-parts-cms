/**
 * Home Page - Industrial B2B Website
 * Premium industrial components for global enterprises
 * Assembled from 13+ reusable components
 */

import {
  HeroSection,
  TrustedBySection,
  ProductCategoriesSection,
  AboutPreviewSection,
  WhyChooseUsSection,
  IndustriesServedSection,
  StatisticsCounterSection,
  FeaturedProductsSection,
  CertificationsSection,
  TestimonialsSection,
  FAQAccordionSection,
  FinalCTASection,
  FloatingWhatsAppButton,
} from "@/components/home";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - Full viewport with animated headline */}
      <HeroSection />

      {/* Trusted By Section - Client logos with marquee animation */}
      <TrustedBySection />

      {/* Product Categories - 8 category cards with hover effects */}
      <ProductCategoriesSection />

      {/* About Preview - Company overview with highlights */}
      <AboutPreviewSection />

      {/* Why Choose Us - 6 feature cards with animations */}
      <WhyChooseUsSection />

      {/* Industries Served - 8 industry cards with overlay */}
      <IndustriesServedSection />

      {/* Statistics Counter - Animated count-up numbers */}
      <StatisticsCounterSection />

      {/* Featured Products - 6 premium product cards */}
      <FeaturedProductsSection />

      {/* Certifications - ISO and API certifications display */}
      <CertificationsSection />

      {/* Testimonials - Customer testimonials carousel */}
      <TestimonialsSection />

      {/* FAQ Accordion - Expandable FAQs */}
      <FAQAccordionSection />

      {/* Final CTA - Conversion-focused banner */}
      <FinalCTASection />

      {/* Floating WhatsApp Button - Sticky contact button */}
      <FloatingWhatsAppButton />
    </div>
  );
}
