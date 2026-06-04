import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Check, Calendar } from "lucide-react";
import { dishes } from "@/lib/data";

export const Route = createFileRoute("/tiffin")({ component: Tiffin });

const plans = [
  { d: "7 Days", price: 699, save: "Save ₹140", per: "₹99/meal", popular: false },
  { d: "15 Days", price: 1349, save: "Save ₹385", per: "₹89/meal", popular: true },
  { d: "30 Days", price: 2499, save: "Save ₹980", per: "₹83/meal", popular: false },
];

function Tiffin() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Daily Tiffin Subscription" />
      <div className="m-4 overflow-hidden rounded-2xl p-5 text-white" style={{ background: "var(--gradient-fresh)" }}>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase opacity-90"><Calendar className="h-3.5 w-3.5" /> Monthly tiffin plan</div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">Homemade lunch<br /> at your desk daily 🍱</h2>
        <p className="mt-2 text-sm opacity-90">Cooked fresh by verified home chefs near you. Delivered hot, every day.</p>
      </div>

      <div className="px-4">
        <h3 className="text-sm font-bold mb-2">Choose your plan</h3>
        <div className="space-y-3">
          {plans.map((p) => (
            <label key={p.d} className={`flex items-center gap-3 rounded-2xl border-2 bg-card p-4 ${p.popular ? "border-primary" : "border-border"}`}>
              <input type="radio" name="plan" defaultChecked={p.popular} className="h-5 w-5 accent-[var(--primary)]" />
              <div className="flex-1">
                <div className="flex items-center gap-2"><span className="font-bold">{p.d} Plan</span>{p.popular && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">POPULAR</span>}</div>
                <div className="text-[11px] text-muted-foreground">{p.per} · {p.save}</div>
              </div>
              <div className="text-right"><div className="text-lg font-bold">₹{p.price}</div></div>
            </label>
          ))}
        </div>

        <h3 className="text-sm font-bold mt-5 mb-2">What's included</h3>
        <div className="rounded-2xl bg-success/10 border border-success/30 p-3 space-y-2 text-sm">
          {["Hot lunch tiffin every weekday", "Rotating menu - never boring", "Skip days anytime", "Choose veg / non-veg / jain", "Pause / cancel anytime"].map((x) => (
            <div key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> {x}</div>
          ))}
        </div>

        <h3 className="text-sm font-bold mt-5 mb-2">This week's sample menu</h3>
        <div className="grid grid-cols-3 gap-2 pb-4">
          {dishes.slice(0, 6).map((d, i) => (
            <div key={d.id} className="rounded-xl overflow-hidden bg-card border border-border">
              <img src={d.img} alt="" className="h-16 w-full object-cover" />
              <div className="p-1.5 text-center">
                <div className="text-[9px] uppercase font-bold text-muted-foreground">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}</div>
                <div className="text-[10px] line-clamp-1 font-medium">{d.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-background p-4">
        <Link to="/checkout" className="flex h-12 items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
          Start Subscription · ₹1,349
        </Link>
      </div>
    </div>
  );
}
