import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { DishCard } from "@/components/DishCard";
import { dishes } from "@/lib/data";

export const Route = createFileRoute("/festival")({ component: Festival });

function Festival() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Festival Special" />
      <div className="relative mx-4 mt-4 overflow-hidden rounded-2xl">
        <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, oklch(0.45 0.15 35), oklch(0.7 0.2 45))" }}>
          <div className="text-3xl">🪔</div>
          <h2 className="mt-2 text-2xl font-bold leading-tight">Diwali Special Thaalis</h2>
          <p className="mt-1 text-sm opacity-90">Homemade sweets, snacks & festive meals from neighborhood chefs</p>
          <button className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-bold text-[oklch(0.45_0.15_35)]">Pre-order for Diwali</button>
        </div>
      </div>

      <div className="px-4 pt-5">
        <h3 className="text-sm font-bold mb-3">Festive thaalis</h3>
        <div className="grid grid-cols-2 gap-3 pb-4">
          {dishes.slice(0, 4).map((d) => <DishCard key={d.id} dish={d} />)}
        </div>

        <h3 className="text-sm font-bold mb-3 mt-3">Homemade mithai</h3>
        <div className="grid grid-cols-3 gap-3 pb-6">
          {["Gulab Jamun", "Besan Laddoo", "Kaju Katli", "Gajar Halwa", "Sooji Halwa", "Chakli"].map((m, i) => (
            <div key={m} className="rounded-xl overflow-hidden bg-card border border-border">
              <img src={dishes[i % dishes.length].img} alt="" className="h-20 w-full object-cover" />
              <div className="p-2 text-center">
                <div className="text-[11px] font-semibold line-clamp-1">{m}</div>
                <div className="text-[10px] text-muted-foreground">₹{199 + i * 30}/box</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
