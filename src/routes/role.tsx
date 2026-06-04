import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { User, ChefHat, Bike, Shield, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/role")({ component: Role });

const roles = [
  { i: User, t: "I'm a Customer", s: "Order homemade food", to: "/login" },
  { i: ChefHat, t: "I'm a Home Chef", s: "Sell from your kitchen", to: "/chef-dashboard" },
  { i: Bike, t: "I'm a Delivery Partner", s: "Earn flexible hours", to: "/delivery" },
  { i: Shield, t: "Admin", s: "Manage platform", to: "/admin" },
];

function Role() {
  return (
    <div className="phone-frame flex flex-col bg-background px-6 pt-12">
      <img src={logo} alt="" className="h-14 w-14" />
      <h1 className="mt-4 text-2xl font-bold">Welcome to GharKaKhana</h1>
      <p className="mt-1 text-sm text-muted-foreground">Pick how you want to use the app</p>

      <div className="mt-6 space-y-3">
        {roles.map((r) => {
          const Icon = r.i;
          return (
            <Link key={r.t} to={r.to} className="flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-4 active:border-primary">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-6 w-6" /></div>
              <div className="flex-1">
                <div className="font-bold">{r.t}</div>
                <div className="text-xs text-muted-foreground">{r.s}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          );
        })}
      </div>

      <Link to="/" className="mt-auto mb-6 text-center text-xs text-muted-foreground">Skip for now</Link>
    </div>
  );
}
