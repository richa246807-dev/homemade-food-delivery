import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TopBar } from "@/components/TopBar";
import { Camera } from "lucide-react";
import { auth } from "@/lib/firebase";

export const Route = createFileRoute("/add-item")({
    component: AddItem,
  });

  function AddItem() {
    const navigate = useNavigate();
  
    const [dishName, setDishName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const handleImageUpload = async (e: any) => {
      const file = e.target.files[0];
    
      if (!file) return;
    
      const formData = new FormData();
    
      formData.append("file", file);
      formData.append(
        "upload_preset",
        "Dish-images"
      );
    
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqnkdh2ku/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
    
      const data = await res.json();
    
      setImageUrl(data.secure_url);
    
      alert("Image Uploaded Successfully");
    }; 


    const handlePublish = async () => {
      try {
        if (!dishName || !price) {
          alert("Please enter Dish Name and Price");
          return;
        }
  
        await addDoc(collection(db, "dishes"), {
          name: dishName,
          price: Number(price),
          description: description,
          imageUrl,
          chefId: auth.currentUser?.uid,
          
          rating: 4.5,
          chefName: "Priya's Kitchen",
          available: true,
          createdAt: new Date(),
        });
  
        alert("Dish Added Successfully!");
  
        navigate({ to: "/chef-dashboard" });
      } catch (error) {
        console.error(error);
        alert("Failed to add dish");
      }
    };

    return (
        <div className="phone-frame flex flex-col bg-background">
          <TopBar title="Add Food Item" />
    
          <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 space-y-4">
    
          <div className="aspect-[16/10] rounded-2xl border-2 border-dashed border-border bg-card flex items-center justify-center overflow-hidden">
  {imageUrl ? (
    <img
      src={imageUrl}
      alt="Dish"
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex flex-col items-center text-muted-foreground">
      <label className="aspect-[16/10] rounded-2xl border-2 border-dashed border-border bg-card flex flex-col items-center justify-center cursor-pointer">
      <Camera className="h-8 w-8" />
      <span className="mt-2 text-sm font-semibold">
        Upload Food Photo
      </span>
      <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
  />
  </label>
    </div>
  )}
</div>

            <div>
              <label className="text-xs font-bold uppercase">
                Dish Name
              </label>
    
              <input
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="Paneer Tikka"
                className="mt-1 h-11 w-full rounded-xl border px-3"
              />
            </div>
    
            <div>
              <label className="text-xs font-bold uppercase">
                Price
              </label>
    
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="199"
                className="mt-1 h-11 w-full rounded-xl border px-3"
              />
            </div>
    
            <div>
              <label className="text-xs font-bold uppercase">
                Description
              </label>
              const [imageUrl, setImageUrl] = useState("");
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Fresh homemade paneer tikka"
                className="mt-1 w-full h-24 rounded-xl border p-3"
              />
            </div>
    
          </div>
    
          <div className="border-t p-4">
            <button
              onClick={handlePublish}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold"
            >
              Publish to Menu
            </button>
          </div>
        </div>
      );
    }