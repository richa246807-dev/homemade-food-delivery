import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { dishes } from "@/lib/data";
import { TopBar } from "@/components/TopBar";
import { Minus, Plus, Coins, Tag } from "lucide-react";

export const Route = createFileRoute("/cart")({ component: Cart });

function Cart() {
  const { items, add, dec, total } = useCart();
  const sub = total();
  const delivery = sub > 0 ? 29 : 0;
  const gst = Math.round(sub * 0.05);
  const grand = sub + delivery + gst;

  if (items.length === 0) {
    return (
      <div className="phone-frame flex flex-col bg-background">
        <TopBar title="Your Cart" />
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-lg font-bold">Your cart is empty</h2>
          <p className="mt-1 text-sm text-muted-foreground">Add some homemade goodness</p>
          <Link to="/" className="mt-6 h-11 px-6 inline-flex items-center rounded-xl bg-primary text-primary-foreground font-semibold">Browse food</Link>
          <div className="mt-8 w-full">
            <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3 text-left">Popular today</h3>
            {dishes.slice(0, 2).map((d) => (
              <Link key={d.id} to="/food/$id" params={{ id: d.id }} className="flex items-center gap-3 rounded-xl bg-card p-2 mb-2 border border-border">
                <img src={d.img} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1 text-left text-sm">{d.name}</div>
                <span className="text-primary font-bold text-sm">+ Add</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title={`Cart (${items.length})`} />
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-4 pt-3 space-y-3">
          {items.map(({ dish, qty }) => (
            <div key={dish.id} className="flex gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-soft)]">
              <img src={dish.img} alt="" className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold leading-tight">{dish.name}</h3>
                <p className="text-[11px] text-muted-foreground">{dish.chef}</p>
                <p className="text-green-600 text-xs font-semibold">
  🛡️ AI Verified
</p>
                <div className="mt-1 font-bold text-sm">₹{dish.price * qty}</div>
              </div>
              <div className="flex items-center gap-2 self-center rounded-lg border-2 border-success/30 bg-success/5 px-2 py-1">
                <button onClick={() => dec(dish.id)} className="text-success"><Minus className="h-3.5 w-3.5" /></button>
                <span className="font-bold text-success text-sm w-3 text-center">{qty}</span>
                <button onClick={() => add(dish)} className="text-success"><Plus className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-4 mt-4 rounded-2xl border border-warning/40 bg-warning/10 p-3 flex items-center gap-3">
          <Coins className="h-5 w-5 text-[oklch(0.55_0.15_60)]" />
          <div className="flex-1 text-xs">Use <b>40 coins</b> to save ₹40 on this order</div>
          <button className="text-xs font-bold text-primary">APPLY</button>
        </div>

        <Link to="/cart" className="mx-4 mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card p-3 text-sm">
          <Tag className="h-4 w-4 text-primary" />
          <span className="flex-1 font-medium">Apply coupon</span>
          <span className="text-xs text-primary font-semibold">2 available</span>
        </Link>
        <div className="mx-4 mt-4 rounded-2xl bg-purple-50 p-4">
  <h3 className="font-bold">👨‍👩‍👧 Parent Sponsored Meal</h3>
  <p className="text-sm">
    Parents can directly sponsor healthy meals for students.
  </p>
</div>
        <div className="mx-4 mt-4 rounded-2xl bg-blue-50 p-4">
  <h3 className="font-bold">🎓 Student Offer</h3>
  <p className="text-sm">
    Get 20% off on monthly meal subscriptions.
  </p>
</div>
        <div className="mx-4 mt-4 rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
          <h3 className="text-sm font-bold mb-3">Bill Details</h3>
          <div className="mx-4 mt-3 rounded-xl bg-green-100 p-3">
  
          {[["Item Total", `₹${sub}`], ["Delivery Fee", `₹${delivery}`], ["Taxes & Charges", `₹${gst}`]].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1 text-sm text-muted-foreground"><span>{k}</span><span>{v}</span></div>
          ))}
          <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-bold"><span>To Pay</span><span>₹{grand}</span></div>
        </div>
      </div>
        <div className="mx-4 mt-3 rounded-xl bg-green-100 p-3">
  <p className="text-sm font-semibold">
    🎉 You'll earn 10 GharCoins on this order
  </p>
</div>
        <div className="mx-4 mt-4 rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
          <h3 className="text-sm font-bold">Delivery in 25 mins</h3>
          <p className="mt-1 text-xs text-muted-foreground">Flat 12, Pearl Apartments, Koramangala 4th Block, Bangalore 560034</p>
          <button className="mt-2 text-xs text-primary font-semibold">CHANGE</button>
        </div>
      </div>

      <div className="border-t border-border bg-background p-4 flex items-center gap-3">
        <div>
          <div className="text-lg font-bold">₹{grand}</div>
          <div className="text-[11px] text-muted-foreground">TOTAL</div>
        </div>
        <Link to="/checkout" className="flex-1 h-12 flex items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
          Proceed to Checkout →
        </Link>
      </div>
    </div>
  );
}
