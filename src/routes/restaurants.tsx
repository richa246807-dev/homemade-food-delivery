import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { TopBar } from "@/components/TopBar";
import { DishCard } from "@/components/DishCard";
import { dishes } from "@/lib/data";

export const Route = createFileRoute("/restaurants")({ component: Restaurants });

const rests = [
  { name: "Saravana Bhavan", cuisine: "South Indian", rating: 4.4, time: "30 min", price: "₹200 for one" },
  { name: "Punjab Grill", cuisine: "North Indian, Mughlai", rating: 4.5, time: "40 min", price: "₹350 for one" },
  { name: "Mainland China", cuisine: "Chinese, Asian", rating: 4.3, time: "35 min", price: "₹400 for one" },
  { name: "Behrouz Biryani", cuisine: "Biryani, Awadhi", rating: 4.6, time: "45 min", price: "₹300 for one" },
];

function Restaurants() {
  return (
    <PhoneShell>
      <TopBar title="Restaurants" />
      <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto scroll-x">
        {["Sort", "Pure Veg", "Rating 4+", "Under 30 min", "Offers"].map((f) => (
          <button key={f} className="whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium">{f}</button>
        ))}
      </div>
      <div className="space-y-3 px-4 pt-3">
        {rests.map((r, i) => (
          <div key={r.name} className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
            <div className="aspect-[16/8] relative">
              <img src={dishes[i % dishes.length].img} alt={r.name} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-bold">50% OFF</span>
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-bold">{r.name}</h3>
                <p className="text-[11px] opacity-90">{r.cuisine}</p>
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-2.5 text-xs">
              <span className="flex items-center gap-1 font-bold text-success">★ {r.rating}</span>
              <span className="text-muted-foreground">{r.time}</span>
              <span className="text-muted-foreground">{r.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pt-6 pb-6">
        <h3 className="mb-3 text-sm font-bold">Trending dishes</h3>
        <div className="grid grid-cols-2 gap-3">
          {dishes.slice(2, 4).map((d) => <DishCard key={d.id} dish={d} />)}
        </div>
      </div>
    </PhoneShell>
  );
}
