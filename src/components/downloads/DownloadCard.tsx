import Link from "next/link";
import { ArrowDownToLine, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface DownloadCardProps {
  title: string;
  category: string;
  version: string;
  fileSize: string;
  updatedAt: string;
  compatibleEngine: string;
  partNumber: string;
  description: string;
  href: string;
}

export function DownloadCard({
  title,
  category,
  version,
  fileSize,
  updatedAt,
  compatibleEngine,
  partNumber,
  description,
  href,
}: DownloadCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-orange-200 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm">
          <FileText className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-700">
          {category}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="rounded-full bg-slate-100 px-2 py-1">Version {version}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1">{fileSize}</span>
        </div>

        <div className="grid gap-2 text-sm text-slate-600">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2">
            <span>Updated</span>
            <span className="font-medium text-slate-800">{new Date(updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2">
            <span>Compatible</span>
            <span className="font-medium text-slate-800">{compatibleEngine}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Part No.</span>
            <span className="font-medium text-slate-800">{partNumber}</span>
          </div>
        </div>
      </div>

      <Link
        href={href}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
      >
        <ArrowDownToLine className="h-4 w-4" />
        Download PDF
      </Link>
    </motion.article>
  );
}
