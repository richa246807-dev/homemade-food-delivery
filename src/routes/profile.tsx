import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { ChevronRight, Heart, MapPin, Gift, HelpCircle, LogOut, Coins, ShoppingBag, Settings, ChefHat, Bike, Shield } from "lucide-react";

export const Route = createFileRoute("/profile")({ component: Profile });

const sections = [
  { title: "Your Activity", items: [
    { icon: ShoppingBag, label: "Order History", to: "/orders" },
    { icon: Heart, label: "Favourites", to: "/" },
    { icon: MapPin, label: "Saved Addresses", to: "/" },
  ]},
  { title: "Rewards", items: [
    { icon: Coins, label: "GharCoins · 240", to: "/rewards" },
    { icon: Gift, label: "Refer & Earn ₹100", to: "/" },
  ]},
  { title: "Switch role", items: [
    { icon: ChefHat, label: "Home Chef Dashboard", to: "/chef-dashboard" },
    { icon: Bike, label: "Delivery Partner", to: "/delivery" },
    { icon: Shield, label: "Admin Dashboard", to: "/admin" },
  ]},
  { title: "Help & Settings", items: [
    { icon: HelpCircle, label: "Help & Support", to: "/" },
    { icon: Settings, label: "Settings", to: "/" },
    { icon: LogOut, label: "Logout", to: "/login" },
  ]},
];

function Profile() {
  return (
    <PhoneShell>
      <div className="bg-gradient-to-b from-[oklch(0.97_0.04_50)] to-background px-4 pt-6 pb-5">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-[var(--shadow-glow)]">RK</div>
          <div className="flex-1">
            <h1 className="text-lg font-bold">Rahul Kumar</h1>
            <p className="text-xs text-muted-foreground">+91 98765 43210 · rahul@gmail.com</p>
            <Link to="/" className="mt-1 inline-block text-xs font-semibold text-primary">Edit Profile</Link>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-card p-3 shadow-[var(--shadow-soft)]">
          {[["24", "Orders"], ["240", "Coins"], ["12", "Reviews"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-lg font-extrabold text-primary">{n}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-6 space-y-5">
        {sections.map((sec) => (
          <div key={sec.title}>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">{sec.title}</h3>
            <div className="rounded-2xl bg-card shadow-[var(--shadow-soft)] overflow-hidden">
              {sec.items.map((it) => {
                const Icon = it.icon;
                return (
                  <Link key={it.label} to={it.to} className="flex items-center gap-3 px-4 py-3.5 border-b border-border last:border-0 active:bg-muted">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="flex-1 text-sm font-medium">{it.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        <p className="text-center text-[11px] text-muted-foreground">GharKaKhana v1.0 · Made with 🧡 in India</p>
      </div>
    </PhoneShell>
  );
}
