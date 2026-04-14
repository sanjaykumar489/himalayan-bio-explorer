import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mountain, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const demoCredentials = [
  { role: "Admin", email: "admin@hbis.demo", password: "admin123456", desc: "Full access: manage species, users, sightings, dashboard" },
  { role: "Researcher", email: "researcher@hbis.demo", password: "researcher123456", desc: "Add/edit species, review sightings, view analytics" },
  { role: "Public User", email: "public@hbis.demo", password: "public123456", desc: "View species, submit sightings, use AI identification" },
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName);
      }
      toast({ title: isLogin ? "Welcome back!" : "Account created!" });
      navigate("/");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (cred: typeof demoCredentials[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-6">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
        {/* Login Form */}
        <div className="bg-card/90 backdrop-blur rounded-2xl border border-border p-8">
          <div className="flex items-center gap-2 mb-6">
            <Mountain className="h-8 w-8 text-primary" />
            <span className="text-xl font-serif font-bold text-foreground">HBIS</span>
          </div>

          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {isLogin ? "Access the biodiversity platform" : "Join the conservation community"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-foreground">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Your name"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 pr-10 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {submitting ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-card/90 backdrop-blur rounded-2xl border border-border p-8">
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Demo Credentials</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Click any role to auto-fill credentials and explore the platform.
          </p>

          <div className="space-y-3">
            {demoCredentials.map((cred) => (
              <button
                key={cred.role}
                onClick={() => fillDemo(cred)}
                className="w-full text-left p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-foreground">{cred.role}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {cred.email}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{cred.desc}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Password: <code className="bg-muted px-1 rounded">{cred.password}</code>
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
