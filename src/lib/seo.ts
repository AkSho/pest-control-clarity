export const SITE_ORIGIN = "https://cloakd-removals.cloud";

export function canonicalUrl(path: string) {
  const cleanPath = path === "/" ? "" : path.replace(/\/$/, "");
  return `${SITE_ORIGIN}${cleanPath}`;
}

export function canonicalLink(path: string) {
  return [{ rel: "canonical", href: canonicalUrl(path) }];
}

export function jsonLdScript(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
