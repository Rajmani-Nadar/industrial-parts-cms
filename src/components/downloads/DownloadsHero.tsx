import Image from "next/image";

export function DownloadsHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80"
          alt="Industrial blueprint background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.22),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.8),rgba(15,23,42,0.92))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">Technical resources</p>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            Technical Resources &amp; Downloads
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200">
            Access product catalogues, compatibility guides, installation instructions, and technical documentation built for industrial operators, maintenance teams, and procurement teams.
          </p>
        </div>
      </div>
    </section>
  );
}
