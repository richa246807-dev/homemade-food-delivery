import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
console.log("CHEF ORDERS FILE LOADED");
export const Route = createFileRoute("/chef-orders")({ component: ChefOrders });

const tone: Record<string, string> = {
  Pending: "bg-yellow-500 text-white",
  Accepted: "bg-green-500 text-white",
  Preparing: "bg-blue-500 text-white",
  Delivered: "bg-gray-500 text-white",
};



function ChefOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const q = query(
        collection(db, "orders"),
        where("chefId", "==", "c1")
      );
  
      const snapshot = await getDocs(q);
  
      console.log("Orders Found:", snapshot.size);
  
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Orders Data:", data);
  
      setOrders(data);
    } catch (error) {
      console.error("Fetch Orders Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in UID:", user.uid);
        fetchOrders();
      } else {
        console.log("No user logged in");
      }
    });
  
    return () => unsubscribe();
  }, []);


  const updateStatus = async (
    orderId: string,
    status: string
  ) => {
    try{
    await updateDoc(
      doc(db, "orders", orderId),
      { status }
    );
  
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Manage Orders" />
      <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto scroll-x">
        {["All (18)", "New (2)", "Preparing (1)", "Ready (1)", "Delivered (14)"].map((t, i) => (
          <button key={t} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>{t}</button>
        ))}
      </div>
      <div className="px-4 pt-3 space-y-2 pb-6">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl bg-card border border-border p-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold">#{order.id}</div>
                <div className="text-[11px] text-muted-foreground">{order.items?.map((item: any) => (
  <div key={item.name}>
    {item.name} × {item.qty}
  </div>
))}

₹{order.totalAmount}</div>
              </div>
              <span
  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
    tone[order.status] || "bg-gray-200"
  }`}
>
  {order.status}
</span>
            </div>
            <div className="mt-1.5 text-xs text-muted-foreground">{order.items?.map((item: any) => (
  <div key={item.name}>
    {item.name} × {item.qty}
  </div>
))}

₹{order.totalAmount}</div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
              <span className="text-sm font-bold">{order.items?.map((item: any) => (
  <div key={item.name}>
    {item.name} × {item.qty}
  </div>
))}

₹{order.totalAmount}</span>
          
<button
  onClick={() =>
    updateStatus(
      order.id,
      order.status === "Pending"
        ? "Preparing"
        : order.status === "Preparing"
        ? "Out for Delivery"
        : "Delivered"
    )
  }
  className="px-3 py-1 rounded bg-green-500 text-white text-xs"
>
  {order.status === "Pending"
    ? "Start Cooking"
    : order.status === "Preparing"
    ? "Send Delivery"
    : "Mark Delivered"}
</button>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
