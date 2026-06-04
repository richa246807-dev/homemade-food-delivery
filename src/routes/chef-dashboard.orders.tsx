import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/chef-dashboard/orders")({ component: ChefOrders });

const orders = [
  { id: "GKK238417", n: "Rahul K.", d: "Veg Thali ×1, Aloo Paratha ×1", a: 268, s: "New" },
  { id: "GKK238415", n: "Anita S.", d: "Butter Chicken Naan ×2", a: 458, s: "Preparing" },
  { id: "GKK238411", n: "Vikram", d: "Idli Sambar ×3", a: 267, s: "Ready" },
  { id: "GKK238405", n: "Meera P.", d: "Special Dinner Thali ×1", a: 199, s: "Delivered" },
  { id: "GKK238399", n: "Suresh", d: "Aloo Paratha ×2", a: 238, s: "Delivered" },
];

const tone: Record<string, string> = {
  New: "bg-warning text-warning-foreground",
  Preparing: "bg-success text-success-foreground",
  Ready: "bg-primary text-primary-foreground",
  Delivered: "bg-muted text-muted-foreground",
};

function ChefOrders() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Manage Orders" />
      <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto scroll-x">
        {["All (18)", "New (2)", "Preparing (1)", "Ready (1)", "Delivered (14)"].map((t, i) => (
          <button key={t} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>{t}</button>
        ))}
      </div>
      <div className="px-4 pt-3 space-y-2 pb-6">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl bg-card border border-border p-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold">#{o.id}</div>
                <div className="text-[11px] text-muted-foreground">{o.n}</div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tone[o.s]}`}>{o.s}</span>
            </div>
            <div className="mt-1.5 text-xs text-muted-foreground">{o.d}</div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
              <span className="text-sm font-bold">₹{o.a}</span>
              {o.s !== "Delivered" && <button className="text-xs font-bold text-primary">{o.s === "New" ? "ACCEPT" : o.s === "Preparing" ? "MARK READY" : "HAND OVER"}</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
