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
export const Route = createFileRoute("/admin-chefs")({
  component: AdminChefs,
});

function AdminChefs() {
    const [chefs, setChefs] = useState<any[]>([]);
    const fetchChefs = async () => {
        const snap = await getDocs(
          collection(db, "chefs")
        );
      
        
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      
        setChefs(data);
      };
      useEffect(() => {
        fetchChefs();
      }, []);
      const updateChefStatus = async (
        chefId: string,
        status: string
      ) => {
        await updateDoc(
          doc(db, "chefs", chefId),
          { status }
        );
      
        fetchChefs();
      };
      const deleteChef = async (
        chefId: string
      ) => {
        await deleteDoc(
          doc(db, "chefs", chefId)
        );
      
        fetchChefs();
      };

  return (
    <section>
    <h3 className="text-sm font-bold mb-2">
      Chef Approvals
    </h3>
  
  
    <div className="text-red-500">
    Total Chefs: {chefs.length}
  </div>
  
  
    <div className="space-y-3">
      {chefs.map((chef) => (
        <div
          key={chef.id}
          className="rounded-xl bg-card border border-border p-3"
        >
          <div className="font-semibold">
            {chef.name}
          </div>
  
  
          <div className="text-xs">
            {chef.email}
          </div>
  
  
          <div className="text-xs mt-1">
            Status: {chef.status}
          </div>
  
  
          <div className="flex gap-2 mt-3">
            <button
              onClick={() =>
                updateChefStatus(
                  chef.id,
                  "approved"
                )
              }
              className="px-3 py-1 rounded bg-green-600 text-white text-xs"
            >
              Approve
            </button>
            <button
    onClick={async () =>{
      await updateDoc(
        doc(db, "chefs", chef.id),
        {
          isActive: false,
          status: "disabled",
        }
      );
      alert("Chef Account Disabled");
      fetchChefs();
    } }
    className="px-3 py-1 rounded bg-gray-600 text-white text-xs"
  >
    Disable
  </button>
            <button
    onClick={() => deleteChef(chef.id)}
    className="px-3 py-1 rounded bg-red-600 text-white text-xs"
  >
    Delete
  </button>
            <button
              onClick={() =>
                updateChefStatus(
                  chef.id,
                  "rejected"
                )
              }
              className="px-3 py-1 rounded bg-red-600 text-white text-xs"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
  );
}