import { Link } from "@tanstack/react-router";
import { Star, Clock, MapPin, Leaf } from "lucide-react";
import type { Dish } from "@/lib/data";

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <Link
      to="/food/$id"
      params={{ id: dish.id }}
      className="block overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] active:scale-[0.98] transition-transform"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={dish.img} alt={dish.name} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute left-2 top-2 flex gap-1.5">
          <span className={`flex h-5 w-5 items-center justify-center rounded border-2 bg-white ${dish.veg ? "border-success" : "border-destructive"}`}>
            <span className={`h-2 w-2 rounded-full ${dish.veg ? "bg-success" : "bg-destructive"}`} />
          </span>
          {dish.healthy && (
            <span className="flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[10px] font-semibold text-success-foreground">
              <Leaf className="h-2.5 w-2.5" /> Healthy
            </span>
          )}
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-tight">{dish.name}</h3>
          <span className="font-bold text-sm">₹{dish.price}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">by {dish.chef}</p>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1 font-medium text-success">
            <Star className="h-3 w-3 fill-success" /> {dish.rating}
          </span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{dish.time}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{dish.distance}</span>
        </div>
      </div>
    </Link>
  );
}
