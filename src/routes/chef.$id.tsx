import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where,doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DishCard } from "@/components/DishCard";
import { ArrowLeft, Star, MapPin, Clock, Share2, Heart } from "lucide-react";

export const Route = createFileRoute("/chef/$id")({ component: Chef });

function Chef() {
  const [Chef, setChef] = useState<any>(null);
  const [chefDishes, setChefDishes] = useState<any[]>([]);
  const { id } = useParams({ from: "/chef/$id" });

  useEffect(() => {
    const fetchChefData = async () => {
  
      // Chef Details
      const chefDoc = await getDoc(
        doc(db, "chefs", id)
      );
  
      if (chefDoc.exists()) {
        setChef(chefDoc.data());
      }
  
      // Chef Dishes
      const q = query(
        collection(db, "dishes"),
        where("chefId", "==", id)
      );
  
      const snapshot = await getDocs(q);
  
      const data: any[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setChefDishes(data);
    };
  
    fetchChefData();
  }, [id]);

  if (!Chef) {
    return (
      <PhoneShell>
        <div className="p-4">
          Loading Chef...
        </div>
      </PhoneShell>
    );
  }
  return (
    <PhoneShell>
      <div className="relative h-56">
        <img src={Chef?.avatar} alt={Chef?.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <Link to="/chefs" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90"><ArrowLeft className="h-5 w-5" /></Link>
          <div className="flex gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90"><Share2 className="h-4 w-4" /></button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90"><Heart className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 p-4 text-white">
          <span className="inline-flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[10px] font-bold">⭐ {Chef?.badge}</span>
          <h1 className="mt-2 text-2xl font-bold">{Chef?.name}</h1>
          <p className="text-sm opacity-90">{Chef?.speciality}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-card text-center text-xs">
        <div className="py-3"><div className="flex items-center justify-center gap-1 font-bold text-success"><Star className="h-3.5 w-3.5 fill-success" />{Chef?.rating}</div><div className="text-muted-foreground">{Chef?.orders}+ ratings</div></div>
        <div className="py-3"><div className="flex items-center justify-center gap-1 font-bold"><Clock className="h-3.5 w-3.5" />25 min</div><div className="text-muted-foreground">delivery</div></div>
        <div className="py-3"><div className="flex items-center justify-center gap-1 font-bold"><MapPin className="h-3.5 w-3.5" />{Chef?.distance}</div><div className="text-muted-foreground">from you</div></div>
      </div>

      <div className="px-4 pt-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
        Hi! I'm {Chef?.name?.split(" ")[0] || "Chef"}. I've been cooking traditional homemade food for my family for 20+ years.
          Every dish is made fresh in my home kitchen using my mom's recipes. 🌿 100% homemade · No preservatives.
        </p>
      </div>

      <div className="sticky top-0 z-20 mt-4 flex gap-1 border-b border-border bg-background px-4">
        {["Menu", "Reviews", "About"].map((t, i) => (
          <button key={t} className={`pb-3 pt-3 px-3 text-sm font-semibold ${i === 0 ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>{t}</button>
        ))}
      </div>

      <div className="px-4 pt-3">
        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-2">Today's Menu</h3>
        <div className="grid grid-cols-2 gap-3 pb-6">
        {chefDishes.map((dish) => (
  <DishCard
    key={dish.id}
    dish={dish}
  />
))}
        </div>
      </div>
    </PhoneShell>
  );
}
