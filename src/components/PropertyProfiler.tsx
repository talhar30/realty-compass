import { useState } from "react";
import { MapPin, Target, DollarSign, Users, Sparkles, Clock, Star, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import LoadingIndicator from "@/components/LoadingIndicator";

const API_BASE = "https://agents.toolhouse.ai/9c8ce16e-2444-4148-8e19-bea7545a6313";

interface FormField {
  key: string;
  label: string;
  icon: React.ElementType;
  placeholder: string;
}

const fields: FormField[] = [
  { key: "location", label: "LOCATION", icon: MapPin, placeholder: "e.g., Miami Beach, Florida" },
  { key: "purpose", label: "PURPOSE", icon: Target, placeholder: "e.g., Short-term rent, Buy, Long-term rent" },
  { key: "budget", label: "BUDGET", icon: DollarSign, placeholder: "e.g., $300-500 per night, total $2,500" },
  { key: "people", label: "NUMBER OF PEOPLE", icon: Users, placeholder: "e.g., 4 (2 adults, 2 children)" },
  { key: "vibe", label: "VIBE / STYLE", icon: Sparkles, placeholder: "e.g., Family-friendly, relaxed beach vacation" },
  { key: "days", label: "NUMBER OF DAYS", icon: Clock, placeholder: "e.g., 7 nights (June 15-22, 2025)" },
  { key: "requirements", label: "SPECIAL REQUIREMENTS", icon: Star, placeholder: "e.g., Pool, kitchen, near beach, parking" },
];

const PropertyProfiler = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [report, setReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const buildMessage = () => {
    const parts = fields
      .map((f) => {
        const val = formData[f.key]?.trim();
        return val ? `${f.label}: ${val}` : null;
      })
      .filter(Boolean);
    return `Find available properties based on the following details:\n${parts.join("\n")}`;
  };

  const generateReport = async () => {
    const message = buildMessage();
    if (!message || Object.values(formData).every((v) => !v?.trim())) return;

    setIsLoading(true);
    setReport("");

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setReport(accumulated);
      }
    } catch (error) {
      console.error("Report generation error:", error);
      setReport("An error occurred while generating the report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const hasInput = Object.values(formData).some((v) => v?.trim());

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Property Profiler
            </h2>
            <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-sans font-medium">
              Module Active
            </span>
          </div>
          <p className="text-muted-foreground text-sm font-sans">
            Input your property parameters to generate a custom property intelligence report.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <div className="glass-surface rounded-2xl p-6 space-y-5">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground tracking-wider mb-2 font-sans uppercase">
                  <field.icon className="w-3.5 h-3.5 text-primary" />
                  {field.label}
                </label>
                <input
                  type="text"
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border-b border-border/60 focus:border-primary text-foreground text-sm py-2 px-1 outline-none transition-colors placeholder:text-muted-foreground/50 font-sans"
                />
              </div>
            ))}

            <button
              onClick={generateReport}
              disabled={!hasInput || isLoading}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground font-semibold py-3.5 rounded-xl transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed font-sans"
            >
              <FileText className="w-4 h-4" />
              {isLoading ? "Generating Report..." : "GENERATE REPORT"}
            </button>
          </div>

          {/* Report Panel */}
          <div className="glass-surface rounded-2xl p-6 min-h-[400px]">
            {isLoading && !report ? (
              <div className="flex items-center justify-center h-full">
                <LoadingIndicator />
              </div>
            ) : report ? (
              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-1">
                  Estate<span className="text-gradient-gold">AI</span> Property Intelligence
                </h3>
                <div className="w-full h-px bg-gradient-to-r from-primary/60 to-transparent mb-4" />
                <div className="prose-chat text-sm">
                  <ReactMarkdown>{report}</ReactMarkdown>
                  {isLoading && (
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse-gold ml-1 rounded-sm" />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                <FileText className="w-12 h-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm font-sans">
                  Fill in the property parameters and click Generate Report to see your intelligence report here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyProfiler;
