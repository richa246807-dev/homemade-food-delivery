import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute(
  "/chef-dashboard/reviews"
)({
  component: ReviewsPage,
});

function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const snapshot = await getDocs(
        collection(db, "reviews")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(data);
    };

    fetchReviews();
  }, []);

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, r) => sum + r.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Customer Reviews" />

      <div className="p-4">
        <div className="rounded-xl border p-4 mb-4">
          <div className="text-2xl font-bold">
            ⭐ {avgRating}
          </div>
          <div>
            {reviews.length} Reviews
          </div>
        </div>

        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border p-3 mb-3"
          >
            <div className="font-bold">
              ⭐ {review.rating}/5
            </div>

            <div className="mt-2">
              {review.review}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}