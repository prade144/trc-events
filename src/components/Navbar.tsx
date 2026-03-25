import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Star, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Our Story", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? "glass py-4 shadow-2xl" : "bg-gradient-to-b from-brand-black/60 to-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group w-1/4">
          <div className="text-2xl font-display tracking-tighter flex items-center">
            <span className="text-white opacity-40 text-[10px] uppercase tracking-[0.4em] mr-3 transition-opacity group-hover:opacity-100">The</span>
            <span className="text-brand-red relative text-3xl">
              RED
              <Star className="absolute -top-1 -left-2 w-3 h-3 fill-brand-red animate-pulse" />
            </span>
            <span className="text-white opacity-40 text-[10px] uppercase tracking-[0.4em] ml-3 transition-opacity group-hover:opacity-100">Company</span>
          </div>
        </Link>

        {/* Desktop Nav Links (Center) */}
        <div className="hidden md:flex items-center justify-center gap-8 text-[11px] font-bold uppercase tracking-[0.25em] flex-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`hover:text-brand-red transition-colors relative group ${location.pathname === link.path ? 'text-brand-red' : ''}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-px bg-brand-red transition-all ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
        </div>

        {/* Desktop CTA (Right) */}
        <div className="hidden md:flex items-center justify-end w-1/4">
          <button 
            onClick={onOpenBooking}
            className="bg-brand-red px-8 py-3 rounded-full hover:bg-white hover:text-brand-black transition-all duration-500 shadow-lg shadow-brand-red/20 font-bold uppercase tracking-[0.2em] text-[10px]"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white p-2 glass rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-brand-black/98 backdrop-blur-2xl border-t border-white/5 min-h-screen flex flex-col items-center gap-8 pt-16 text-xs font-bold uppercase tracking-[0.3em]"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`hover:text-brand-red transition-colors ${location.pathname === link.path ? 'text-brand-red' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <button onClick={() => { setIsMenuOpen(false); onOpenBooking(); }} className="bg-brand-red px-12 py-4 rounded-full mt-4">Book Now</button>
        </motion.div>
      )}
    </nav>
  );
}
