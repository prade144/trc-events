import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-48 pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-brand-red font-bold uppercase tracking-[0.5em] text-xs mb-6 block">Bangalore's Premier Event Architects</span>
            <h1 className="text-6xl md:text-[10rem] font-display uppercase leading-[0.85] tracking-tighter mb-8">
              Events <br />
              <span className="text-brand-red text-glow italic">Redefined</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-light tracking-wide mb-12 leading-relaxed">
              We don't just plan events; we craft experiences that resonate. From intimate weddings to massive concerts, we bring your vision to life.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-12">
              <Link 
                to="/services"
                className="group bg-brand-red px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:scale-105 transition-all flex items-center gap-3 whitespace-nowrap"
              >
                Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/portfolio"
                className="glass px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white hover:text-brand-black transition-all whitespace-nowrap"
              >
                View Portfolio
              </Link>
              <Link 
                to="/about"
                className="glass px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white hover:text-brand-black transition-all whitespace-nowrap"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>

        <button 
          onClick={scrollToNext}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity cursor-pointer z-20 group"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent group-hover:h-16 transition-all duration-500" />
        </button>
      </section>

      {/* Featured Section */}
      <section className="py-32 px-6 bg-brand-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Excellence in Execution</span>
              <h2 className="text-4xl md:text-6xl font-display uppercase leading-tight mb-8">
                Crafting Moments That <span className="italic text-white/60">Last Forever</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed mb-10">
                With over a decade of experience in the heart of Bangalore, The RED Company has been at the forefront of the city's most iconic events. We blend creativity with technical precision to deliver results that exceed expectations.
              </p>
              <Link 
                to="/about"
                className="inline-flex items-center gap-3 text-brand-red font-bold uppercase tracking-[0.2em] text-xs group"
              >
                Learn more about us <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 border border-brand-red/20 translate-x-6 translate-y-6" />
              <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000" 
                alt="Event Production"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
