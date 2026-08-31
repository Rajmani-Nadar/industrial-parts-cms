import Link from "next/link";

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-4xl shadow-inner">🔧</div>
      <h3 className="mb-3 text-2xl font-bold text-slate-800">No matching industrial components found.</h3>
      <p className="mb-6 max-w-lg text-slate-600">
        Try adjusting your search, resetting your filters, or explore the full catalogue to discover compatible industrial parts for your equipment.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Reset Filters
        </button>
        <Link href="/products" className="rounded-lg border border-sky-800 bg-white px-5 py-3 font-semibold text-sky-800 transition-colors hover:bg-sky-50">
          Explore All Products
        </Link>
      </div>
    </div>
  );
}
