import { motion } from "motion/react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function About() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto min-h-screen flex items-center">
      <SEO
        title="About Us | Bangalore's Premier Event Architects | The RED Company"
        description="Learn about The RED Company: with over 10 years of event excellence in Bangalore, our event architects deliver luxury weddings, corporate galas, and live concerts."
        canonicalPath="/about"
        ogImage="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "About Us", item: "/about" }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              alt="The RED Company event planning team in Bangalore"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              width={1000}
              height={1250}
            />
          </motion.div>
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-12 -right-12 w-72 h-72 bg-brand-red rounded-full flex items-center justify-center p-10 text-white text-center shadow-2xl shadow-brand-red/30"
          >
            <div>
              <span className="text-6xl font-display block mb-2">10+</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed block">Years of Excellence in Bangalore</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Our Story</span>
          <h1 className="text-6xl md:text-8xl font-display uppercase leading-none mb-10 tracking-tighter">Crafting <br />Unforgettable <br />Moments</h1>
          <p className="text-xl text-white/50 mb-10 leading-relaxed font-light">
            Founded on the principles of creativity and precision, The Red Company has evolved into Bangalore's most trusted event management firm. We don't just manage logistics; we curate emotions.
          </p>
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div className="border-l border-brand-red pl-6">
              <span className="font-display text-4xl uppercase mb-2 block">500+</span>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Events Delivered</p>
            </div>
            <div className="border-l border-brand-red pl-6">
              <span className="font-display text-4xl uppercase mb-2 block">100%</span>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Client Retention</p>
            </div>
          </div>
          <Link 
            to="/contact"
            className="bg-white text-brand-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-red hover:text-white transition-all shadow-xl inline-block"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
