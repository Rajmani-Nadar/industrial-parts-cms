import Link from "next/link";

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-3xl">🔎</div>
      <h3 className="mb-3 text-2xl font-bold text-slate-800">No matching industrial components found.</h3>
      <p className="mb-6 max-w-md text-slate-600">
        Try changing your search or resetting the filters to see more product options.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
      >
        Reset Filters
      </button>
      <Link href="/products" className="mt-3 text-sm text-sky-800 hover:underline">
        Browse all products
      </Link>
    </div>
  );
}
