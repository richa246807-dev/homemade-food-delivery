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
export const Route = createFileRoute("/admin-users")({
  component: AdminUsers,
});

function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        const snap = await getDocs(
          collection(db, "users")
        );
      
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      
        setUsers(data);
      };
      
      useEffect(() => {
        fetchUsers();
      }, []);

      const disableUser = async (
        userId: string
      ) => {
        await updateDoc(
          doc(db, "users", userId),
          {
            isActive: false,
          }
        );
      
        fetchUsers();
      };

      const deleteUser = async (
        userId: string
      ) => {
        await deleteDoc(
          doc(db, "users", userId)
        );
      
        fetchUsers();
      };

      
  return ( 
    <section>
    <h3 className="text-sm font-bold mb-2">
      Manage Users
    </h3>
  
  
    <div className="space-y-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="rounded-xl bg-card border border-border p-3"
        >
          <div className="font-semibold">
            {user.name}
          </div>
  
  
          <div className="text-xs">
            {user.email}
          </div>
  
  
          <div className="text-xs mt-1">
            Role: {user.role}
          </div>
  
  
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => disableUser(user.id)}
              className="px-3 py-1 rounded bg-gray-600 text-white text-xs"
            >
              Disable
            </button>
  
  
            <button
              onClick={() => deleteUser(user.id)}
              className="px-3 py-1 rounded bg-red-600 text-white text-xs"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
  );
}