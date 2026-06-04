import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/chef-dashboard/earnings")({ component: Earnings });

const days = [
  { d: "Mon", v: 60 },
  { d: "Tue", v: 80 },
  { d: "Wed", v: 45 },
  { d: "Thu", v: 95 },
  { d: "Fri", v: 70 },
  { d: "Sat", v: 100 },
  { d: "Sun", v: 88 },
];

function Earnings() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Earnings" />
      <div className="m-4 rounded-2xl p-5 text-white shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-primary)" }}>
        <div className="text-[11px] font-bold uppercase opacity-90">This week</div>
        <div className="mt-1 text-4xl font-extrabold">₹18,420</div>
        <div className="text-xs opacity-90">+22% vs last week · 124 orders</div>
        <div className="mt-4 grid grid-cols-3 divide-x divide-white/30 text-center text-xs">
          <div><b className="block text-base">₹3,240</b>Today</div>
          <div><b className="block text-base">₹62K</b>This month</div>
          <div><b className="block text-base">₹4.2L</b>All time</div>
        </div>
      </div>

      <div className="px-4">
        <h3 className="text-sm font-bold mb-3">Last 7 days</h3>
        <div className="rounded-2xl bg-card border border-border p-4">
          <div className="flex h-32 items-end justify-between gap-2">
            {days.map((d, i) => (
              <div key={d.d} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-md" style={{ height: `${d.v}%`, background: i === 5 ? "var(--primary)" : "oklch(0.85 0.08 50)" }} />
                <span className="text-[10px] text-muted-foreground">{d.d}</span>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-sm font-bold mt-5 mb-2">Recent payouts</h3>
        <div className="space-y-2 pb-6">
          {[
            { d: "Oct 14, 2025", a: 4820, s: "Credited" },
            { d: "Oct 07, 2025", a: 5240, s: "Credited" },
            { d: "Sep 30, 2025", a: 3960, s: "Credited" },
            { d: "Sep 23, 2025", a: 5100, s: "Credited" },
          ].map((p) => (
            <div key={p.d} className="flex items-center justify-between rounded-xl bg-card border border-border p-3 text-sm">
              <div>
                <div className="font-semibold">₹{p.a.toLocaleString()}</div>
                <div className="text-[11px] text-muted-foreground">{p.d}</div>
              </div>
              <span className="text-[11px] font-bold text-success">{p.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
