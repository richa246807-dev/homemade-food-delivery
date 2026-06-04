import { createFileRoute, useParams } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { TopBar } from "@/components/TopBar";
import { DishCard } from "@/components/DishCard";
import { categories, dishes } from "@/lib/data";

export const Route = createFileRoute("/category/$slug")({ component: Category });

function Category() {
  const { slug } = useParams({ from: "/category/$slug" });
  const cat = categories.find((c) => c.slug === slug);
  const list = dishes.filter((d) =>
    slug === "homemade" || slug === "healthy" || slug === "tiffin" || slug === "festival"
      ? true
      : d.category.toLowerCase() === slug
  );
  return (
    <PhoneShell>
      <TopBar title={`${cat?.emoji ?? ""} ${cat?.name ?? "Category"}`} />
      <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto scroll-x">
        {["Popular", "Veg only", "Under ₹150", "Healthy", "< 30 min"].map((f, i) => (
          <button key={f} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>{f}</button>
        ))}
      </div>
      <p className="px-4 pt-2 text-xs text-muted-foreground">{list.length} dishes from local home kitchens</p>
      <div className="grid grid-cols-2 gap-3 px-4 pt-3 pb-6">
        {(list.length ? list : dishes).map((d) => <DishCard key={d.id} dish={d} />)}
      </div>
    </PhoneShell>
  );
}
