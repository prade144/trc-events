import { Star, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Our Story", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="py-20 border-t border-white/5 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
          {/* Brand Logo */}
          <Link to="/" className="text-3xl font-display tracking-tighter flex items-center cursor-pointer group">
            <span className="text-white opacity-40 text-[10px] uppercase tracking-[0.5em] mr-4">The</span>
            <span className="text-brand-red relative text-4xl">
              RED
              <Star className="absolute -top-1 -left-2 w-3 h-3 fill-brand-red" />
            </span>
            <span className="text-white opacity-40 text-[10px] uppercase tracking-[0.5em] ml-4">Company</span>
          </Link>

          {/* Crawlable Internal Navigation Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-bold uppercase tracking-[0.25em]">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-white/40 hover:text-brand-red transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-8">
            <a 
              href="https://www.instagram.com/theredcompany_trc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="The RED Company Instagram"
              className="text-white/20 hover:text-brand-red transition-all transform hover:scale-125"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://www.facebook.com/people/Theredcompany/61584241588371/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="The RED Company Facebook"
              className="text-white/20 hover:text-brand-red transition-all transform hover:scale-125"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Location & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold text-center md:text-left">
            © 2026 The Red Company &bull; Rajajinagar, Bangalore &bull; All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
