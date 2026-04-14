import { useState } from "react";
import { Mountain, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Species", href: "#species" },
  { label: "Map", href: "#map" },
  { label: "AI Identify", href: "#ai" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#home" className="flex items-center gap-2">
          <Mountain className="h-8 w-8 text-primary" />
          <div>
            <span className="text-lg font-serif font-bold text-foreground">HBIS</span>
            <span className="hidden sm:block text-xs text-muted-foreground leading-none">
              Himalayan Biodiversity
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-glass border-t border-border px-6 pb-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block py-2 text-sm text-muted-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
