import { motion } from "motion/react";
import { X, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface BookingModalProps {
  onClose: () => void;
}

export default function BookingModal({ onClose }: BookingModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onClick={onClose}
        className="absolute inset-0 bg-brand-black/95 backdrop-blur-md" 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="glass relative z-10 w-full max-w-xl p-12 rounded-[3rem] text-center border-white/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-8">
          <Star className="w-10 h-10 text-white fill-white" />
        </div>
        <h3 className="text-5xl font-display uppercase mb-4 tracking-tighter">Reserve Your Date</h3>
        <p className="text-white/60 text-lg mb-10 font-light">Our planners are ready to bring your vision to life. Choose how you'd like to connect.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            to="/contact"
            onClick={onClose}
            className="bg-brand-red py-5 rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center"
          >
            Inquiry Form
          </Link>
          <a 
            href="https://wa.me/918217448031" 
            target="_blank" 
            rel="noreferrer"
            className="glass py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-brand-black transition-all flex items-center justify-center gap-2"
          >
            WhatsApp Us
          </a>
        </div>
        <p className="mt-8 text-xs text-white/30 uppercase tracking-[0.3em]">Available 24/7 for urgent bookings</p>
      </motion.div>
    </div>
  );
}
