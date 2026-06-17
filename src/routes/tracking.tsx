import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot
} from "firebase/firestore";
import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Check, ChefHat, Bike, Home, Phone, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useRewards } from "@/lib/rewards";

export const Route = createFileRoute("/tracking")({ component: Tracking });

function Tracking() {
  const [order, setOrder] = useState<any>(null);
  const currentStatus = order?.status;
  const steps = [
    {
      icon: Check,
      label: "Order Placed",
      done: true,
      time: "Placed",
    },
    {
      icon: ChefHat,
      label: "Chef is preparing your food",
      done: ["Preparing", "Out for Delivery", "Delivered"].includes(currentStatus),
      time: "Preparing",
    },
    {
      icon: Bike,
      label: "Out for delivery",
      done: ["Out for Delivery", "Delivered"].includes(currentStatus),
      time: "On the way",
    },
    {
      icon: Home,
      label: "Delivered",
      done: currentStatus === "Delivered",
      time: "Delivered",
    },
  ];
  const clear = useCart((s) => s.clear);
  const addCoins = useRewards((s) => s.addCoins);

  useEffect(() => {
    clear();
    addCoins(20);
  }, [clear, addCoins]);

  useEffect(() => {
    const user = auth.currentUser;
  
    if (!user) return;
  
    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(1)
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setOrder({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        });
      }
    });
  
    return () => unsubscribe();
  }, []);

if (!order) {
  return (
    <div className="phone-frame flex items-center justify-center">
      Loading order...
    </div>
  );
}

  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Track Order" />

      <div className="relative h-56 bg-[oklch(0.92_0.03_140)] overflow-hidden">
        {/* faux map */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200">
          <path d="M0 100 Q100 50 200 100 T400 90" stroke="oklch(0.68 0.21 39)" strokeWidth="3" strokeDasharray="6 4" fill="none" />
          <circle cx="80" cy="90" r="8" fill="oklch(0.62 0.17 145)" />
          <circle cx="330" cy="100" r="8" fill="oklch(0.68 0.21 39)" />
        </svg>
        <div className="absolute left-4 top-4 bg-white rounded-lg shadow px-2 py-1 text-[11px] font-semibold">🏠 Chef</div>
        <div className="absolute right-4 bottom-12 bg-white rounded-lg shadow px-2 py-1 text-[11px] font-semibold">📍 You</div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg pulse-ring">
          <Bike className="h-5 w-5" />
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-2xl bg-primary p-4 text-primary-foreground shadow-[var(--shadow-glow)]">
          <div className="text-[11px] uppercase tracking-wider opacity-90">Arriving in</div>
          <div className="mt-2 text-sm font-bold">
  Status: {order.status}
</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold">28</span>
            <span className="text-sm">mins</span>
          </div>
          <div className="mt-1 text-xs opacity-90">Order #{order.id.slice(0, 8)} · Priya's Kitchen</div>
        </div>
      </div>

      <div className="px-4 pt-5">
        <div className="space-y-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${s.done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"} $${s.done ? "ring-4 ring-success/20" : ""}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {i < steps.length - 1 && <div className={`my-1 w-0.5 flex-1 ${s.done ? "bg-success" : "bg-border"}`} style={{ minHeight: 28 }} />}
                </div>
                <div className="pb-3">
                  <div className={`text-sm font-semibold ${s.done ? "" : "text-muted-foreground"}`}>{s.label}</div>
                  <div className="text-[11px] text-muted-foreground">{s.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-4 mt-2 mb-4 rounded-2xl bg-card border border-border p-3 flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold">AK</div>
        <div className="flex-1">
          <div className="text-sm font-semibold">Arun K. · Delivery Partner</div>
          <div className="text-[11px] text-muted-foreground">★ 4.8 · On the way</div>
        </div>
        <button className="h-9 w-9 rounded-full bg-success flex items-center justify-center text-success-foreground"><Phone className="h-4 w-4" /></button>
        <button className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground"><MessageCircle className="h-4 w-4" /></button>
      </div>
      <div className="mx-4 mt-3 rounded-2xl bg-green-50 border border-green-200 p-4">
  <h3 className="font-bold">🛡️ AI Verified Meal</h3>
  <p className="text-sm">Health Score: 92/100</p>
  <p className="text-sm">Oil Usage: Low</p>
  <p className="text-sm">Protein: High</p>
</div>

{order.status === "Delivered" && (
  <div className="px-4 mt-4">
    <Link
      to="/reviews"
      className="block h-12 rounded-xl bg-primary text-primary-foreground text-center leading-[48px] font-semibold"
    >
      ⭐ Rate Your Order
    </Link>
  </div>
)}

      <div className="px-4 pb-6">
        <Link to="/orders" className="block h-11 rounded-xl border border-border bg-card text-center leading-[44px] text-sm font-semibold">View all orders</Link>
      </div>
    </div>
  );
}
