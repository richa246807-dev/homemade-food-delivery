import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/chef-dashboard/add")({ component: AddItem });

function AddItem() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Add Food Item" />
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 space-y-4">
        <div className="aspect-[16/10] rounded-2xl border-2 border-dashed border-border bg-card flex flex-col items-center justify-center text-muted-foreground">
          <Camera className="h-8 w-8" />
          <span className="mt-2 text-sm font-semibold">Tap to upload food photo</span>
          <span className="text-[11px]">Min 1200×800px · Show the real food</span>
        </div>
        {[
          { l: "Dish Name", p: "e.g. Homemade Veg Thali", v: "Homemade Veg Thali" },
          { l: "Price (₹)", p: "149", v: "149", type: "number" },
          { l: "Preparation Time", p: "25 min", v: "25 min" },
        ].map((f) => (
          <div key={f.l}>
            <label className="text-xs font-bold uppercase text-muted-foreground">{f.l}</label>
            <input type={f.type ?? "text"} placeholder={f.p} defaultValue={f.v} className="mt-1 h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary" />
          </div>
        ))}
        <div>
          <label className="text-xs font-bold uppercase text-muted-foreground">Category</label>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {["Breakfast", "Lunch", "Dinner", "Snacks", "Sweets"].map((c, i) => (
              <button key={c} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${i === 1 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-muted-foreground">Type</label>
          <div className="mt-1.5 flex gap-2">
            <button className="flex-1 h-10 rounded-xl border-2 border-success bg-success/10 text-sm font-semibold">🟢 Veg</button>
            <button className="flex-1 h-10 rounded-xl border border-border bg-card text-sm font-semibold">🔴 Non-Veg</button>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-muted-foreground">Description</label>
          <textarea defaultValue="Wholesome thali with dal, sabzi, 2 rotis, rice, salad and pickle. Cooked fresh." className="mt-1 w-full h-20 rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary resize-none" />
        </div>
        <label className="flex items-center gap-2 rounded-xl bg-success/10 border border-success/30 p-3 text-sm">
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-[var(--primary)]" />
          🌿 Mark as <b>Healthy Homemade</b>
        </label>
      </div>
      <div className="border-t border-border bg-background p-4">
        <Link to="/chef-dashboard" className="flex h-12 items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
          Publish to Menu
        </Link>
      </div>
    </div>
  );
}
