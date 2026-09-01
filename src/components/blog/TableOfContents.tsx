interface TableOfContentsProps {
  items: Array<{ id: string; label: string }>;
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Table of contents</div>
      <ul className="space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="inline-flex rounded-md px-2 py-1 transition-colors hover:bg-white hover:text-orange-600">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
