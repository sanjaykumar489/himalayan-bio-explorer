import { useEffect, useRef } from "react";
import { Layers, MapPin } from "lucide-react";

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");

      const map = L.map(mapRef.current!, {
        center: [30.5, 79.5],
        zoom: 6,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Sample biodiversity hotspots
      const hotspots = [
        { lat: 27.98, lng: 86.92, name: "Sagarmatha Region", species: 340 },
        { lat: 31.1, lng: 77.17, name: "Great Himalayan NP", species: 805 },
        { lat: 27.33, lng: 88.6, name: "Khangchendzonga", species: 550 },
        { lat: 29.39, lng: 79.5, name: "Nanda Devi Biosphere", species: 620 },
        { lat: 34.08, lng: 74.79, name: "Dachigam NP", species: 280 },
        { lat: 28.7, lng: 83.5, name: "Annapurna Region", species: 470 },
      ];

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width:28px;height:28px;border-radius:50%;background:hsl(121,37%,27%);border:3px solid hsl(87,40%,56%);box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center">
          <div style="width:8px;height:8px;border-radius:50%;background:hsl(80,20%,97%)"></div>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      hotspots.forEach((h) => {
        L.marker([h.lat, h.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:Inter,sans-serif">
              <strong style="font-size:14px">${h.name}</strong><br/>
              <span style="color:#666">${h.species} species documented</span>
            </div>`
          );
      });

      mapInstance.current = map;
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <section id="map" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Geospatial Explorer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive map of the Indian Himalayan Region with species distribution, conservation zones, and biodiversity hotspots.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Layers Panel */}
          <div className="bg-background rounded-xl border border-border p-5">
            <h3 className="font-serif font-semibold text-foreground flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-primary" /> Map Layers
            </h3>
            {[
              { label: "Species Distribution", active: true },
              { label: "Conservation Zones", active: true },
              { label: "Forest Cover", active: false },
              { label: "Climate Data", active: false },
              { label: "Altitude Zones", active: false },
              { label: "Land Use", active: false },
            ].map((layer) => (
              <label key={layer.label} className="flex items-center gap-3 py-2 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={layer.active}
                  className="accent-primary h-4 w-4 rounded"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {layer.label}
                </span>
              </label>
            ))}

            <div className="mt-6 p-3 rounded-lg bg-muted">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-foreground">Legend</span>
              </div>
              <div className="space-y-1">
                {["High Density", "Medium Density", "Low Density"].map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: ["hsl(121,37%,27%)", "hsl(87,40%,56%)", "hsl(80,15%,85%)"][i],
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 rounded-xl overflow-hidden border border-border" style={{ minHeight: 500 }}>
            <div ref={mapRef} className="w-full h-full" style={{ minHeight: 500 }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
