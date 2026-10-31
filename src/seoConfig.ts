export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface RouteSEOConfig {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogType: "website" | "article";
  breadcrumbs: BreadcrumbItem[];
  schema?: Record<string, any> | Array<Record<string, any>>;
}

export const DOMAIN = "https://www.theredcompany.co.in";
export const DEFAULT_OG_IMAGE = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200";

export const ROUTES_SEO: Record<string, RouteSEOConfig> = {
  "/": {
    path: "/",
    title: "The RED Company | Luxury Event Management & Wedding Planners in Bangalore",
    description: "The RED Company is Bangalore's premier event management company and luxury wedding planners. We craft bespoke weddings, destination weddings, corporate events, and concerts.",
    canonicalUrl: `${DOMAIN}/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    breadcrumbs: [{ name: "Home", item: "/" }],
  },
  "/services": {
    path: "/services",
    title: "Event Services | Weddings, Corporate Events & Concerts | The RED Company",
    description: "Explore bespoke event management services in Bangalore by The RED Company: luxury wedding planning, destination weddings, corporate events, and live concerts.",
    canonicalUrl: `${DOMAIN}/services`,
    ogImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    ogType: "website",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Services", item: "/services" },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Luxury Event Management Services in Bangalore",
      "description": "Comprehensive bespoke event and luxury wedding planning services in Bangalore by The RED Company.",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Service",
            "name": "Luxury Wedding Planning in Bangalore",
            "description": "Comprehensive luxury wedding planning, thematic decor, venue curation, and royal hospitality.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "The RED Company",
              "telephone": "+918217448031"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Service",
            "name": "Destination Wedding Planning",
            "description": "Seamless destination wedding execution, guest logistics, and breathtaking setups across India and abroad.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "The RED Company",
              "telephone": "+918217448031"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Service",
            "name": "Corporate Event Management Bangalore",
            "description": "High-impact annual galas, global leadership summits, product launches, and experiential brand activations.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "The RED Company",
              "telephone": "+918217448031"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Service",
            "name": "Live Concerts & Music Festivals",
            "description": "Stadium-grade sound, intelligent lighting, artist hospitality, and technical event production in Bangalore.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "The RED Company",
              "telephone": "+918217448031"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "Service",
            "name": "Bespoke Birthday & Milestone Celebrations",
            "description": "Exclusive private milestone parties, themed birthdays, and intimate luxury gatherings in Bangalore.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "The RED Company",
              "telephone": "+918217448031"
            }
          }
        }
      ]
    }
  },
  "/portfolio": {
    path: "/portfolio",
    title: "Event Portfolio & Past Works | The RED Company Bangalore",
    description: "View our portfolio of luxury weddings, music festivals, corporate conferences, and private celebrations executed in Bangalore by The RED Company.",
    canonicalUrl: `${DOMAIN}/portfolio`,
    ogImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200",
    ogType: "website",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Portfolio", item: "/portfolio" },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "The RED Company Event Portfolio",
      "description": "Selected luxury weddings, concerts, summits, and private celebrations planned and produced across Bangalore.",
      "url": `${DOMAIN}/portfolio`
    }
  },
  "/about": {
    path: "/about",
    title: "About Us | Bangalore's Premier Event Architects | The RED Company",
    description: "Learn about The RED Company: with over 10 years of event excellence in Bangalore, our event architects deliver luxury weddings, corporate galas, and live concerts.",
    canonicalUrl: `${DOMAIN}/about`,
    ogImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
    ogType: "website",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "About Us", item: "/about" },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About The RED Company",
      "description": "Bangalore's Premier Event Architects with over a decade of excellence in luxury weddings, corporate events, and concerts.",
      "url": `${DOMAIN}/about`,
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "The RED Company",
        "telephone": "+918217448031",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rajajinagar",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "postalCode": "560010",
          "addressCountry": "IN"
        }
      }
    }
  },
  "/contact": {
    path: "/contact",
    title: "Contact & Book Event Planners | The RED Company Bangalore",
    description: "Contact The RED Company in Rajajinagar, Bangalore for luxury weddings, corporate gatherings, and live concerts. Call +91 82174 48031 or send an enquiry.",
    canonicalUrl: `${DOMAIN}/contact`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Contact", item: "/contact" },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact The RED Company",
      "description": "Direct contact channels for The RED Company in Rajajinagar, Bangalore. Book consultations for luxury weddings, corporate events, and concerts.",
      "url": `${DOMAIN}/contact`,
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "The RED Company",
        "telephone": ["+918217448031", "+917975018465"],
        "email": "connect@theredcompany.co.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rajajinagar",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "postalCode": "560010",
          "addressCountry": "IN"
        }
      }
    }
  }
};
