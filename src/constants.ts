import { Heart, MapPin, Cake, Briefcase, Music } from "lucide-react";
import React from "react";

export const services = [
  {
    title: "Wedding Planning",
    description: "Creating timeless memories with meticulous attention to detail. From venue selection to the last dance.",
    icon: React.createElement(Heart, { className: "w-8 h-8" }),
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Destination Wedding",
    description: "Your dream wedding in exotic locations. We handle all logistics so you can enjoy your special day.",
    icon: React.createElement(MapPin, { className: "w-8 h-8" }),
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Birthday Planning",
    description: "From intimate gatherings to grand celebrations. We bring your vision to life with creative themes.",
    icon: React.createElement(Cake, { className: "w-8 h-8" }),
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Corporate Events",
    description: "Professional event management for conferences, product launches, and team-building retreats.",
    icon: React.createElement(Briefcase, { className: "w-8 h-8" }),
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Concerts in Bangalore",
    description: "Managing high-energy concerts and live performances in the heart of Bangalore's music scene.",
    icon: React.createElement(Music, { className: "w-8 h-8" }),
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800"
  }
];

export const portfolioItems = [
  { image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800", title: "Royal Palace Wedding", category: "Wedding" },
  { image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800", title: "Bangalore Music Fest", category: "Concert" },
  { image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800", title: "Global Tech Summit", category: "Corporate" },
  { image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800", title: "Neon Birthday Bash", category: "Birthday" },
];
