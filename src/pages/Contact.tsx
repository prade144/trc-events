import { motion } from "motion/react";
import { Phone, Mail, MapPin, Star, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState<string>("");

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const lower = serviceParam.toLowerCase();
      if (lower.includes("wedding") && !lower.includes("destination")) {
        setSelectedService("wedding");
      } else if (lower.includes("destination")) {
        setSelectedService("destination");
      } else if (lower.includes("birthday")) {
        setSelectedService("birthday");
      } else if (lower.includes("corporate")) {
        setSelectedService("corporate");
      } else if (lower.includes("concert")) {
        setSelectedService("concert");
      }
    }
  }, [searchParams]);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto min-h-screen flex items-center">
      <SEO
        title="Contact & Book Event Planners | The RED Company Bangalore"
        description="Contact The RED Company in Rajajinagar, Bangalore for luxury weddings, corporate gatherings, and live concerts. Call +91 82174 48031 or send an enquiry."
        canonicalPath="/contact"
        ogImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Contact", item: "/contact" }
        ]}
      />

      <div className="glass rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row gap-24 border-white/5 shadow-2xl w-full">
        <div className="lg:w-1/2">
          <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Get In Touch</span>
          <h1 className="text-6xl md:text-8xl font-display uppercase leading-none mb-10 tracking-tighter">Let's Start <br />Planning</h1>
          <p className="text-white/40 text-lg font-light mb-16 leading-relaxed">
            Ready to create something extraordinary? Reach out to our team of expert event planners in Bangalore today.
          </p>

          <div className="space-y-10">
            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold mb-2">Call Us</p>
                <a href="tel:+918217448031" className="text-2xl font-semibold tracking-tight block hover:text-brand-red transition-colors">+91 82174 48031</a>
                <a href="tel:+917975018465" className="text-2xl font-semibold tracking-tight block hover:text-brand-red transition-colors">+91 79750 18465</a>
              </div>
            </div>
            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold mb-2">Email Us</p>
                <a href="mailto:connect@theredcompany.co.in" className="text-2xl font-semibold tracking-tight hover:text-brand-red transition-colors">
                  connect@theredcompany.co.in
                </a>
              </div>
            </div>
            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold mb-2">Visit Us</p>
                <p className="text-2xl font-semibold tracking-tight">Rajajinagar, Bangalore, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          {formStatus === "sent" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-16 glass rounded-[3rem] border-brand-red/20"
            >
              <div className="w-24 h-24 bg-brand-red rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-brand-red/40">
                <Star className="w-12 h-12 text-white fill-white" />
              </div>
              <h2 className="text-4xl font-display uppercase mb-6 tracking-tight">Message Received</h2>
              <p className="text-white/50 text-lg font-light mb-10 leading-relaxed">
                Thank you for trusting us. One of our lead planners will contact you within 24 hours.
              </p>
              <button 
                onClick={() => {
                  setFormStatus("idle");
                  setErrorMessage(null);
                }}
                className="text-brand-red font-bold uppercase tracking-[0.3em] text-[10px] underline underline-offset-[12px] hover:text-white transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                setErrorMessage(null);
                setFormStatus("sending");
                
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                try {
                  const response = await fetch("/api/contact", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    }
                  });
                  
                  if (response.ok) {
                    setFormStatus("sent");
                    form.reset();
                  } else {
                    const errorData = await response.json().catch(() => ({}));
                    const msg = errorData.details 
                      ? `${errorData.error}: ${errorData.details}` 
                      : (errorData.error || "Oops! There was a problem submitting your enquiry.");
                    setErrorMessage(msg);
                    setFormStatus("idle");
                  }
                } catch (error) {
                  console.error("Submission error:", error);
                  setErrorMessage("Network error: Could not reach the server. Please check your connection or call us directly.");
                  setFormStatus("idle");
                }
              }} 
              className="space-y-8"
            >
              {/* Invisible spam honeypot field for bot mitigation */}
              <input 
                type="text" 
                name="_hp" 
                tabIndex={-1} 
                autoComplete="off" 
                style={{ display: "none" }} 
                aria-hidden="true" 
              />

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center gap-3 text-red-400 text-xs font-semibold">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name-input" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 ml-4">Full Name</label>
                  <input 
                    id="name-input"
                    required
                    name="name"
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email-input" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 ml-4">Email Address</label>
                  <input 
                    id="email-input"
                    required
                    name="email"
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="service-select" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 ml-4">Event Type</label>
                <select 
                  id="service-select"
                  required 
                  name="service" 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light appearance-none cursor-pointer"
                >
                  <option value="" className="bg-brand-black">Select Service</option>
                  <option value="wedding" className="bg-brand-black">Wedding Planning</option>
                  <option value="destination" className="bg-brand-black">Destination Wedding</option>
                  <option value="birthday" className="bg-brand-black">Birthday Planning</option>
                  <option value="corporate" className="bg-brand-black">Corporate Events</option>
                  <option value="concert" className="bg-brand-black">Concerts</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message-input" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 ml-4">Message</label>
                <textarea 
                  id="message-input"
                  required
                  name="message"
                  placeholder="Tell us about your dream event..." 
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light resize-none"
                />
              </div>
              <button 
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full bg-brand-red py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-xs hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 shadow-xl shadow-brand-red/20 flex items-center justify-center gap-3 cursor-pointer"
              >
                {formStatus === "sending" ? "Processing..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
