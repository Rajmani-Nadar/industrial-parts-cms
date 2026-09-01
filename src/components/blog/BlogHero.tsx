import Image from "next/image";
import { Search } from "lucide-react";

interface BlogHeroProps {
  featuredTitle: string;
  featuredExcerpt: string;
  featuredImage: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function BlogHero({
  featuredTitle,
  featuredExcerpt,
  featuredImage,
  searchTerm,
  onSearchChange,
}: BlogHeroProps) {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">Industrial insights</p>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            Industrial Insights &amp; Technical Resources
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200">
            Expert guidance for maintenance planning, product compatibility, industrial safety, and reliable power system performance.
          </p>

          <div className="mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                aria-label="Search blog posts"
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search technical articles..."
                className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
          <div className="relative h-80 w-full">
            <Image src={featuredImage} alt={featuredTitle} fill className="object-cover" priority />
          </div>
          <div className="bg-slate-900 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Featured article</div>
            <h2 className="mt-3 text-2xl font-bold text-white">{featuredTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{featuredExcerpt}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
