import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import fs from "fs";
import path from "path";
import { AppRoutes } from "../src/App";
import { ROUTES_SEO, RouteSEOConfig } from "../src/seoConfig";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function updateTag(
  html: string,
  regex: RegExp,
  replacement: string,
  fallbackInsertBefore: string = "</head>"
): string {
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  } else {
    return html.replace(fallbackInsertBefore, `  ${replacement}\n  ${fallbackInsertBefore}`);
  }
}

async function prerender() {
  const distDir = path.resolve(process.cwd(), "dist");
  const templatePath = path.join(distDir, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Base template ${templatePath} does not exist. Run vite build first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, "utf-8");

  console.log("Starting SSG Prerendering for 5 canonical routes...");

  for (const [routePath, config] of Object.entries(ROUTES_SEO)) {
    console.log(`\n[Prerendering] Route: "${routePath}" -> Canonical: ${config.canonicalUrl}`);

    // 1. Render React App with MemoryRouter at this route
    const appElement = React.createElement(
      MemoryRouter,
      { initialEntries: [routePath] },
      React.createElement(AppRoutes)
    );
    const appHtml = renderToString(appElement);

    // 2. Prepare structured data (breadcrumblist + page schema)
    const structuredDataList: any[] = [];
    if (config.breadcrumbs && config.breadcrumbs.length > 0) {
      structuredDataList.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": config.breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.item.startsWith("http")
            ? crumb.item
            : `https://www.theredcompany.co.in${crumb.item === "/" ? "/" : crumb.item.replace(/\/+$/, "")}`,
        })),
      });
    }

    if (config.schema) {
      if (Array.isArray(config.schema)) {
        structuredDataList.push(...config.schema);
      } else {
        structuredDataList.push(config.schema);
      }
    }

    const pageJsonLdScript = structuredDataList.length > 0
      ? `\n    <!-- Page-Specific Structured Data -->\n    <script type="application/ld+json" id="page-specific-json-ld">\n    ${JSON.stringify(
          structuredDataList.length === 1 ? structuredDataList[0] : structuredDataList,
          null,
          2
        )}\n    </script>`
      : "";

    // 3. Inject page-specific metadata into HTML head
    let pageHtml = baseHtml;

    // Title
    pageHtml = pageHtml.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(config.title)}</title>`
    );

    // Meta Description
    pageHtml = updateTag(
      pageHtml,
      /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(config.description)}" />`
    );

    // Canonical Link
    pageHtml = updateTag(
      pageHtml,
      /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
      `<link rel="canonical" href="${config.canonicalUrl}" />`
    );

    // Open Graph
    pageHtml = updateTag(
      pageHtml,
      /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(config.title)}" />`
    );

    pageHtml = updateTag(
      pageHtml,
      /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(config.description)}" />`
    );

    pageHtml = updateTag(
      pageHtml,
      /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:url" content="${config.canonicalUrl}" />`
    );

    pageHtml = updateTag(
      pageHtml,
      /<meta\s+property=["']og:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:image" content="${config.ogImage}" />`
    );

    pageHtml = updateTag(
      pageHtml,
      /<meta\s+property=["']og:type["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:type" content="${config.ogType}" />`
    );

    pageHtml = updateTag(
      pageHtml,
      /<meta\s+property=["']og:site_name["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:site_name" content="The RED Company" />`
    );

    // Twitter
    pageHtml = updateTag(
      pageHtml,
      /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(config.title)}" />`
    );

    pageHtml = updateTag(
      pageHtml,
      /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeHtml(config.description)}" />`
    );

    pageHtml = updateTag(
      pageHtml,
      /<meta\s+name=["']twitter:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:image" content="${config.ogImage}" />`
    );

    // Remove any previous page-specific json-ld script in template
    pageHtml = pageHtml.replace(
      /<script\s+type=["']application\/ld\+json["']\s+id=["']page-specific-json-ld["']>[\s\S]*?<\/script>/i,
      ""
    );

    // Inject JSON-LD before </head>
    if (pageJsonLdScript) {
      pageHtml = pageHtml.replace("</head>", `${pageJsonLdScript}\n  </head>`);
    }

    // 4. Inject rendered app HTML into root container
    pageHtml = pageHtml.replace(
      /<div id=["']root["']>[\s\S]*?<\/div>/i,
      `<div id="root">${appHtml}</div>`
    );

    // 5. Write to destination files
    if (routePath === "/") {
      fs.writeFileSync(templatePath, pageHtml, "utf-8");
      console.log(`  -> Wrote: ${templatePath} (${pageHtml.length} bytes)`);
    } else {
      const cleanSlug = routePath.replace(/^\//, "");
      const routeDir = path.join(distDir, cleanSlug);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }

      const dirIndexPath = path.join(routeDir, "index.html");
      const htmlFilePath = path.join(distDir, `${cleanSlug}.html`);

      fs.writeFileSync(dirIndexPath, pageHtml, "utf-8");
      fs.writeFileSync(htmlFilePath, pageHtml, "utf-8");

      console.log(`  -> Wrote: ${dirIndexPath} (${pageHtml.length} bytes)`);
      console.log(`  -> Wrote: ${htmlFilePath} (${pageHtml.length} bytes)`);
    }
  }

  console.log("\nPrerendering complete for all routes!");
}

prerender().catch((err) => {
  console.error("Prerendering failed:", err);
  process.exit(1);
});
