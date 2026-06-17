import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/admin-orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const snapshot = await getDocs(
      collection(db, "orders")
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    orderId: string,
    status: string
  ) => {
    await updateDoc(
      doc(db, "orders", orderId),
      {
        status,
      }
    );

    fetchOrders();
  };

  return (
    <div className="phone-frame p-4">
      <h1 className="text-xl font-bold mb-4">
        Manage Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded p-3 mb-3"
        >
          <div className="font-semibold">
            {order.items?.[0]?.name}
          </div>

          <div>
            ₹{order.totalAmount}
          </div>

          <div>
            Status: {order.status}
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
  <button
    onClick={() =>
      updateStatus(
        order.id,
        "Pending"
      )
    }
    className="px-3 py-1 rounded bg-gray-500 text-white"
  >
    Pending
  </button>

  <button
    onClick={() =>
      updateStatus(
        order.id,
        "Preparing"
      )
    }
    className="px-3 py-1 rounded bg-yellow-500 text-white"
  >
    Preparing
  </button>

  <button
    onClick={() =>
      updateStatus(
        order.id,
        "Out for Delivery"
      )
    }
    className="px-3 py-1 rounded bg-blue-500 text-white"
  >
    Dispatch
  </button>

  <button
    onClick={() =>
      updateStatus(
        order.id,
        "Delivered"
      )
    }
    className="px-3 py-1 rounded bg-green-600 text-white"
  >
    Delivered
  </button>
</div>

        </div>
      ))}
    </div>
  );
}