import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { TopBar } from "@/components/TopBar";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";


export const Route = createFileRoute("/notification")({
  component: Notifications,
});

function Notifications() {

  const [notifications, setNotifications] =
  useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {

      const user = auth.currentUser;

      if (!user) {
        console.log("No user logged in");
        return;
      }

      const q = query(
        collection(db, "notifications"),
        where(
          "userId",
          "==",
          auth.currentUser?.uid
        )
      );
  
      const snap = await getDocs(q);
  
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setNotifications(data);
    };
  
    fetchNotifications();
  }, []);
console.log("Current User:", auth.currentUser);


  return (
    <PhoneShell>
      <TopBar title="Notifications" />

      <div className="p-4 space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="rounded-2xl bg-card border border-border p-4"
          >
            <div className="flex gap-3">
              <div className="text-2xl">{n.icon}</div>
              <div>
                <h3 className="font-semibold">{n.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {n.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}