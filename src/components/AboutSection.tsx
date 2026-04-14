import { Users, Database, Globe, BookOpen, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Centralized Repository",
    desc: "Comprehensive biodiversity knowledge base covering 146 districts of the Indian Himalayan Region.",
  },
  {
    icon: Globe,
    title: "Geospatial DSS",
    desc: "Evidence-based planning through interactive maps, climate layers, and habitat analysis tools.",
  },
  {
    icon: Smartphone,
    title: "Citizen Science",
    desc: "Mobile app enabling public participation with GPS-tagged observations and offline data capture.",
  },
  {
    icon: Users,
    title: "Multi-Stakeholder",
    desc: "Serving researchers, policymakers, administrators, and citizens with role-based access.",
  },
  {
    icon: BookOpen,
    title: "Bibliographic Module",
    desc: "Research papers, DOI linking, and comprehensive documentation for scientific reference.",
  },
  {
    icon: Shield,
    title: "Secure & Open",
    desc: "OAuth 2.0 authentication, RBAC, encrypted data, and open-access REST & GraphQL APIs.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            About HBIS
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built for the Ministry of Environment, Forest & Climate Change — a unified platform for Himalayan biodiversity conservation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-shadow group"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
