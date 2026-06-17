import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TopBar } from "@/components/TopBar";
import { Leaf, MapPin, Star } from "lucide-react";

export const Route = createFileRoute("/chefs")({ component: ChefsList });

function ChefsList() {
  const [chefs, setChefs] = useState<any[]>([]);
  useEffect(() => {
    const fetchChefs = async () => {
      const snapshot = await getDocs(
        collection(db, "chefs")
      );
  
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setChefs(data);
    };
  
    fetchChefs();
  }, []);

  return (
    <PhoneShell>
      <TopBar title="Home Chefs near you" back={false} />
      <div className="bg-success/10 px-4 py-2.5 text-[11px] text-success-foreground/80 flex items-center gap-2">
        <Leaf className="h-3.5 w-3.5 text-success" />
        <span className="text-foreground">Supporting 1,200+ women home chefs across India</span>
      </div>

      <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto scroll-x">
        {["All", "Veg only", "Healthy", "Tiffin", "Bengali", "South Indian", "Punjabi"].map((f, i) => (
          <button key={f} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-3 px-4 pt-3 pb-6">
      {chefs.map((chef: any) => (
          <Link
          key={chef.id}
          to="/chef/$id"
          params={{ id: chef.uid }}
        >
            <img src={chef.avatar} alt={chef.name} loading="lazy" className="h-20 w-20 flex-shrink-0 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-sm">{chef.name}</h3>
                <span className="flex items-center gap-0.5 rounded-md bg-success/15 px-1.5 py-0.5 text-[11px] font-bold text-success">
                  <Star className="h-3 w-3 fill-success" /> {chef.rating}
                </span>
              </div>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{chef.speciality}</p>
              <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{chef.distance}</span>
                <span>{chef.orders}+ orders</span>
              </div>
              {chef.badge && (
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-warning/20 px-2 py-0.5 text-[10px] font-semibold text-[oklch(0.45_0.15_60)]">
                  ⭐ {chef.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </PhoneShell>
  );
}
