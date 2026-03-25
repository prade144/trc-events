import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { services } from "../constants";

export default function Services() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Our Expertise</span>
          <h2 className="text-6xl md:text-8xl font-display uppercase leading-none tracking-tighter">Bespoke <br />Services</h2>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-md text-white/40 text-lg font-light leading-relaxed"
        >
          Tailored solutions for every occasion. We bring passion, precision, and a touch of magic to every project we undertake.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.1 
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative h-[500px] overflow-hidden rounded-[2.5rem] cursor-pointer shadow-2xl"
          >
            <img 
              src={service.image} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt={service.title}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-brand-red mb-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                {service.icon}
              </div>
              <h3 className="text-4xl font-display uppercase mb-3 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 delay-75 tracking-tight">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 delay-150 transform translate-y-4 group-hover:translate-y-0">
                {service.description}
              </p>
              <motion.div 
                whileHover={{ x: 5 }}
                className="mt-8 flex items-center gap-3 text-brand-red font-bold uppercase text-[10px] tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 cursor-pointer"
              >
                <span className="relative overflow-hidden group/link">
                  Book This Service
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-red transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
