import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/admin-restaurants")({
  component: AdminRestaurants,
});

function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  const fetchRestaurants = async () => {
    const snap = await getDocs(
      collection(db, "restaurants")
    );

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setRestaurants(data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const updateRestaurantStatus = async (
    restaurantId: string,
    status: string
  ) => {
    await updateDoc(
      doc(db, "restaurants", restaurantId),
      { status }
    );

    fetchRestaurants();
  };

  const deleteRestaurant = async (
    restaurantId: string
  ) => {
    await deleteDoc(
      doc(db, "restaurants", restaurantId)
    );

    fetchRestaurants();
  };

  return (
    <div className="phone-frame p-4">
      <h1 className="text-xl font-bold mb-4">
        Manage Restaurants
      </h1>

      <div className="text-red-500 mb-3">
        Total Restaurants: {restaurants.length}
      </div>

      <div className="space-y-3">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="rounded-xl border p-3"
          >
            <div className="font-semibold">
              {restaurant.name}
            </div>

            <div className="text-xs">
              {restaurant.email}
            </div>

            <div className="text-xs mt-1">
              Status: {restaurant.status}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() =>
                  updateRestaurantStatus(
                    restaurant.id,
                    "approved"
                  )
                }
                className="px-3 py-1 rounded bg-green-600 text-white text-xs"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateRestaurantStatus(
                    restaurant.id,
                    "rejected"
                  )
                }
                className="px-3 py-1 rounded bg-red-600 text-white text-xs"
              >
                Reject
              </button>

              <button
                onClick={() =>
                  deleteRestaurant(
                    restaurant.id
                  )
                }
                className="px-3 py-1 rounded bg-gray-700 text-white text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}