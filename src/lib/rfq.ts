export function buildRFQLink(): string {
  return "/request-quote";
}

export function buildProductRFQLink(slug?: string | null): string {
  if (!slug) return buildRFQLink();

  const params = new URLSearchParams({ product: slug });
  return `${buildRFQLink()}?${params.toString()}`;
}
