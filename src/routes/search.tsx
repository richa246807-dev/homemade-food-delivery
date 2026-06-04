import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { DishCard } from "@/components/DishCard";
import { dishes } from "@/lib/data";
import { ArrowLeft, Search, Mic, X } from "lucide-react";

export const Route = createFileRoute("/search")({ component: SearchPage });

const trending = ["Ghar ka khana", "Veg thali", "Idli sambar", "Aloo paratha", "Tiffin", "Healthy lunch"];
const recent = ["Butter chicken", "Masala chai", "Diwali sweets"];

function SearchPage() {
  return (
    <PhoneShell>
      <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-background px-3 py-3">
        <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <label className="flex h-10 flex-1 items-center gap-2 rounded-xl bg-muted px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input autoFocus placeholder="Search dishes, chefs, kitchens…" className="flex-1 bg-transparent text-sm outline-none" />
          <Mic className="h-4 w-4 text-primary" />
        </label>
      </header>

      <div className="px-4 pt-4 pb-3">
        <div className="grid grid-cols-3 gap-2">
          <Link to="/search" className="rounded-xl border-2 border-primary bg-primary/5 px-3 py-2 text-xs font-semibold text-primary text-center">Food</Link>
          <Link to="/chefs" className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-center">Home Chefs</Link>
          <Link to="/restaurants" className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-center">Restaurants</Link>
        </div>
      </div>

      <section className="px-4 pt-2">
        <h3 className="mb-2 text-xs font-bold uppercase text-muted-foreground">Recent</h3>
        <div className="flex flex-wrap gap-2">
          {recent.map((r) => (
            <span key={r} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs">
              {r} <X className="h-3 w-3" />
            </span>
          ))}
        </div>
      </section>

      <section className="px-4 pt-5">
        <h3 className="mb-2 text-xs font-bold uppercase text-muted-foreground">Trending in your area</h3>
        <div className="flex flex-wrap gap-2">
          {trending.map((t) => (
            <span key={t} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium">🔥 {t}</span>
          ))}
        </div>
      </section>

      <section className="px-4 pt-6 pb-6">
        <h3 className="mb-3 text-sm font-bold">Suggestions</h3>
        <div className="grid grid-cols-2 gap-3">
          {dishes.slice(0, 4).map((d) => <DishCard key={d.id} dish={d} />)}
        </div>
      </section>
    </PhoneShell>
  );
}
