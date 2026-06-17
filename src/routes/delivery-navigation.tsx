import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Navigation, Phone, Package } from "lucide-react";

export const Route = createFileRoute("/delivery-navigation")({ component: Nav, });

function Nav() {
  return (
    
    <div className="phone-frame flex flex-col bg-background">
      <div className="relative h-[300px] w-full overflow-hidden">
      <iframe
  src="https://maps.google.com/maps?q=Civil%20Lines%20Prayagraj&t=&z=13&ie=UTF8&iwloc=&output=embed"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  loading="lazy"
/>



        <Link to="/delivery" className="absolute left-3 top-3 h-9 w-9 rounded-full bg-white/95 flex items-center justify-center"><ArrowLeft className="h-5 w-5" /></Link>
        <button
    onClick={() =>
   window.open(
     "https://www.google.com/maps/search/?api=1&query=Civil%20Lines%20Prayagraj"
   )
 }
 className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
>
 <Navigation className="h-6 w-6" />

</button>
</div>
      <div className="flex-1 px-4 pt-4 pb-4 flex flex-col">
        <div className="rounded-2xl bg-card border border-border p-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold">RK</div>
          <div className="flex-1">
            <div className="text-sm font-bold">Rahul Kumar</div>
            <div className="text-[11px] text-muted-foreground">Flat 12, Pearl Apts</div>
          </div>
          <button
  onClick={() =>
    window.open("tel:9876543210")
  }
  className="h-9 w-9 rounded-full bg-success flex items-center justify-center text-success-foreground"
>
  <Phone className="h-4 w-4" />
</button>
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
