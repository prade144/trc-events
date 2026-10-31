import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { portfolioItems } from "../constants";
import SEO from "../components/SEO";

interface ParallaxCardProps {
  key?: string | number;
  item: {
    image: string;
    title: string;
    category: string;
  };
  index: number;
}

function ParallaxCard({ item, index }: ParallaxCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-brand-black"
    >
      <motion.img 
        src={item.image} 
        style={{ y, scale: 1.2 }}
        className="absolute inset-0 w-full h-[120%] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-1000 ease-out" 
        alt={`${item.title} - ${item.category} event organised by The RED Company Bangalore`}
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
        width={800}
        height={1000}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent p-10 flex flex-col justify-end text-white pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-red mb-2">{item.category}</span>
        <h2 className="text-3xl font-display uppercase tracking-tight">{item.title}</h2>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section className="py-32 bg-white text-brand-black overflow-hidden min-h-screen">
      <SEO
        title="Event Portfolio & Past Works | The RED Company Bangalore"
        description="View our portfolio of luxury weddings, music festivals, corporate conferences, and private celebrations executed in Bangalore by The RED Company."
        canonicalPath="/portfolio"
        ogImage="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Portfolio", item: "/portfolio" }
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 mb-20">
        <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Visual Journey</span>
        <h1 className="text-6xl md:text-8xl font-display uppercase leading-none tracking-tighter">Selected <br />Works</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
        {portfolioItems.map((item, index) => (
          <ParallaxCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
