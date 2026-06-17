import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { useCart } from "@/lib/cart";
import { MapPin, Wallet, CreditCard, Banknote, Smartphone, Check } from "lucide-react";
import { useState } from "react";
import { getDocs, query, where } from "firebase/firestore";


export const Route = createFileRoute("/checkout")({ component: Checkout });

const methods = [
  { id: "upi", label: "UPI · GPay / PhonePe", icon: Smartphone, sub: "Pay using any UPI app" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, sub: "Visa, Mastercard, Rupay" },
  { id: "wallet", label: "GharKaKhana Wallet", icon: Wallet, sub: "Balance ₹250" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, sub: "Pay with cash" },
];

function Checkout() {
  const [coupon, setCoupon] = useState("");
const [discount, setDiscount] = useState(0);
  
  const [pay, setPay] = useState("upi");
  const navigate = useNavigate();
const { items, clear } = useCart();

const subtotal = useCart((s) => s.total());
const grand =
  subtotal +
  29 +
  Math.round(subtotal * 0.05) -
  discount;

  const applyCoupon = async () => {
    console.log("Coupon:", coupon);
    const q = query(
      collection(db, "coupons"),
      where("code", "==", coupon)
    );
    
    const snap = await getDocs(q);
    console.log("Documents:", snap.size);
    if (snap.empty) {
      alert("Invalid Coupon");
      return;
    }
  
    const data = snap.docs[0].data();
  
    if (!data.active) {
      alert("Coupon Disabled");
      return;
    }
  
    setDiscount(data.discount);
  
    alert(
      `Coupon Applied! ₹${data.discount} Off`
    );
  };


const handlePlaceOrder = async () => {
  console.log(items[0]);
console.log(items[0]?.dish);
  console.log("user:",auth.currentUser);
  console.log("Cart Items:", items);
console.log("Chef ID:", items[0]?.dish?.chefId);
console.log("Grand Total:", grand);
console.log("Coupon:", coupon);
console.log("Discount:", discount);
  try {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      chefId: items[0]?.dish?.chefId || null,
      items: items.map((i) => ({
        name: i.dish.name,
        price: i.dish.price,
        qty: i.qty,
      })),
      totalAmount: grand,
      paymentMethod: pay,
      status: "Pending",
      createdAt: serverTimestamp(),
      couponCode: coupon,
      discount: discount,
    });

    clear();

    alert("Order placed successfully!");
    navigate({ to: "/tracking" });
  } catch (error:any) {
    console.error("Order ERROR:",error);
    alert(error.message);
  }
};

  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Checkout" />
      <div className="flex-1 overflow-y-auto px-4 pb-4 pt-3 space-y-4">
        <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground mb-2"><MapPin className="h-3.5 w-3.5 text-primary" /> Delivery Address</div>
          <div className="font-semibold text-sm">Home · Rahul Kumar</div>
          <p className="mt-1 text-xs text-muted-foreground">Flat 12, Pearl Apts, 4th Block, Koramangala, Bangalore 560034</p>
          <p className="mt-1 text-xs">📱 +91 98765 43210</p>
        </section>


        <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
  <h3 className="text-xs font-bold uppercase text-muted-foreground mb-2">
    Apply Coupon
  </h3>

  <div className="flex gap-2">
    <input
      value={coupon}
      onChange={(e) =>
        setCoupon(e.target.value)
      }
      placeholder="Enter Coupon Code"
      className="flex-1 rounded-lg border border-border px-3 py-2"
    />

    <button
      onClick={applyCoupon}
      className="px-4 rounded-lg bg-primary text-white"
    >
      Apply
    </button>
  </div>

  {discount > 0 && (
    <p className="text-green-600 text-sm mt-2">
      Discount Applied: ₹{discount}
    </p>
  )}
</section>


        <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
          <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3">Payment Method</h3>
          <div className="space-y-2">
            {methods.map((m) => {
              const Icon = m.icon;
              const active = pay === m.id;
              return (
                <button key={m.id} onClick={() => setPay(m.id)} className={`w-full flex items-center gap-3 rounded-xl border-2 p-3 text-left transition ${active ? "border-primary bg-primary/5" : "border-border"}`}>
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{m.label}</div>
                    <div className="text-[11px] text-muted-foreground">{m.sub}</div>
                  </div>
                  {active && <Check className="h-5 w-5 text-primary" />}
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
          <h3 className="text-xs font-bold uppercase text-muted-foreground mb-2">Instructions for chef</h3>
          <textarea placeholder="e.g. less spicy, no onion" className="w-full h-16 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none" />
        </section>

        <div className="rounded-2xl bg-success/10 border border-success/30 p-3 text-xs">
          🌿 You'll earn <b>{Math.round(grand / 10)} reward coins</b> on this order.
        </div>
      </div>
      <div className="border-t border-border bg-background p-4 flex items-center gap-3">
        <div>
          <div className="text-lg font-bold">₹{grand}</div>
          <div className="text-[11px] text-muted-foreground">TOTAL</div>
        </div>
        
        <button
  onClick={handlePlaceOrder}
  className="flex-1 h-12 flex items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
>
  Place Order
</button> 
      </div>
    </div>
  );
}
