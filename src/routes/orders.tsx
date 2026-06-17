import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { TopBar } from "@/components/TopBar";
import { dishes } from "@/lib/data";

export const Route = createFileRoute("/orders")({ component: Orders });

function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;

      
      console.log("Current User:", user);
      console.log("Current UID:", user?.uid);
  
      if (!user) return;
  
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
  
      const snapshot = await getDocs(q);
      console.log("Orders Count:", snapshot.docs.length);
  
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Orders Data:", data);

      console.log("Current User UID:", user?.uid);
console.log("Orders Count:", snapshot.docs.length);
console.log("Orders Data:", data);
  
      setOrders(data);
    };
  
    fetchOrders();
  }, []);


  if (orders.length === 0) {
    return (
      <PhoneShell>
        <TopBar title="Your Orders" back={false} />
        <div className="p-6 text-center">
          No orders found
        </div>
      </PhoneShell>
    );
  }


  return (

    <PhoneShell>
      <TopBar title="Your Orders" back={false} />
      <div className="px-4 pt-3 space-y-3 pb-6">
        {orders.map((o) => (
          <Link key={o.id} to={
            o.status === "Delivered"
              ? "/reviews"
              : "/tracking"
          } className="block rounded-2xl bg-card p-3 shadow-[var(--shadow-card)]">
            <div className="flex gap-3">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
  🍱
</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold leading-tight">
  {o.items?.[0]?.name || "Order"}
</h3>
<span className="text-[11px] font-bold text-primary">
  {o.status}
</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
  {o.items?.length || 0} item(s)
</p>
<p className="mt-1 text-[11px] text-muted-foreground">
  Order ID: #{o.id.slice(0, 8)}
</p>
                <p className="text-[11px] text-green-600">
  🛡️ AI Health Score: 92/100
</p>
                <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-sm">
  ₹{o.totalAmount}
</span>
                  <p className="text-[11px] text-warning font-semibold">
  💰 +10 GharCoins Earned
</p>
                  {o.status === "Delivered" ? (
                    <span className="text-xs text-primary font-semibold">Rate & Reorder →</span>
                  ) : (
                    <span className="text-xs text-primary font-semibold">Track Order →</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PhoneShell>
  );
}
