import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Users, ChefHat, Store, Package, TrendingUp, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
//import { db } from "@/lib/firebase";
import { auth, db } from "@/lib/firebase";
import {  getDoc } from "firebase/firestore";
import { useNavigate } from "@tanstack/react-router";
import {
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export const Route = createFileRoute("/admin")({ component: Admin });

function Admin() {
  const [deliveryPartners, setDeliveryPartners] = useState<any[]>([]);
  const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [usersCount, setUsersCount] = useState(0);
    const [chefsCount, setChefsCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    useEffect(() => {
      const checkAdmin = async () => {
        const user = auth.currentUser;
  
        if (!user) {
          navigate({ to: "/login" });
          return;
        }
  
        const snap = await getDoc(
          doc(db, "users", user.uid)
        );
        
        if (!snap.exists()) {
          console.log("User document not found");
          return;
        }
        
        console.log("Current User:", user.uid);
        
        const data = snap.data();
        
        console.log("User Data:", data);
        console.log("Role:", data?.role);
        
        if (data.role !== "admin") {
          console.log("ACCESS DENIED");
          alert("Access Denied");
          navigate({ to: "/" });
        }
      };
      checkAdmin();
    }, [navigate]);
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    useEffect(() => {
      fetchDeliveryPartners();
    }, []);

    useEffect(() => {
      const fetchStats = async () => {
    
        const usersSnap = await getDocs(
          collection(db, "users")
        );
    
        setUsersCount(usersSnap.size);
    
        const chefsSnap = await getDocs(
          collection(db, "chefs")
        );
    
        setChefsCount(chefsSnap.size);
    
        const ordersSnap = await getDocs(
          collection(db, "orders")
        );
    
        setOrdersCount(ordersSnap.size);
    
        let totalRevenue = 0;
    
        ordersSnap.docs.forEach((doc) => {
          totalRevenue +=
            doc.data().totalAmount || 0;
        });
    
        setRevenue(totalRevenue);
      };
    
      fetchStats();
    }, []);


    const fetchOrders = async () => {
      const snapshot = await getDocs(collection(db, "orders"));
  
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setOrders(data);
    };
    
    const fetchDeliveryPartners = async () => {
      const snap = await getDocs(
        collection(db, "deliveryPartners")
      );
    
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    
      setDeliveryPartners(data);
    };

    const assignDelivery = async (
      orderId: string,
      deliveryId: string
    ) => {
      await updateDoc(
        doc(db, "orders", orderId),
        {
          deliveryPartnerId: deliveryId,
          status: "Out for Delivery",
        }
      );

      fetchOrders();
    };
  
    const updateStatus = async (
      
      orderId: string,
      status: string
    ) => {
      try {
      await updateDoc(
        doc(db, "orders", orderId),
        {
          status,
        }
      );


      const order = orders.find(
        (o) => o.id === orderId
      );
      console.log("Order Found:", order);

      if (!order) {
        alert("Order not found");
        return;
      }
      
      await addDoc(
        collection(db, "notifications"),
        {
          userId: order.userId,
          title: "Order Update",
          message: `Your order is now ${status}`,
          createdAt: serverTimestamp(),
          read: false,
        }
      );

      console.log("Notification Added");
    
    // refresh orders after updating status
    await fetchOrders();
  } catch (error){
    console.error("Notification Error:",error);
  }
  };

  

  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Admin Dashboard" back={false} />
      <div className="px-4 pt-3 pb-6 space-y-4">
        <div className="rounded-2xl p-4 text-white shadow-[var(--shadow-glow)]" style={{ background: "linear-gradient(135deg, oklch(0.3 0.05 270), oklch(0.45 0.12 280))" }}>
          <div className="text-[11px] uppercase opacity-80 font-bold flex items-center gap-1.5"><IndianRupee className="h-3.5 w-3.5" /> Today's GMV</div>
          <div className="text-3xl font-extrabold mt-1">₹4,82,340</div>
          <div className="text-xs flex items-center gap-1 opacity-90"><TrendingUp className="h-3 w-3" /> +14.2% vs yesterday</div>
        </div>

        <div className="grid grid-cols-2 gap-3">

          {[
            { i: Users, t: "Users", v: usersCount, c: "Registered" },
            { i: ChefHat, t: "Home Chefs", v: chefsCount, c: "Active" },
            { i: Store, t: "Restaurants", v: 0, c: "Active" },
            { i: Package, t: "Orders", v: ordersCount, c: "Total" },

            { i: IndianRupee, t: "Revenue", v: `₹${revenue}`, c: "Lifetime" },
  
          ].map((s) => {
            const Icon = s.i;
            return (
              <Link key={s.t} to="/admin" className="rounded-2xl bg-card border border-border p-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-4.5 w-4.5" /></div>
                <div className="mt-2 text-[11px] font-semibold uppercase text-muted-foreground">{s.t}</div>
                <div className="text-xl font-extrabold">{s.v}</div>
                <div className="text-[11px] text-success font-semibold">{s.c}</div>
              </Link>
            );
          })}
        </div>

        <section>
          <h3 className="text-sm font-bold mb-2">Revenue last 7 days</h3>
          <div className="rounded-2xl bg-card border border-border p-4">
            <div className="flex h-28 items-end justify-between gap-2">
              {[55, 72, 60, 88, 65, 95, 78].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-md" style={{ height: `${v}%`, background: i === 5 ? "var(--primary)" : "oklch(0.78 0.18 55)" }} />
                  <span className="text-[10px] text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold mb-2">Pending approvals</h3>
          <div className="space-y-2">
            {[
              { n: "Meera Singh", t: "Home Chef · KYC pending", c: "bg-warning text-warning-foreground" },
              { n: "Spice Garden", t: "Restaurant · New listing", c: "bg-primary text-primary-foreground" },
              { n: "Karan B.", t: "Delivery Partner · Vehicle docs", c: "bg-success text-success-foreground" },
            ].map((x) => (
              <div key={x.n} className="flex items-center gap-3 rounded-xl bg-card border border-border p-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs">{x.n.split(" ").map(s => s[0]).join("")}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{x.n}</div>
                  <div className="text-[11px] text-muted-foreground">{x.t}</div>
                </div>
                <button className={`rounded-full px-3 py-1 text-[11px] font-bold ${x.c}`}>REVIEW</button>
              </div>
            ))}
          </div>
        </section>

        <section>
  <h3 className="text-sm font-bold mb-2">
    Live Orders
  </h3>


  <div className="space-y-3">
    {orders.map((order) => (
      <div
        key={order.id}
        className="rounded-xl bg-card border border-border p-3"
      >
        <div className="font-semibold">
          {order.items?.[0]?.name}
        </div>

        <div className="text-xs text-muted-foreground">
          ₹{order.totalAmount}
        </div>

        <div className="text-xs font-bold mt-1">
          Status: {order.status}
        </div>

        <select
  className="border rounded p-1 text-xs mt-2"
  onChange={(e) =>
    assignDelivery(order.id, e.target.value)
  }
>
  <option value="">
    Assign Delivery Partner
  </option>

  {deliveryPartners.map((dp) => (
    <option
      key={dp.id}
      value={dp.id}
    >
      {dp.name}
    </option>
  ))}
</select>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() =>
              updateStatus(order.id, "Preparing")
            }
            className="px-3 py-1 rounded bg-yellow-500 text-white text-xs"
          >
            Preparing
          </button>

          <button
            onClick={() =>
              updateStatus(order.id, "Out for Delivery")
            }
            className="px-3 py-1 rounded bg-blue-500 text-white text-xs"
          >
            Dispatch
          </button>

          <button
            onClick={() =>
              updateStatus(order.id, "Delivered")
            }
            className="px-3 py-1 rounded bg-green-600 text-white text-xs"
          >
            Delivered
          </button>
        </div>
      </div>
    ))}
  </div>
</section>


<section className="grid grid-cols-2 gap-3">

<Link
  to="/admin-users"
  className="h-12 rounded-xl bg-card border border-border text-sm font-semibold flex items-center justify-center"
>
  Manage Users
</Link>

  <Link
    to="/admin-orders"
    className="h-12 rounded-xl bg-card border border-border text-sm font-semibold flex items-center justify-center"
  >
    Manage Orders
  </Link>
  
  <Link
  to="/admin-chefs"
  className="h-12 rounded-xl bg-card border border-border text-sm font-semibold flex items-center justify-center"
>
  Manage Chefs
</Link>

<Link
  to="/admin-restaurants"
  className="h-12 rounded-xl bg-card border border-border text-sm font-semibold flex items-center justify-center"
>
  Manage Restaurants
</Link>

  <Link
  to="/admin-reports"
  className="h-12 rounded-xl bg-card border border-border text-sm font-semibold flex items-center justify-center"
>
  Revenue Reports
</Link>

<Link
  to="/admin-coupons"
  className="h-12 rounded-xl bg-card border border-border text-sm font-semibold flex items-center justify-center"
>
  Coupons
</Link>

<Link
  to="/admin-settings"
  className="h-12 rounded-xl bg-card border border-border text-sm font-semibold flex items-center justify-center"
>
  Settings
</Link>

</section>
      </div>
    </div>
  );
}
