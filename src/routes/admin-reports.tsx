import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/admin-reports")({
  component: AdminReports,
});

function AdminReports() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    const fetchReports = async () => {
      const ordersSnap = await getDocs(
        collection(db, "orders")
      );

      let revenue = 0;
      let delivered = 0;
      let pending = 0;

      ordersSnap.docs.forEach((doc) => {
        const order = doc.data();

        revenue += order.totalAmount || 0;

        if (order.status === "Delivered") {
          delivered++;
        }

        if (order.status === "Pending") {
          pending++;
        }
      });

      setTotalRevenue(revenue);
      setTotalOrders(ordersSnap.size);
      setDeliveredOrders(delivered);
      setPendingOrders(pending);
    };

    fetchReports();
  }, []);

  return (
    <div className="phone-frame p-4">
      <h1 className="text-2xl font-bold mb-4">
        Revenue Reports
      </h1>

      <div className="grid grid-cols-2 gap-3">

        <div className="rounded-xl border p-4">
          <div className="text-xs text-muted-foreground">
            Total Revenue
          </div>
          <div className="text-2xl font-bold">
            ₹{totalRevenue}
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="text-xs text-muted-foreground">
            Total Orders
          </div>
          <div className="text-2xl font-bold">
            {totalOrders}
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="text-xs text-muted-foreground">
            Delivered Orders
          </div>
          <div className="text-2xl font-bold text-green-600">
            {deliveredOrders}
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="text-xs text-muted-foreground">
            Pending Orders
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {pendingOrders}
          </div>
        </div>

      </div>
    </div>
  );
}