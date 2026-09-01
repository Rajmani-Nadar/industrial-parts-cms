import { motion } from "framer-motion";

interface DownloadCategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export function DownloadCategoryTabs({ categories, activeCategory, onChange }: DownloadCategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              isActive
                ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:text-orange-700"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
