import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
  breadcrumbs?: BreadcrumbItem[];
}

const DOMAIN = "https://www.theredcompany.co.in";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200";

export default function SEO({
  title,
  description,
  canonicalPath,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  schema,
  breadcrumbs,
}: SEOProps) {
  const location = useLocation();
  const currentPath = canonicalPath !== undefined ? canonicalPath : location.pathname;
  const canonicalUrl = `${DOMAIN}${currentPath === "/" ? "" : currentPath.replace(/\/$/, "")}`;

  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // Helper to update or create a meta tag
    const setMetaTag = (attrName: "name" | "property", attrValue: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // 2. Standard SEO Meta
    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMetaTag("name", "author", "The RED Company");
    setMetaTag("name", "geo.region", "IN-KA");
    setMetaTag("name", "geo.placename", "Bangalore");
    setMetaTag("name", "theme-color", "#0A0A0A");

    // 3. Canonical Link Tag
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:site_name", "The RED Company");
    setMetaTag("property", "og:locale", "en_IN");

    // 5. Twitter / X Cards
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // 6. JSON-LD Structured Data
    const scriptId = "page-specific-json-ld";
    let jsonLdScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.id = scriptId;
      jsonLdScript.type = "application/ld+json";
      document.head.appendChild(jsonLdScript);
    }

    const schemasToInject: any[] = [];

    // Add breadcrumb schema if available
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemasToInject.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.item.startsWith("http") ? crumb.item : `${DOMAIN}${crumb.item}`,
        })),
      });
    }

    if (schema) {
      if (Array.isArray(schema)) {
        schemasToInject.push(...schema);
      } else {
        schemasToInject.push(schema);
      }
    }

    if (schemasToInject.length > 0) {
      jsonLdScript.textContent = JSON.stringify(
        schemasToInject.length === 1 ? schemasToInject[0] : schemasToInject
      );
    } else {
      jsonLdScript.textContent = "";
    }
  }, [title, description, canonicalUrl, ogType, ogImage, schema, breadcrumbs]);

  return null;
}
