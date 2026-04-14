import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import { TrendingUp, AlertCircle, Shield, Activity } from "lucide-react";

const speciesData = [
  { region: "Uttarakhand", mammals: 85, birds: 420, flora: 1200 },
  { region: "Himachal", mammals: 72, birds: 380, flora: 950 },
  { region: "Sikkim", mammals: 68, birds: 550, flora: 1100 },
  { region: "Arunachal", mammals: 120, birds: 680, flora: 1800 },
  { region: "J&K", mammals: 65, birds: 340, flora: 800 },
];

const threatData = [
  { name: "Least Concern", value: 4200, color: "hsl(121,37%,27%)" },
  { name: "Vulnerable", value: 850, color: "hsl(35,80%,50%)" },
  { name: "Endangered", value: 340, color: "hsl(0,84%,60%)" },
  { name: "Critically Endangered", value: 120, color: "hsl(0,70%,40%)" },
];

const trendData = [
  { year: "2018", species: 3200 },
  { year: "2019", species: 3800 },
  { year: "2020", species: 4100 },
  { year: "2021", species: 4600 },
  { year: "2022", species: 5100 },
  { year: "2023", species: 5510 },
];

const climateData = [
  { month: "Jan", temp: -2, precipitation: 45 },
  { month: "Mar", temp: 5, precipitation: 60 },
  { month: "May", temp: 15, precipitation: 80 },
  { month: "Jul", temp: 20, precipitation: 220 },
  { month: "Sep", temp: 16, precipitation: 150 },
  { month: "Nov", temp: 4, precipitation: 30 },
];

const DashboardSection = () => {
  return (
    <section id="dashboard" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Decision Support Dashboard
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time analytics and insights for evidence-based conservation planning and policy formulation.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Activity, label: "Total Species", value: "5,510", change: "+8.2%", positive: true },
            { icon: AlertCircle, label: "Threatened", value: "1,310", change: "+2.1%", positive: false },
            { icon: Shield, label: "Protected Areas", value: "73", change: "+3", positive: true },
            { icon: TrendingUp, label: "New Observations", value: "12,430", change: "+24%", positive: true },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-primary" />
                <span className={`text-xs font-medium ${stat.positive ? "text-primary" : "text-destructive"}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-serif font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Species by Region */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-serif font-semibold text-foreground mb-4">Species by Region</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={speciesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(80,15%,85%)" />
                <XAxis dataKey="region" tick={{ fontSize: 11, fill: "hsl(150,10%,45%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(150,10%,45%)" }} />
                <Tooltip />
                <Bar dataKey="flora" fill="hsl(121,37%,27%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="birds" fill="hsl(87,40%,56%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mammals" fill="hsl(35,80%,50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Threat Status */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-serif font-semibold text-foreground mb-4">Conservation Status</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={threatData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {threatData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Trend */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-serif font-semibold text-foreground mb-4">Species Documentation Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(80,15%,85%)" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(150,10%,45%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(150,10%,45%)" }} />
                <Tooltip />
                <Line type="monotone" dataKey="species" stroke="hsl(121,37%,27%)" strokeWidth={3} dot={{ fill: "hsl(121,37%,27%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Climate */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-serif font-semibold text-foreground mb-4">Climate Patterns (IHR Average)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={climateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(80,15%,85%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(150,10%,45%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(150,10%,45%)" }} />
                <Tooltip />
                <Area type="monotone" dataKey="precipitation" fill="hsl(87,40%,56%)" fillOpacity={0.3} stroke="hsl(87,40%,56%)" />
                <Area type="monotone" dataKey="temp" fill="hsl(35,80%,50%)" fillOpacity={0.3} stroke="hsl(35,80%,50%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
