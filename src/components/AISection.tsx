import { useState, useCallback } from "react";
import { Brain, Upload, Camera, Sparkles, AlertTriangle } from "lucide-react";

const mockResults = [
  { name: "Himalayan Monal", confidence: 94, scientific: "Lophophorus impejanus" },
  { name: "Satyr Tragopan", confidence: 4, scientific: "Tragopan satyra" },
  { name: "Blood Pheasant", confidence: 2, scientific: "Ithaginis cruentus" },
];

const AISection = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<typeof mockResults | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setResults(null);
      setLoading(true);
      // Simulate AI processing
      setTimeout(() => {
        setResults(mockResults);
        setLoading(false);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="ai" className="py-24 bg-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 mb-4">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">AI-Powered</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gradient-hero mb-4">
            Species Identification
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto">
            Upload a photo and our AI engine will identify the species using deep learning models
            trained on Himalayan biodiversity data.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Upload Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="relative rounded-2xl border-2 border-dashed border-secondary/30 bg-secondary/5 flex flex-col items-center justify-center min-h-[320px] cursor-pointer hover:border-secondary/50 transition-colors overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="Uploaded species" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-8">
                <Upload className="h-12 w-12 text-secondary/50 mx-auto mb-4" />
                <p className="text-secondary/80 font-medium mb-2">Drop an image here</p>
                <p className="text-sm text-secondary/50 mb-4">or click to browse</p>
                <label className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:opacity-90">
                  <Camera className="h-4 w-4" /> Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
            <h3 className="font-serif font-semibold text-secondary flex items-center gap-2 mb-6">
              <Brain className="h-5 w-5" /> Identification Results
            </h3>

            {!preview && !loading && (
              <div className="text-center py-12 text-secondary/40">
                <Brain className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p>Upload an image to get started</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="h-12 w-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-secondary/70">Analyzing image...</p>
              </div>
            )}

            {results && (
              <div className="space-y-4">
                {results.map((r, i) => (
                  <div
                    key={r.name}
                    className={`rounded-xl p-4 ${
                      i === 0 ? "bg-primary/20 border border-primary/30" : "bg-secondary/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-medium ${i === 0 ? "text-secondary" : "text-secondary/60"}`}>
                        {r.name}
                      </span>
                      <span className={`text-sm font-bold ${i === 0 ? "text-secondary" : "text-secondary/50"}`}>
                        {r.confidence}%
                      </span>
                    </div>
                    <p className="text-xs italic text-secondary/40 mb-2">{r.scientific}</p>
                    <div className="w-full h-1.5 bg-secondary/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-secondary transition-all duration-1000"
                        style={{ width: `${r.confidence}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <AlertTriangle className="h-4 w-4 text-accent mt-0.5" />
                  <p className="text-xs text-accent/80">
                    Demo mode — AI identification requires Lovable Cloud integration for live predictions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
