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
import { getCompanySettings } from "@/services/company";
import { getFeaturedIndustries } from "@/services/industries";
import { getFeaturedCategories } from "@/services/categories";
import { getFeaturedProducts } from "@/services/products";
import { getFeaturedTestimonials } from "@/services/testimonials";
import { getFeaturedCertifications } from "@/services/certifications";
import { getLatestBlogs } from "@/services/blogs";
import { getGalleryPreview } from "@/services/gallery";
import { getFeaturedDownloads } from "@/services/downloads";
import { PRODUCT_CATEGORIES_HOMEPAGE, INDUSTRIES_SERVED, CERTIFICATIONS, TESTIMONIALS } from "@/constants/homepage";
import { FEATURED_PRODUCTS } from "@/constants/products";

export default async function Home() {
  const [companySettings, featuredIndustries, featuredCategories, featuredProducts, featuredTestimonials, featuredCertifications, latestBlogs, galleryPreview, featuredDownloads] = await Promise.all([
    getCompanySettings(),
    getFeaturedIndustries(),
    getFeaturedCategories(),
    getFeaturedProducts(),
    getFeaturedTestimonials(),
    getFeaturedCertifications(),
    getLatestBlogs(),
    getGalleryPreview(),
    getFeaturedDownloads(),
  ]);

  const homeData = {
    company: companySettings,
    industries: featuredIndustries.length > 0 ? featuredIndustries.map((industry) => ({
      id: industry.id,
      name: industry.name,
      icon: industry.icon,
      description: industry.description,
    })) : INDUSTRIES_SERVED,
    categories: featuredCategories.length > 0 ? featuredCategories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon ?? "Cpu",
      href: `/products?category=${category.slug}`,
    })) : PRODUCT_CATEGORIES_HOMEPAGE,
    products: featuredProducts.length > 0 ? featuredProducts.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      shortDescription: product.shortDescription,
      features: product.features.slice(0, 3),
      rating: product.tags.includes("featured") ? 5 : 4,
    })) : FEATURED_PRODUCTS,
    certifications: featuredCertifications.length > 0 ? featuredCertifications.map((certification) => ({
      id: certification.id,
      name: certification.name,
      description: certification.description,
    })) : CERTIFICATIONS,
    testimonials: featuredTestimonials.length > 0 ? featuredTestimonials.map((testimonial) => ({
      id: testimonial.id,
      quote: testimonial.quote,
      author: testimonial.name,
      title: testimonial.role,
      company: testimonial.company,
      rating: testimonial.rating ?? 5,
    })) : TESTIMONIALS,
    blogs: latestBlogs,
    gallery: galleryPreview,
    downloads: featuredDownloads,
  };

  return (
    <div className="w-full">
      <HeroSection company={homeData.company} />
      <TrustedBySection />
      <ProductCategoriesSection categories={homeData.categories} />
      <AboutPreviewSection />
      <WhyChooseUsSection />
      <IndustriesServedSection industries={homeData.industries} />
      <StatisticsCounterSection />
      <FeaturedProductsSection products={homeData.products} />
      <CertificationsSection certifications={homeData.certifications} />
      <TestimonialsSection testimonials={homeData.testimonials} />
      <FAQAccordionSection />
      <FinalCTASection />
      <FloatingWhatsAppButton />
    </div>
  );
}
