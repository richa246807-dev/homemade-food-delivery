import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Users, ChefHat, Store, Package, TrendingUp, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/admin")({ component: Admin });

function Admin() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Admin Dashboard" back={false} />
      <div className="px-4 pt-3 pb-6 space-y-4">
        <div className="rounded-2xl p-4 text-white shadow-[var(--shadow-glow)]" style={{ background: "linear-gradient(135deg, oklch(0.3 0.05 270), oklch(0.45 0.12 280))" }}>
          <div className="text-[11px] uppercase opacity-80 font-bold flex items-center gap-1.5"><IndianRupee className="h-3.5 w-3.5" /> Today's GMV</div>
          <div className="text-3xl font-extrabold mt-1">₹4,82,340</div>
          <div className="text-xs flex items-center gap-1 opacity-90"><TrendingUp className="h-3 w-3" /> +14.2% vs yesterday</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { i: Users, t: "Users", v: "52,418", c: "+312 today" },
            { i: ChefHat, t: "Home Chefs", v: "1,284", c: "+8 today" },
            { i: Store, t: "Restaurants", v: "642", c: "+2 today" },
            { i: Package, t: "Orders", v: "8,910", c: "today" },
          ].map((s) => {
            const Icon = s.i;
            return (
              <Link key={s.t} to="/admin" className="rounded-2xl bg-card border border-border p-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-4.5 w-4.5" /></div>
                <div className="mt-2 text-[11px] font-semibold uppercase text-muted-foreground">{s.t}</div>
                <div className="text-xl font-extrabold">{s.v}</div>
                <div className="text-[11px] text-success font-semibold">{s.c}</div>
              </Link>
            );
          })}
        </div>

        <section>
          <h3 className="text-sm font-bold mb-2">Revenue last 7 days</h3>
          <div className="rounded-2xl bg-card border border-border p-4">
            <div className="flex h-28 items-end justify-between gap-2">
              {[55, 72, 60, 88, 65, 95, 78].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-md" style={{ height: `${v}%`, background: i === 5 ? "var(--primary)" : "oklch(0.78 0.18 55)" }} />
                  <span className="text-[10px] text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold mb-2">Pending approvals</h3>
          <div className="space-y-2">
            {[
              { n: "Meera Singh", t: "Home Chef · KYC pending", c: "bg-warning text-warning-foreground" },
              { n: "Spice Garden", t: "Restaurant · New listing", c: "bg-primary text-primary-foreground" },
              { n: "Karan B.", t: "Delivery Partner · Vehicle docs", c: "bg-success text-success-foreground" },
            ].map((x) => (
              <div key={x.n} className="flex items-center gap-3 rounded-xl bg-card border border-border p-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs">{x.n.split(" ").map(s => s[0]).join("")}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{x.n}</div>
                  <div className="text-[11px] text-muted-foreground">{x.t}</div>
                </div>
                <button className={`rounded-full px-3 py-1 text-[11px] font-bold ${x.c}`}>REVIEW</button>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          {["Manage Users", "Manage Chefs", "Manage Restaurants", "Manage Orders", "Revenue Reports", "Settings"].map((x) => (
            <button key={x} className="h-12 rounded-xl bg-card border border-border text-sm font-semibold">{x}</button>
          ))}
        </section>
      </div>
    </div>
  );
}
