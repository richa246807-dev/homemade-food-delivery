import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Navigation, Phone, Package } from "lucide-react";

export const Route = createFileRoute("/delivery/navigation")({ component: Nav });

function Nav() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <div className="relative h-[60%] bg-[oklch(0.92_0.03_140)] overflow-hidden">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 600" preserveAspectRatio="none">
          <path d="M50 550 L80 400 L150 350 Q200 300 250 350 L300 200 L350 50" stroke="oklch(0.68 0.21 39)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="550" r="10" fill="oklch(0.68 0.21 39)" />
          <circle cx="350" cy="50" r="10" fill="oklch(0.62 0.17 145)" />
        </svg>
        <Link to="/delivery" className="absolute left-3 top-3 h-9 w-9 rounded-full bg-white/95 flex items-center justify-center"><ArrowLeft className="h-5 w-5" /></Link>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg pulse-ring">
          <Navigation className="h-6 w-6" />
        </div>
        <div className="absolute left-3 right-3 top-16 rounded-xl bg-white/95 p-3 shadow">
          <div className="text-[11px] text-muted-foreground">Turn right in</div>
          <div className="text-2xl font-extrabold">200m</div>
          <div className="text-sm">onto 80 Feet Road</div>
        </div>
      </div>

      <div className="flex-1 px-4 pt-4 pb-4 flex flex-col">
        <div className="rounded-2xl bg-card border border-border p-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold">RK</div>
          <div className="flex-1">
            <div className="text-sm font-bold">Rahul Kumar</div>
            <div className="text-[11px] text-muted-foreground">Flat 12, Pearl Apts</div>
          </div>
          <button className="h-9 w-9 rounded-full bg-success flex items-center justify-center text-success-foreground"><Phone className="h-4 w-4" /></button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-xl bg-muted py-2.5"><div className="font-extrabold text-base">12 min</div>ETA</div>
          <div className="rounded-xl bg-muted py-2.5"><div className="font-extrabold text-base">1.8 km</div>Distance</div>
          <div className="rounded-xl bg-muted py-2.5"><div className="font-extrabold text-base">₹65</div>Payout</div>
        </div>

        <Link to="/delivery" className="mt-auto h-12 flex items-center justify-center gap-2 rounded-xl bg-success text-success-foreground font-semibold shadow-[var(--shadow-glow)]">
          <Package className="h-4 w-4" /> Mark as Delivered
        </Link>
      </div>
    </div>
  );
}
