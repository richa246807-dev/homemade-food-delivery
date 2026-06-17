import { createFileRoute, useParams, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCart } from "@/lib/cart";
import { ArrowLeft, Heart, Star, Clock, Leaf, Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/food/$id")({ component: Food });

function Food() {
  const [dish, setDish] = useState<any>(null);
  const { id } = useParams({ from: "/food/$id" });
  useEffect(() => {
    const fetchDish = async () => {
      const docRef = doc(db, "dishes", id);
  
      const snapshot = await getDoc(docRef);
  
      if (snapshot.exists()) {
        setDish({
          id: snapshot.id,
          ...snapshot.data(),
        });
      }
    };
  
    fetchDish();
  }, [id]);

  const nav = useNavigate();
  const { items, add, dec } = useCart();
  const item = items.find((i) => i.dish.id === dish.id);
if (!dish) {
  return <div>Loading...</div>;
}
  return (
    <div className="phone-frame flex flex-col bg-background">
      <div className="relative h-72">
        <img src={dish.imageUrl} alt={dish.name} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95"><ArrowLeft className="h-5 w-5" /></Link>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95"><Heart className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="flex-1 -mt-5 rounded-t-3xl bg-background px-5 pt-5 pb-32">
        <div className="flex items-center gap-2">
          <span className={`flex h-5 w-5 items-center justify-center rounded border-2 ${dish.veg ? "border-success" : "border-destructive"}`}>
            <span className={`h-2 w-2 rounded-full ${dish.veg ? "bg-success" : "bg-destructive"}`} />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{dish.category}</span>
          {dish.healthy && (
            <span className="ml-auto flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-bold text-success">
              <Leaf className="h-3 w-3" /> Healthy Homemade
            </span>
          )}
        </div>
        <h1 className="mt-2 text-2xl font-bold">{dish.name}</h1>

        <Link to="/chef/$id" params={{ id: dish.chefId }} className="mt-2 inline-flex items-center gap-2 text-sm text-primary font-semibold">
          by {dish.chefName} →
        </Link>

        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 font-bold text-success"><Star className="h-3.5 w-3.5 fill-success" /> {dish.rating} ({dish.reviews})</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {dish.time}</span>
        </div>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{dish.description}</p>

        <div className="mt-5 rounded-2xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold mb-2">Customize</h3>
          {["Extra ghee (+₹15)", "Extra roti (+₹20)", "Extra dahi (+₹10)"].map((o, i) => (
            <label key={o} className="flex items-center justify-between py-2 text-sm border-b border-border last:border-0">
              <span>{o}</span>
              <input type="checkbox" defaultChecked={i === 0} className="h-4 w-4 accent-[var(--primary)]" />
            </label>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-success/10 p-3 text-xs flex gap-3">
          <Leaf className="h-5 w-5 text-success flex-shrink-0" />
          <p><span className="font-bold text-success">100% Homemade</span> · Cooked fresh today in a certified home kitchen. No preservatives, no MSG.</p>
        </div>

        <h3 className="mt-6 text-sm font-bold">Reviews ({dish.reviews})</h3>
        {[
          { n: "Aarti S.", r: 5, t: "Tasted just like my mom's cooking. Will order again!" },
          { n: "Rohan M.", r: 4, t: "Generous portion, fresh and warm on arrival." },
        ].map((rev) => (
          <div key={rev.n} className="mt-3 rounded-xl bg-card p-3 border border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold">{rev.n}</span>
              <span className="text-success font-bold">★ {rev.r}.0</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{rev.t}</p>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 left-0 right-0 border-t border-border bg-background p-4 flex items-center gap-3">
        {item ? (
          <div className="flex items-center gap-3 rounded-xl bg-success px-3 py-2 text-success-foreground">
            <button onClick={() => dec(dish.id)}><Minus className="h-4 w-4" /></button>
            <span className="font-bold">{item.qty}</span>
            <button onClick={() => add(dish)}><Plus className="h-4 w-4" /></button>
          </div>
        ) : (
          <div className="text-lg font-bold">₹{dish.price}</div>
        )}
        <button
          onClick={() => { add(dish); nav({ to: "/cart" }); }}
          className="flex-1 h-12 rounded-xl bg-primary font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
        >
          {item ? "Go to Cart →" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
