import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/delivery-history")({
    component: DeliveryHistory,
  });

function DeliveryHistory() {
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
          auth,
          async (user) => {
            if (!user) return;
      
            const q = query(
              collection(db, "orders"),
              where("deliveryPartnerId", "==", user.uid),
              where("status", "==", "Delivered")
            );
      
            const snap = await getDocs(q);
      
            const data = snap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
      
            setHistory(data);
          }
        );
      
        return () => unsubscribe();
      }, []);

  return (
    <div className="p-4">
  <h2 className="text-xl font-bold mb-4">
    Delivery History
  </h2>
  <div className="rounded-2xl p-4 text-white mb-4"
     style={{ background: "var(--gradient-fresh)" }}>
  <div className="text-sm">
    Total Deliveries
  </div>

  <div className="text-3xl font-bold">
    {history.length}
  </div>

  <div className="mt-2 text-sm">
    Earnings ₹{history.length * 30}
  </div>
</div>

  <div className="space-y-3">
    {history.map((order: any) => (
      <div
        key={order.id}
        className="bg-card border border-border rounded-2xl p-4 shadow-[var(--shadow-soft)]"
      >
        <div className="flex justify-between items-center">
          <span className="font-bold text-primary">
            #{order.id.slice(0, 6)}
          </span>

          <span className="text-green-600 font-bold">
            +₹30
          </span>
        </div>

        <div className="mt-3 space-y-1 text-sm">
          <div>
            💰 Amount: ₹{order.totalAmount}
          </div>

          <div>
            📍 Distance: {order.distance || 0} km
          </div>

          <div>
            📦 Status: {order.status}
          </div>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          Delivered Successfully
        </div>
      </div>
    ))}
  </div>
</div>
);
}