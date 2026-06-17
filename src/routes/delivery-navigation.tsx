import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Navigation, Phone, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";


export const Route = createFileRoute("/delivery-navigation")({ component: Nav, });

function Nav() {
  const [order, setOrder] = useState<any>(null);
 

  useEffect(() => {
    const loadOrder = async () => {
      const snap = await getDoc(
        doc(db, "orders", "5ePdXUxKHVeMQpmGt1f8")
      );
  
      if (snap.exists()) {
        setOrder({
          id: snap.id,
          ...snap.data(),
        });
      }
    };
  
    loadOrder();
  }, []);

  const markDelivered = async () => {
    await updateDoc(
      doc(db, "orders", order.id),
      {
        status: "Delivered",
      }
    );
  
    alert("Order Delivered");
  
    window.location.href = "/delivery";
  };

  return (
    
    <div className="phone-frame flex flex-col bg-background">
      <div className="relative h-[300px] w-full overflow-hidden">
      <iframe
  src="https://maps.google.com/maps?q=Civil%20Lines%20Prayagraj&t=&z=13&ie=UTF8&iwloc=&output=embed"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  loading="lazy"
/>



        <Link to="/delivery" className="absolute left-3 top-3 h-9 w-9 rounded-full bg-white/95 flex items-center justify-center"><ArrowLeft className="h-5 w-5" /></Link>
        <button
    onClick={() =>
   window.open(
     "https://www.google.com/maps/search/?api=1&query=Civil%20Lines%20Prayagraj"
   )
 }
 className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
>
 <Navigation className="h-6 w-6" />

</button>
</div>
      <div className="flex-1 px-4 pt-4 pb-4 flex flex-col">
        <div className="rounded-2xl bg-card border border-border p-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold"> {order?.customerName
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase() || "CU"}</div>
          <div className="flex-1">
            <div className="text-sm font-bold">{order?.customerName}</div>
            <div className="text-[11px] text-muted-foreground">{order?.customerAddress}</div>
          </div>
          <button
  onClick={() =>{
    console.log("Phone:", order?.customerPhone);
    if (order?.customerPhone) {
      window.location.href = `tel:${String(order.customerPhone)}`;
    }
  }}
  
  className="h-9 w-9 rounded-full bg-success flex items-center justify-center text-success-foreground"
>
  <Phone className="h-4 w-4" />
</button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-xl bg-muted py-2.5"><div className="font-extrabold text-base">{Math.ceil((order?.distance || 0) * 4)} min</div>ETA</div>
          <div className="rounded-xl bg-muted py-2.5"><div className="font-extrabold text-base">{order?.distance} km</div>Distance</div>
          <div className="rounded-xl bg-muted py-2.5"><div className="font-extrabold text-base">  ₹{order?.deliveryCharge || 30}</div>Payout</div>
        </div>

        <button
  onClick={() => markDelivered()}
  className="mt-auto h-12 flex items-center justify-center gap-2 rounded-xl bg-success text-success-foreground font-semibold shadow-[var(--shadow-glow)]"
>
  <Package className="h-4 w-4" />
  Mark as Delivered
</button>
      </div>
    </div>
    
  );
}
