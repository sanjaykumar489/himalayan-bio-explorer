import { useState } from "react";
import { Search, Filter } from "lucide-react";
import monalImg from "@/assets/species-monal.png";
import leopardImg from "@/assets/species-leopard.png";
import redpandaImg from "@/assets/species-redpanda.png";
import rhodoImg from "@/assets/species-rhododendron.png";

const categories = ["All", "Mammals", "Birds", "Flora", "Reptiles"];

const species = [
  {
    name: "Himalayan Monal",
    scientific: "Lophophorus impejanus",
    category: "Birds",
    status: "Least Concern",
    statusColor: "bg-secondary",
    habitat: "Subalpine forests, 2400–4500m",
    image: monalImg,
  },
  {
    name: "Snow Leopard",
    scientific: "Panthera uncia",
    category: "Mammals",
    status: "Vulnerable",
    statusColor: "bg-accent",
    habitat: "Alpine meadows, 3000–5500m",
    image: leopardImg,
  },
  {
    name: "Red Panda",
    scientific: "Ailurus fulgens",
    category: "Mammals",
    status: "Endangered",
    statusColor: "bg-destructive",
    habitat: "Temperate forests, 2200–4800m",
    image: redpandaImg,
  },
  {
    name: "Rhododendron arboreum",
    scientific: "Rhododendron arboreum",
    category: "Flora",
    status: "Least Concern",
    statusColor: "bg-secondary",
    habitat: "Himalayan slopes, 1500–3600m",
    image: rhodoImg,
  },
];

const SpeciesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = species.filter(
    (s) =>
      (activeCategory === "All" || s.category === activeCategory) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.scientific.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section id="species" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Species Database
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the rich biodiversity of the Indian Himalayan Region — from iconic mammals to rare endemic flora.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search species by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4 text-muted-foreground mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((s) => (
            <div
              key={s.name}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif font-semibold text-foreground">{s.name}</h3>
                  <span className={`${s.statusColor} text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-medium`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-xs italic text-muted-foreground mb-2">{s.scientific}</p>
                <p className="text-xs text-muted-foreground">{s.habitat}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No species found matching your criteria.</p>
        )}
      </div>
    </section>
  );
};

export default SpeciesSection;
