"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Factory, Gauge, Handshake, ShieldCheck, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { CTASection, FeatureChecklist, SectionHeading, StatCard, TimelineItem, WorldPresence } from "@/components/about/Shared";

const milestones = [
  {
    year: "2001",
    title: "Company Founded",
    description: "Established as a specialist supplier of industrial engine and power components for heavy-duty applications.",
  },
  {
    year: "2007",
    title: "Expanded Product Range",
    description: "Added engine braking systems, generator accessories, ATS and AVR modules to serve broader OEM demand.",
  },
  {
    year: "2012",
    title: "Global Distribution",
    description: "Built export networks across Asia, Africa, and the Middle East with support for OEM and dealer channels.",
  },
  {
    year: "2016",
    title: "Quality Certification",
    description: "Aligned our process control with international quality standards for premium industrial supply.",
  },
  {
    year: "2020",
    title: "Manufacturing Expansion",
    description: "Strengthened production and testing capacity for higher volumes and faster delivery windows.",
  },
  {
    year: "Today",
    title: "Present Day",
    description: "A trusted partner delivering dependable products and technical support for diesel, generator, and industrial systems worldwide.",
  },
];

const capabilities = [
  { title: "Precision Manufacturing", description: "High-accuracy machining and component finishing for reliability-critical parts.", icon: Factory },
  { title: "CNC Components", description: "CNC-produced assemblies designed to tight tolerances and lifecycle requirements.", icon: Gauge },
  { title: "Testing Facility", description: "Performance verification in controlled environments for engine and power systems.", icon: ShieldCheck },
  { title: "Assembly Line", description: "Structured production flow for safe, consistent, and scalable manufacturing operations.", icon: Building2 },
  { title: "Quality Inspection", description: "Stage-based inspection with traceability and documented QC checks across all products.", icon: ShieldCheck },
  { title: "Packaging & Logistics", description: "Secure packaging and scheduled dispatch support for global customers and OEM partners.", icon: Handshake },
];

const gallery = [
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
];

const team = [
  { name: "Managing Director", role: "Shaping strategy and production direction", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80" },
  { name: "Engineering Team", role: "Product design, prototyping and technical validation", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80" },
  { name: "Quality Assurance Team", role: "Inspection, compliance, and production assurance", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80" },
  { name: "Technical Support Team", role: "Field guidance, application support, and spares", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80" },
];

export function AboutPageContent() {
  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80" alt="Industrial manufacturing line" fill className="object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-sky-900/60" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">Industrial heritage</p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Engineering Performance. Delivering Reliability.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-200">
              We design, manufacture, and deliver dependable industrial components for diesel engines, generator systems, and heavy-duty power applications.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/products" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:bg-orange-400">
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Talk to Experts
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
            <Image src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80" alt="Warehouse and manufacturing workspace" width={1200} height={900} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">Our story</p>
            <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-4xl">Built for performance under pressure.</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              With decades of experience in engine braking systems, generator accessories, ATS controllers, AVR modules, and diesel engine components, we help industrial customers improve uptime, reliability, and operational efficiency.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              From OEM supply partnerships to export-ready industrial support, our teams combine engineering knowledge with disciplined manufacturing to provide components that stand up to demanding environments.
            </p>
            <FeatureChecklist items={[
              "20+ Years Experience",
              "OEM Compatible Products",
              "Worldwide Distribution",
              "Technical Engineering Support",
            ]} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Our journey"
            title="A timeline of industrial growth"
            description="From a focused component supplier to a trusted global industrial partner."
          />
          <div className="mx-auto max-w-3xl">
            <div className="space-y-2">
              {milestones.map((item, index) => (
                <TimelineItem key={item.year} year={item.year} title={item.title} description={item.description} isLast={index === milestones.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Mission & Vision"
          title="Purpose built for reliability"
          description="Our focus remains on dependable quality, technical excellence, and long-term value creation."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-8 shadow-sm">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
              <Factory className="h-6 w-6" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Mission</p>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">Deliver durable, efficient industrial solutions.</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              To supply high-performance components and technical support that help customers run safer, stronger, and more productive operations.
            </p>
          </div>
          <div className="rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-8 shadow-sm">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
              <Users className="h-6 w-6" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">Vision</p>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">Be the trusted partner across industrial value chains.</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              To lead in durable industrial supply by combining precise manufacturing, responsive service, and global market knowledge.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Capabilities"
            title="Manufacturing capability built for demanding operations"
            description="We combine skilled engineering, quality control, and logistics discipline to support critical industrial applications."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map(({ title, description, icon: Icon }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Facilities"
          title="Warehouse and infrastructure"
          description="Our operations are designed for safe storage, traceable inventory, and efficient dispatch."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((image, index) => (
            <div key={image} className={`overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm ${index === 0 || index === 3 ? "lg:col-span-2" : ""}`}>
              <img src={image} alt="Industrial facility" className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Leadership"
            title="Guided by operational expertise"
            description="Our teams focus on product performance, customer support, and quality assurance."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {team.map((member) => (
              <motion.div key={member.name} whileHover={{ y: -6 }} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm">
                <img src={member.image} alt={member.name} className="h-72 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                  <p className="mt-2 text-sm text-sky-700">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <WorldPresence />
      </section>

      <CTASection
        title="Partner with a Reliable Industrial Components Supplier"
        description="From engineering support to global dispatch, we help customers maintain uptime and operational confidence."
        primaryLabel="Request Quote"
        secondaryLabel="Contact Technical Team"
      />
    </div>
  );
}
