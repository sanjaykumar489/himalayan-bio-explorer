import { Mountain } from "lucide-react";

const Footer = () => (
  <footer className="bg-hero py-16">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Mountain className="h-7 w-7 text-secondary" />
            <span className="font-serif font-bold text-secondary text-lg">HBIS</span>
          </div>
          <p className="text-sm text-secondary/60 leading-relaxed">
            Himalayan Biodiversity Information System — cataloguing, analyzing, and conserving biodiversity across 146 districts of the IHR.
          </p>
        </div>

        {[
          {
            title: "Platform",
            links: ["Species Database", "Geospatial DSS", "AI Identification", "Mobile App", "API Access"],
          },
          {
            title: "Resources",
            links: ["Documentation", "Research Papers", "Training Guides", "Data Standards", "Open APIs"],
          },
          {
            title: "Organization",
            links: ["MoEFCC", "About HBIS", "Contact Us", "Privacy Policy", "Terms of Use"],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-serif font-semibold text-secondary mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-secondary/50 hover:text-secondary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-secondary/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-secondary/40">
          © 2026 Ministry of Environment, Forest & Climate Change, Government of India. All rights reserved.
        </p>
        <p className="text-xs text-secondary/40">
          Developed by Peymagen Informatics & Automation Pvt. Ltd.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
