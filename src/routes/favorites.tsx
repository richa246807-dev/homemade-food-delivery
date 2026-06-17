import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { TopBar } from "@/components/TopBar";
import { dishes, chefs } from "@/lib/data";
import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/favorites")({
  component: Favorites,
});

function Favorites() {
    const favorites = useFavorites((s) => s.favorites);

const favoriteDishes = dishes.filter((dish) =>
  favorites.includes(dish.id)
);
  return (
    <PhoneShell>
      <TopBar title="My Favorites" />

      <div className="p-4">
        <h2 className="mb-3 text-lg font-bold">❤️ Favorite Dishes</h2>

        <div className="space-y-3">
        {favoriteDishes.length === 0 ? (
  <div className="rounded-2xl border border-border p-6 text-center">
    <h3 className="font-semibold">No favorites yet ❤️</h3>
    <p className="mt-1 text-sm text-muted-foreground">
      Tap the heart icon on any dish to add it here.
    </p>
  </div>
) : (
  favoriteDishes.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center gap-3 rounded-2xl bg-card p-3 border border-border"
            >
              <img
                src={dish.img}
                alt={dish.name}
                className="h-16 w-16 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{dish.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {dish.chef}
                </p>
                <p className="text-sm font-bold text-primary">
                  ₹{dish.price}
                </p>
              </div>

              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            </div>
          ))
          )}
        </div>

        <h2 className="mt-6 mb-3 text-lg font-bold">
          👩‍🍳 Favorite Home Chefs
        </h2>

        <div className="space-y-3">
          {chefs.slice(0, 2).map((chef) => (
            <div
              key={chef.id}
              className="flex items-center gap-3 rounded-2xl bg-card p-3 border border-border"
            >
              <img
                src={chef.avatar}
                alt={chef.name}
                className="h-14 w-14 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{chef.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {chef.speciality}
                </p>
              </div>

              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-6 block rounded-xl bg-primary text-center py-3 font-semibold text-primary-foreground"
        >
          Explore More Food
        </Link>
      </div>
    </PhoneShell>
  );
}