import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, User, ChefHat } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/chefs", icon: ChefHat, label: "Chefs" },
  { to: "/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function BottomTabs() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const count = useCart((s) => s.count());

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 mt-auto border-t border-border bg-background/95 backdrop-blur">
      <div className="grid grid-cols-5">
        {tabs.map((t) => {
          const active = path === t.to;
          const Icon = t.icon;
          const isOrders = t.to === "/orders";
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors relative",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                {isOrders && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                    {count}
                  </span>
                )}
              </div>
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
