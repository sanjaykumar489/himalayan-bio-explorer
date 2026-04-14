import heroImg from "@/assets/hero-himalaya.jpg";
import { ArrowDown, Leaf, Map, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Himalayan landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero opacity-70" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 mb-6">
            <Leaf className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              Indian Himalayan Region • 146 Districts
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gradient-hero leading-tight mb-6">
            Himalayan Biodiversity Information System
          </h1>

          <p className="text-lg md:text-xl text-secondary/80 mb-10 max-w-2xl leading-relaxed">
            A comprehensive open-access digital platform to catalogue, analyze, and conserve
            biodiversity across the Indian Himalayan Region — powered by AI and geospatial analytics.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a href="#species" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              <Leaf className="h-5 w-5" /> Explore Species
            </a>
            <a href="#map" className="inline-flex items-center gap-2 bg-secondary/20 text-secondary border border-secondary/30 px-6 py-3 rounded-lg font-medium hover:bg-secondary/30 transition-colors">
              <Map className="h-5 w-5" /> View Map
            </a>
            <a href="#ai" className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 px-6 py-3 rounded-lg font-medium hover:bg-accent/30 transition-colors">
              <Brain className="h-5 w-5" /> AI Identify
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-lg">
            {[
              { num: "8,500+", label: "Plant Species" },
              { num: "1,200+", label: "Animal Species" },
              { num: "146", label: "Districts Covered" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-serif font-bold text-secondary">{stat.num}</div>
                <div className="text-sm text-secondary/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a href="#species" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <ArrowDown className="h-8 w-8 text-secondary/60" />
      </a>
    </section>
  );
};

export default HeroSection;
