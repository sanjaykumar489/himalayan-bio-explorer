import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SpeciesSection from "@/components/SpeciesSection";
import MapSection from "@/components/MapSection";
import AISection from "@/components/AISection";
import DashboardSection from "@/components/DashboardSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SpeciesSection />
      <MapSection />
      <AISection />
      <DashboardSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
