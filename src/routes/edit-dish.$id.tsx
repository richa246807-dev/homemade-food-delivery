import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/edit-dish/$id")({
  component: EditDish,
});

function EditDish() {
  const { id } = Route.useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDish = async () => {
      const snap = await getDoc(
        doc(db, "dishes", id)
      );
  
      if (snap.exists()) {
        const data = snap.data();
  
        setName(data.name || "");
        setPrice(String(data.price || ""));
        setDescription(data.description || "");
      }
    };
  
    fetchDish();
  }, [id]);

  

  const handleUpdate = async () => {
    
    try {
    
      await updateDoc(doc(db, "dishes", id), {
        name,
        price: Number(price),
        description,
      });
       alert("Dish Updated Successfully");
       navigate({
        to: "/chef-dashboard",
      });
    } catch (error: any) {
      console.error("FULL ERROR:", error);
      alert(
        "Update Failed: " +
        error.message
      );
    }
  };

  return (
    <div className="phone-frame p-4">
      <h1 className="text-xl font-bold mb-4">
       EDIT-DISH
      </h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Dish Name"
        className="w-full border rounded p-2 mb-3"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="w-full border rounded p-2 mb-3"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border rounded p-2 mb-3"
      />

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Update Dish
      </button>
    </div>
  );
}