import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { buildProductRFQLink } from "@/lib/rfq";

export function RFQButton({
  variant = "primary",
  label = "Request Quote",
  compact = false,
  className = "",
  productSlug,
}: {
  variant?: "primary" | "secondary" | "outline";
  label?: string;
  compact?: boolean;
  className?: string;
  productSlug?: string;
}) {
  const base = "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-200";
  const sizes = compact ? "px-3 py-2 text-sm" : "px-5 py-3 text-sm md:text-base";

  const styles = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-200",
    secondary: "bg-sky-900 text-white hover:bg-sky-800",
    outline: "border border-sky-800 text-sky-800 bg-white hover:bg-sky-50",
  };

  const href = buildProductRFQLink(productSlug);

  return (
    <Link href={href} className={`${base} ${sizes} ${styles[variant]} ${className}`.trim()}>
      {variant === "primary" ? <MessageCircle className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
