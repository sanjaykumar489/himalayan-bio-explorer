import { useState } from "react";
import { Mountain, Menu, X, LogIn, LogOut, User, Shield, Microscope } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Species", href: "#species" },
    { label: "Map", href: "#map" },
    { label: "AI Identify", href: "#ai" },
    { label: "Dashboard", href: "#dashboard", roles: ["admin", "researcher"] as const },
    { label: "About", href: "#about" },
  ];

  const visibleItems = navItems.filter(
    (item) => !item.roles || (role && (item.roles as readonly string[]).includes(role))
  );

  const roleIcon = role === "admin" ? <Shield className="h-4 w-4" /> : role === "researcher" ? <Microscope className="h-4 w-4" /> : <User className="h-4 w-4" />;
  const roleBadgeColor = role === "admin" ? "bg-destructive/10 text-destructive" : role === "researcher" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary";

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

        <div className="hidden md:flex items-center gap-6">
          {visibleItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${roleBadgeColor}`}>
                {roleIcon}
                {role?.charAt(0).toUpperCase()}{role?.slice(1)}
              </span>
              <button
                onClick={async () => { await signOut(); navigate("/auth"); }}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <LogIn className="h-4 w-4" /> Sign In
            </button>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-glass border-t border-border px-6 pb-4">
          {visibleItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block py-2 text-sm text-muted-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {user ? (
            <div className="pt-2 border-t border-border mt-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${roleBadgeColor} mb-2`}>
                {roleIcon} {role?.charAt(0).toUpperCase()}{role?.slice(1)}
              </span>
              <button
                onClick={async () => { await signOut(); navigate("/auth"); setOpen(false); }}
                className="block text-sm text-destructive py-1"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => { navigate("/auth"); setOpen(false); }}
              className="block text-sm text-primary font-medium py-2"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
