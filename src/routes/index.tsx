import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { DishCard } from "@/components/DishCard";
import { categories, chefs, dishes } from "@/lib/data";
import { MapPin, Bell, Search, Coins, ChevronRight, Sparkles, Calendar, GraduationCap, Flame, Leaf } from "lucide-react";
import { useRewards } from "@/lib/rewards";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GharKaKhana – Homemade Food, Delivered" },
      { name: "description", content: "Order healthy homemade food from neighborhood chefs, tiffin services, and home kitchens near you." },
    ],
  }),
  component: Home,
});

function Home() {
  const [foodItems, setFoodItems] = useState<any[]>([]);

useEffect(() => {
  const fetchDishes = async () => {
    const snapshot = await getDocs(
      collection(db, "dishes")
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setFoodItems(data);
  };

  fetchDishes();
}, []);


  const coins = useRewards((s) => s.coins);
  return (
    <PhoneShell>
      {/* Header */}
      <div className="bg-gradient-to-b from-[oklch(0.97_0.04_50)] to-background px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 text-primary" /> Deliver to
            </div>
            <button className="flex items-center gap-1 font-semibold">
              Koramangala, BLR <ChevronRight className="h-4 w-4 rotate-90" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/rewards" className="flex items-center gap-1 rounded-full bg-warning/20 px-2.5 py-1.5 text-xs font-bold text-[oklch(0.45_0.15_60)]">
              <Coins className="h-3.5 w-3.5" /> {coins}
            </Link>
            <Link to="/notification" className="relative flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
            </Link>
          </div>
        </div>

        <Link to="/search" className="mt-3 flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm text-muted-foreground shadow-[var(--shadow-soft)]">
          <Search className="h-4 w-4" />
          Search for "ghar ka khana", chefs…
        </Link>
      </div>

      <div className="mx-4 mt-3 rounded-xl bg-yellow-100 p-3">
  <h3 className="font-bold">💰 Earn GharCoins</h3>
  <p className="text-sm">
    Get 10 GharCoins on every order and redeem rewards.
  </p>
</div>

      {/* Hero banner */}
      <div className="px-4 pt-3">
        <div className="overflow-hidden rounded-2xl p-4 text-white" style={{ background: "var(--gradient-primary)" }}>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider opacity-90">
            <Sparkles className="h-3.5 w-3.5" /> New User Offer
          </div>
          <h2 className="mt-1 text-xl font-bold leading-tight">50% OFF on your first<br />homemade meal</h2>
          <p className="mt-1 text-xs opacity-90">Use code <span className="font-bold">GHAR50</span> · Min order ₹99</p>
        </div>
      </div>

      {/* Categories */}
      <section className="px-4 pt-5">
        <h3 className="text-sm font-bold mb-3">What's on your mind?</h3>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 8).map((c) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="flex flex-col items-center gap-1.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[oklch(0.97_0.04_50)] text-2xl">
                {c.emoji}
              </div>
              <span className="text-[11px] font-medium text-center">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>
     { /*🏡 Order From Your Neighbors
Healthy homemade meals near you*/}
<div className="px-4 pt-4">
  <Link
    to="/neighbor-food"
    className="block rounded-2xl bg-green-50 border border-green-200 p-4"
  >
    <h3 className="font-bold">🏡 Order From Your Neighbors</h3>
    <p className="text-sm text-muted-foreground">
      Healthy homemade meals near you
    </p>
  </Link>
</div>

      {/* Quick links */}
      <section className="px-4 pt-5">
        <div className="grid grid-cols-2 gap-3">
          <Link to="/tiffin" className="rounded-2xl p-3 text-white" style={{ background: "var(--gradient-fresh)" }}>
            <Calendar className="h-5 w-5" />
            <div className="mt-2 font-bold text-sm leading-tight">Daily Tiffin Plan</div>
            <div className="text-[11px] opacity-90">From ₹89/meal</div>
          </Link>
          <Link to="/student-meals" className="rounded-2xl p-3 text-white" style={{ background: "linear-gradient(135deg, oklch(0.55 0.18 265), oklch(0.7 0.16 285))" }}>
            <GraduationCap className="h-5 w-5" />
            <div className="mt-2 font-bold text-sm leading-tight">Student Meal Plan</div>
            <div className="text-[11px] opacity-90">20% off · Hostel friendly</div>
          </Link>
        </div>
      </section>
      <section className="px-4 pt-5">
  <h3 className="text-sm font-bold mb-3">New Features</h3>

  <div className="grid grid-cols-2 gap-3">

    <Link
      to="/neighbor-food"
      className="rounded-2xl p-3 bg-card border border-border shadow-[var(--shadow-card)]"
    >
      <div className="text-2xl">🏠</div>
      <div className="mt-2 font-bold text-sm">Neighbor Food</div>
      <div className="text-[11px] text-muted-foreground">
        Order from nearby homes
      </div>
    </Link>

    <Link
      to="/street-food"
      className="rounded-2xl p-3 bg-card border border-border shadow-[var(--shadow-card)]"
    >
      <div className="text-2xl">🌮</div>
      <div className="mt-2 font-bold text-sm">Street Food</div>
      <div className="text-[11px] text-muted-foreground">
        Local vendors near you
      </div>
    </Link>

    <Link
      to="/ai-health-report"
      className="rounded-2xl p-3 bg-card border border-border shadow-[var(--shadow-card)]"
    >
      <div className="text-2xl">🤖</div>
      <div className="mt-2 font-bold text-sm">AI Verified Food</div>
      <div className="text-[11px] text-muted-foreground">
        Health & hygiene scores
      </div>
    </Link>

    <Link
      to="/parent-plan"
      className="rounded-2xl p-3 bg-card border border-border shadow-[var(--shadow-card)]"
    >
      <div className="text-2xl">👨‍👩‍👧</div>
      <div className="mt-2 font-bold text-sm">Parent Plans</div>
      <div className="text-[11px] text-muted-foreground">
        Sponsor student meals
      </div>
    </Link>

  </div>
</section>
  <h3 className="text-sm font-bold mb-3">New Features</h3>

  <div className="grid grid-cols-2 gap-3">

    <Link
      to="/neighbor-food"
      className="rounded-2xl p-3 bg-card border border-border"
    >
      <div className="text-2xl">🏠</div>
      <div className="mt-2 font-bold text-sm">Neighbor Food</div>
      <div className="text-[11px] text-muted-foreground">
        Order from nearby homes
      </div>
    </Link>

    <Link
      to="/street-food"
      className="rounded-2xl p-3 bg-card border border-border"
    >
      <div className="text-2xl">🌮</div>
      <div className="mt-2 font-bold text-sm">Street Food</div>
      <div className="text-[11px] text-muted-foreground">
        Local food vendors
      </div>
    </Link>

    <Link
      to="/ai-health-report"
      className="rounded-2xl p-3 bg-card border border-border"
    >
      <div className="text-2xl">🤖</div>
      <div className="mt-2 font-bold text-sm">AI Verified Food</div>
      <div className="text-[11px] text-muted-foreground">
        Health & hygiene scores
      </div>
    </Link>

    <Link
      to="/parent-plan"
      className="rounded-2xl p-3 bg-card border border-border"
    >
      <div className="text-2xl">👨‍👩‍👧</div>
      <div className="mt-2 font-bold text-sm">Parent Plans</div>
      <div className="text-[11px] text-muted-foreground">
        Sponsor student meals
      </div>
    </Link>

  </div>
      {/* Nearby Home Kitchens */}
      <section className="pt-6">
        <SectionHeader title="Nearby Home Kitchens" subtitle="Real homes, real cooks near you" link="/chefs" />
        <div className="scroll-x flex gap-3 overflow-x-auto px-4 pb-2">
          {chefs.map((chef) => (
            <Link key={chef.id} to="/chef/$id" params={{ id: chef.id }} className="w-[260px] flex-shrink-0 overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
              <div className="relative h-32">
                <img src={chef.avatar} alt={chef.name} loading="lazy" className="h-full w-full object-cover" />
                {chef.badge && (
                  <span className="absolute left-2 top-2 rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-success-foreground flex items-center gap-1">
                    <Leaf className="h-2.5 w-2.5" /> {chef.badge}
                  </span>
                )}
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{chef.name}</h4>
                  <span className="text-[11px] font-bold text-success">★ {chef.rating}</span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">{chef.speciality}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{chef.orders}+ orders · {chef.distance}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Festival */}
      <section className="px-4 pt-4">
        <Link to="/festival" className="flex items-center gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning text-xl">🪔</div>
          <div className="flex-1">
            <div className="font-bold text-sm">Festival Special Menu</div>
            <div className="text-[11px] text-muted-foreground">Diwali sweets & thalis from home chefs</div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </section>

      {/* Popular Dishes */}
      <section className="pt-5 pb-4">
        <div className="px-4 flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold flex items-center gap-1.5"><Flame className="h-4 w-4 text-primary" /> Popular near you</h3>
            <p className="text-[11px] text-muted-foreground">Hot from the home kitchen</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4">
        {foodItems.map((d) => (
  <DishCard key={d.id} dish={d} />
))}
        </div>
      </section>

      <section className="px-4 pb-6">
        <Link to="/category/$slug" params={{ slug: "homemade" }} className="flex h-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/5 text-sm font-semibold text-primary">
          See all homemade food
        </Link>
      </section>
    </PhoneShell>
  );
}

function SectionHeader({ title, subtitle, link }: { title: string; subtitle?: string; link?: string }) {
  return (
    <div className="flex items-end justify-between px-4 pb-3">
      <div>
        <h3 className="text-sm font-bold">{title}</h3>
        {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
      </div>
      {link && <Link to={link} className="text-xs font-semibold text-primary">See all</Link>}
    </div>
  );
}
