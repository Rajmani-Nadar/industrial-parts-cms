"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.querySelectorAll<HTMLElement>("section"));
    if (sections.length === 0) {
      container.classList.add("page-reveal-ready");
      return;
    }

    container.classList.add("page-reveal-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }

    let observer: IntersectionObserver | null = null;
    const setupObserver = window.setTimeout(() => {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("page-section-revealed");
            revealObserver.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -9% 0px", threshold: 0.08 },
      );
      observer = revealObserver;

      sections.forEach((section) => revealObserver.observe(section));
    }, 250);

    return () => {
      window.clearTimeout(setupObserver);
      observer?.disconnect();
    };
  }, [pathname]);

  return <div ref={containerRef}>{children}</div>;
}
