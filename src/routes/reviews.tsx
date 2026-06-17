import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Star, Camera } from "lucide-react";
import { useState } from "react";
import { dishes } from "@/lib/data";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export const Route = createFileRoute("/reviews")({ component: Reviews });

function Reviews() {
  const [stars, setStars] = useState(5);
  const [review, setReview] = useState("");
  const dish = dishes[2];

  const submitReview = async () => {
    try {
      await addDoc(
        collection(db, "reviews"),
        {
          userId: auth.currentUser?.uid,
          rating: stars,
          review,
          createdAt: serverTimestamp(),
        }
      );
  
      alert("Review Submitted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    }
  };


  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Rate your order" />
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-center gap-3 rounded-2xl bg-card border border-border p-3">
          <img src={dish.img} alt="" className="h-14 w-14 rounded-lg object-cover" />
          <div className="flex-1 text-sm">
            <div className="font-semibold">{dish.name}</div>
            <div className="text-[11px] text-muted-foreground">by {dish.chef}</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-base font-bold">How was your meal?</h2>
          <div className="mt-3 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setStars(n)}>
                <Star className={`h-10 w-10 transition ${n <= stars ? "fill-warning text-warning" : "text-border"}`} />
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm font-semibold text-primary">{["Bad", "Poor", "Okay", "Good", "Amazing!"][stars - 1]}</p>
        </div>

        <div className="mt-5">
          <h3 className="text-xs font-bold uppercase text-muted-foreground mb-2">What was great?</h3>
          <div className="flex flex-wrap gap-2">
            {["Tasty 🤤", "Hot & Fresh 🔥", "Homemade feel 🏡", "Good portion", "Quick delivery 🚀", "Healthy 🌿"].map((t, i) => (
              <button key={t} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${i < 3 ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-3">
  <h3 className="font-semibold">🛡️ AI Verified Meal</h3>
  <p className="text-xs">Health Score: 92/100</p>
  <p className="text-xs">Oil Usage: Low</p>
  <p className="text-xs">Protein: High</p>
</div>

<textarea
  value={review}
  onChange={(e) => setReview(e.target.value)}
  placeholder="Write a review for the chef…"
  className="mt-4 w-full h-24 rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary resize-none"
/>

      

        <button className="mt-2 flex items-center gap-2 text-xs font-semibold text-primary"><Camera className="h-4 w-4" /> Add a photo</button>
        <div className="mt-4 rounded-xl bg-warning/10 border border-warning/30 p-3 text-center">
  💰 Earn 5 GharCoins for submitting a review
</div>

<button 
  onClick={submitReview}
  className="mt-6 h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
  Submit Review
</button>
        
      </div>
    </div>
  );
}
