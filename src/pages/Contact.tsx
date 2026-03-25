import { motion } from "motion/react";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto min-h-screen flex items-center">
      <div className="glass rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row gap-24 border-white/5 shadow-2xl w-full">
        <div className="lg:w-1/2">
          <span className="text-brand-red font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Get In Touch</span>
          <h2 className="text-6xl md:text-8xl font-display uppercase leading-none mb-10 tracking-tighter">Let's Start <br />Planning</h2>
          <p className="text-white/40 text-lg font-light mb-16 leading-relaxed">
            Ready to create something extraordinary? Reach out to our team of expert planners today.
          </p>

          <div className="space-y-10">
            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold mb-2">Call Us</p>
                <p className="text-2xl font-semibold tracking-tight">+91 82174 48031</p>
                <p className="text-2xl font-semibold tracking-tight">+91 79750 18465</p>
              </div>
            </div>
            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold mb-2">Email Us</p>
                <p className="text-2xl font-semibold tracking-tight">connect@theredcompany.co.in</p>
              </div>
            </div>
            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold mb-2">Visit Us</p>
                <p className="text-2xl font-semibold tracking-tight">Rajajinagar, Bangalore</p>
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
              <h3 className="text-4xl font-display uppercase mb-6 tracking-tight">Message Received</h3>
              <p className="text-white/50 text-lg font-light mb-10 leading-relaxed">Thank you for trusting us. One of our lead planners will contact you within 24 hours.</p>
              <button 
                onClick={() => setFormStatus("idle")}
                className="text-brand-red font-bold uppercase tracking-[0.3em] text-[10px] underline underline-offset-[12px] hover:text-white transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
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
                    const errorData = await response.json();
                    const errorMessage = errorData.details 
                      ? `${errorData.error}: ${errorData.details}` 
                      : (errorData.error || "Oops! There was a problem submitting your form");
                    alert(errorMessage);
                    setFormStatus("idle");
                  }
                } catch (error) {
                  console.error("Submission error:", error);
                  alert("Oops! There was a problem submitting your form. Please check your connection.");
                  setFormStatus("idle");
                }
              }} 
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 ml-4">Full Name</label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 ml-4">Email Address</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 ml-4">Event Type</label>
                <select required name="service" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light appearance-none cursor-pointer">
                  <option value="" className="bg-brand-black">Select Service</option>
                  <option value="wedding" className="bg-brand-black">Wedding Planning</option>
                  <option value="destination" className="bg-brand-black">Destination Wedding</option>
                  <option value="birthday" className="bg-brand-black">Birthday Planning</option>
                  <option value="corporate" className="bg-brand-black">Corporate Events</option>
                  <option value="concert" className="bg-brand-black">Concerts</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 ml-4">Message</label>
                <textarea 
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
                className="w-full bg-brand-red py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-xs hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 shadow-xl shadow-brand-red/20 flex items-center justify-center gap-3"
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
