import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Coins, Gift, Zap } from "lucide-react";

export const Route = createFileRoute("/rewards")({ component: Rewards });

function Rewards() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="GharCoins" />
      <div className="m-4 rounded-2xl p-5 text-white shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-warm)" }}>
        <div className="flex items-center gap-2 text-xs font-bold uppercase opacity-90"><Coins className="h-4 w-4" /> Your Balance</div>
        <div className="mt-2 text-5xl font-extrabold">240</div>
        <p className="mt-1 text-sm opacity-90">≈ ₹240 savings · 1 coin = ₹1</p>
        <div className="mt-4 grid grid-cols-3 divide-x divide-white/30 rounded-xl bg-white/15 backdrop-blur text-center text-xs py-2.5">
          <div><b className="block text-base">+80</b>this week</div>
          <div><b className="block text-base">160</b>redeemed</div>
          <div><b className="block text-base">Gold</b>tier</div>
        </div>
      </div>

      <div className="px-4">
        <h3 className="text-sm font-bold mb-2">Earn more coins</h3>
        <div className="space-y-2">
          {[
            { i: Zap, t: "Order homemade food", s: "+10% on every order" },
            { i: Gift, t: "Refer a friend", s: "+100 coins when they order" },
            { i: Coins, t: "Daily streak bonus", s: "+5 coins per day" },
          ].map((x) => {
            const Icon = x.i;
            return (
              <div key={x.t} className="flex items-center gap-3 rounded-2xl bg-card p-3 border border-border">
                <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><Icon className="h-5 w-5" /></div>
                <div className="flex-1"><div className="text-sm font-semibold">{x.t}</div><div className="text-[11px] text-muted-foreground">{x.s}</div></div>
                <button className="text-xs font-bold text-primary">GO →</button>
              </div>
            );
          })}
        </div>

        <h3 className="text-sm font-bold mt-5 mb-2">Redeem</h3>
        <div className="grid grid-cols-2 gap-3 pb-6">
          {[["₹50 OFF", "50 coins"], ["Free delivery", "30 coins"], ["₹100 OFF", "100 coins"], ["Mystery Box", "200 coins"]].map(([t, c]) => (
            <div key={t} className="rounded-2xl bg-card border border-dashed border-primary/40 p-3 text-center">
              <Gift className="mx-auto h-6 w-6 text-primary" />
              <div className="mt-1 text-sm font-bold">{t}</div>
              <div className="text-[11px] text-muted-foreground">{c}</div>
              <button className="mt-2 h-8 w-full rounded-lg bg-primary text-primary-foreground text-xs font-semibold">Redeem</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
