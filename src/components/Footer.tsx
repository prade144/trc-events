import { Star, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <Link to="/" className="text-3xl font-display tracking-tighter flex items-center cursor-pointer group">
            <span className="text-white opacity-40 text-[10px] uppercase tracking-[0.5em] mr-4">The</span>
            <span className="text-brand-red relative text-4xl">
              RED
              <Star className="absolute -top-1 -left-2 w-3 h-3 fill-brand-red" />
            </span>
            <span className="text-white opacity-40 text-[10px] uppercase tracking-[0.5em] ml-4">Company</span>
          </Link>

          <div className="flex items-center gap-10">
            <a href="https://www.instagram.com/theredcompany_trc/" target="_blank" rel="noreferrer" className="text-white/20 hover:text-brand-red transition-all transform hover:scale-125"><Instagram className="w-6 h-6" /></a>
            <a href="https://www.facebook.com/people/Theredcompany/61584241588371/" target="_blank" rel="noreferrer" className="text-white/20 hover:text-brand-red transition-all transform hover:scale-125"><Facebook className="w-6 h-6" /></a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">
            © 2026 The Red Company. Bangalore's Finest.
          </p>
          <div className="flex gap-8 text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
