import Image from "next/image";

export function GalleryHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1800&q=80"
          alt="Warehouse manufacturing facility"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/55 to-slate-900/30" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">Industrial gallery</p>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            Manufacturing, Warehouse &amp; Product Gallery
          </h1>
        </div>
      </div>
    </section>
  );
}
