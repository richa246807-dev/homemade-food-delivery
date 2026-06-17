import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Bike, Wallet, Star, MapPin, Clock, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

export const Route = createFileRoute("/delivery")({ component: Delivery });

function Delivery() {
  const [deliveryPartner, setDeliveryPartner] = useState<any>(null);
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
  
    const unsubscribe = onAuthStateChanged(auth, 
      async(user) => {
      console.log("Current User:", user);
      
      if (!user) return;
      console.log("User Email:", user.email);
  
      console.log("UID:", user.uid);
      const partnerSnap = await getDoc(
        doc(db, "deliveryPartner", user.uid)
      );
      
      if (partnerSnap.exists()) {
        setDeliveryPartner(partnerSnap.data());
        console.log("Partner Data:", partnerSnap.data());
      }
  
      const q = query(
        collection(db, "orders"),
        where("deliveryPartnerId", "==", user.uid),
        where("status", "==", "Out for Delivery"),
      );
      

      const snap = await getDocs(q);


      const completedQ = query(
        collection(db, "orders"),
        where("deliveryPartnerId", "==", user.uid),
        where("status", "==", "Delivered")
      );
      
      const completedSnap = await getDocs(completedQ);
      
      const completedData = completedSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setCompletedOrders(completedData);


      console.log("Orders Found:", snap.size);
      snap.docs.forEach((doc) => {
        console.log(doc.id, doc.data());
      });

      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  

      
      setOrders(data);
    }
  );
   return () => unsubscribe();

  }, []);

  let total = 0;

completedOrders.forEach((order) => {
  total += 30; // ₹30 per delivery
});

let totalDistance = 0;

completedOrders.forEach((order) => {
  totalDistance += order.distance || 0;
});
  const markDelivered = async (orderId: string) => {
    await updateDoc(
      doc(db, "orders", orderId),
      {
        status: "Delivered",
      }
    );
  
    setOrders((prev) =>
      prev.filter((o) => o.id !== orderId)
    );
  
    alert("Order Delivered");
  };


  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Delivery Dashboard" back={false} />
      <div className="px-4 pt-3 pb-2 flex items-center gap-3">
      <div className="h-12 w-12 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold">
  {deliveryPartner?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase() || "DP"}
</div>
        <div className="flex-1">
        <div className="font-bold">
  {deliveryPartner?.name || "Delivery Partner"}
</div>
          <div className="text-[11px] text-muted-foreground flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /> {completedOrders.length} deliveries</div>
        </div>
        <label
  onClick={() => setIsOnline(!isOnline)}
  className="flex items-center gap-2 text-xs font-semibold cursor-pointer"
>
  <span className={isOnline ? "text-success" : "text-red-500"}>
    {isOnline ? "Online" : "Offline"}
  </span>

  <span
    className={`relative inline-flex h-5 w-9 items-center rounded-full ${
      isOnline ? "bg-success" : "bg-gray-400"
    }`}
  >
    <span
      className={`absolute h-4 w-4 rounded-full bg-white transition-all ${
        isOnline ? "right-0.5" : "left-0.5"
      }`}
    />
  </span>
</label>
      </div>

      <div className="px-4 pt-2">
        <div className="rounded-2xl p-4 text-white shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-fresh)" }}>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase opacity-90"><Wallet className="h-3.5 w-3.5" /> Today's earnings</div>
          <div className="mt-1 text-3xl font-extrabold">₹{total}</div>
          <div className="mt-2 grid grid-cols-3 divide-x divide-white/30 text-center text-xs">
  <div>
    <b className="block text-base">
      {completedOrders.length}
    </b>
    Deliveries
  </div>

  <div>
    <b className="block text-base">
      {totalDistance.toFixed(1)} km
    </b>
    Distance
  </div>

  <div>
    <b className="block text-base">
      {isOnline ? "Online" : "Offline"}
    </b>
    Status
  </div>
</div>
</div>
  
</div>
      <div className="px-4 pt-4">
        <h3 className="text-sm font-bold mb-2 flex items-center gap-2"><Bike className="h-4 w-4 text-primary" /> New order assigned</h3>
        
        {orders.map((order: any) => (
  <div
    key={order.id}
    className="rounded-2xl bg-card border-2 border-primary p-4"
  >
    <div>
      Amount: ₹{order.totalAmount}
    </div>

    <div>
      Status: {order.status}
    </div>

    {order.items?.map((item: any, index: number) => (
      <div key={index}>
        {item.name} × {item.qty}
      </div>
    ))}

    <Link
      to="/delivery-navigation"
      
      className="mt-2 block w-full rounded-xl bg-blue-600 text-white p-2 text-center"
    >
      Navigate
    </Link>

    <button
      onClick={() => markDelivered(order.id)}
      className="mt-3 w-full rounded-xl bg-green-600 text-white p-2"
    >
      Delivered
    </button>
  </div>
))}
        </div>


     <div className="px-4 pt-4 pb-6">
        <h3 className="text-sm font-bold mb-2">Today's completed</h3>
        <div className="space-y-2">
        {completedOrders.map((order: any) => (
  <div
    key={order.id}
    className="flex items-center justify-between rounded-xl bg-card border border-border p-3"
  >
    <div className="text-sm">
      <div className="font-semibold">
        #{order.id.slice(0, 6)}
      </div>

      <div className="text-[11px] text-muted-foreground">
        ₹{order.totalAmount}
      </div>
    </div>

    <div className="text-sm font-bold text-success">
      +₹30
    </div>
  </div>
))}

<Link
  to="/delivery-history"
  className="mt-3 flex items-center justify-center rounded-xl bg-primary text-primary-foreground p-3 text-sm font-semibold"
>
  View Full History
</Link>

      </div>
    </div>
  </div>
);
}
