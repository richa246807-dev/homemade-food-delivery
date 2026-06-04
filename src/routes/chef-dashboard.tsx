import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { dishes } from "@/lib/data";
import chef from "@/assets/chef-priya.jpg";
import { TrendingUp, Package, Wallet, Plus, Calendar, Star } from "lucide-react";

export const Route = createFileRoute("/chef-dashboard")({ component: ChefDash });

function ChefDash() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Chef Dashboard" back={false} />
      <div className="px-4 pt-3 pb-2 flex items-center gap-3">
        <img src={chef} className="h-12 w-12 rounded-full object-cover" alt="" />
        <div className="flex-1">
          <div className="text-xs text-muted-foreground">Welcome back</div>
          <div className="font-bold">Priya's Kitchen 🏡</div>
        </div>
        <label className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-success">Open</span>
          <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-success">
            <span className="absolute right-0.5 h-4 w-4 rounded-full bg-white" />
          </span>
        </label>
      </div>

      <div className="px-4 pt-2">
        <div className="rounded-2xl p-4 text-white shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-primary)" }}>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase opacity-90"><Wallet className="h-3.5 w-3.5" /> Today's Earnings</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold">₹3,240</span>
            <span className="text-xs flex items-center gap-1 opacity-90"><TrendingUp className="h-3 w-3" />+18%</span>
          </div>
          <div className="mt-3 grid grid-cols-3 divide-x divide-white/30 text-center text-xs">
            <div><b className="block text-base">18</b>Orders</div>
            <div><b className="block text-base">4.8★</b>Rating</div>
            <div><b className="block text-base">2</b>Pending</div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 grid grid-cols-4 gap-2">
        {[
          { i: Plus, t: "Add Item", to: "/chef-dashboard/add" },
          { i: Package, t: "Orders", to: "/chef-dashboard/orders" },
          { i: Wallet, t: "Earnings", to: "/chef-dashboard/earnings" },
          { i: Calendar, t: "Menu", to: "/chef-dashboard/add" },
        ].map((q) => {
          const Icon = q.i;
          return (
            <Link key={q.t} to={q.to} className="flex flex-col items-center gap-1.5 rounded-2xl bg-card border border-border p-3">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-[11px] font-semibold">{q.t}</span>
            </Link>
          );
        })}
      </div>

      <section className="px-4 pt-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold">Live Orders (2)</h3>
          <Link to="/chef-dashboard/orders" className="text-xs font-semibold text-primary">View all</Link>
        </div>
        <div className="space-y-2">
          {[
            { id: "#GKK238417", n: "Rahul K.", d: "1× Veg Thali, 1× Aloo Paratha", t: "2 min ago", s: "New", c: "bg-warning text-warning-foreground" },
            { id: "#GKK238415", n: "Anita S.", d: "2× Butter Chicken Naan", t: "8 min ago", s: "Preparing", c: "bg-success text-success-foreground" },
          ].map((o) => (
            <div key={o.id} className="rounded-2xl bg-card border border-border p-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold">{o.id} · {o.n}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{o.d}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{o.t}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${o.c}`}>{o.s}</span>
              </div>
              <div className="mt-2 flex gap-2">
                <button className="flex-1 h-9 rounded-lg border border-border text-xs font-semibold">Reject</button>
                <button className="flex-1 h-9 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">Accept & Cook</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pt-5 pb-6">
        <h3 className="text-sm font-bold mb-2">Today's Menu (6 items)</h3>
        <div className="space-y-2">
          {dishes.slice(0, 3).map((d) => (
            <div key={d.id} className="flex items-center gap-3 rounded-xl bg-card border border-border p-2">
              <img src={d.img} alt="" className="h-12 w-12 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{d.name}</div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-2">₹{d.price} · <Star className="h-3 w-3 fill-success text-success" />{d.rating}</div>
              </div>
              <label className="relative inline-flex h-5 w-9 items-center rounded-full bg-success cursor-pointer">
                <span className="absolute right-0.5 h-4 w-4 rounded-full bg-white" />
              </label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
