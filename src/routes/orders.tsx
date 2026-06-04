import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { TopBar } from "@/components/TopBar";
import { dishes } from "@/lib/data";

export const Route = createFileRoute("/orders")({ component: Orders });

const orders = [
  { id: "GKK238417", status: "On the way", dish: dishes[0], date: "Today, 2:15 PM", price: 178, color: "text-primary" },
  { id: "GKK238321", status: "Delivered", dish: dishes[2], date: "Yesterday, 8:30 PM", price: 258, color: "text-success" },
  { id: "GKK238210", status: "Delivered", dish: dishes[1], date: "12 Oct, 9:00 AM", price: 89, color: "text-success" },
  { id: "GKK237998", status: "Delivered", dish: dishes[3], date: "10 Oct, 8:30 AM", price: 148, color: "text-success" },
];

function Orders() {
  return (
    <PhoneShell>
      <TopBar title="Your Orders" back={false} />
      <div className="px-4 pt-3 space-y-3 pb-6">
        {orders.map((o) => (
          <Link key={o.id} to={o.status === "On the way" ? "/tracking" : "/reviews"} className="block rounded-2xl bg-card p-3 shadow-[var(--shadow-card)]">
            <div className="flex gap-3">
              <img src={o.dish.img} alt="" className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold leading-tight">{o.dish.name}</h3>
                  <span className={`text-[11px] font-bold ${o.color}`}>{o.status}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{o.dish.chef}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{o.date} · #{o.id}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-sm">₹{o.price}</span>
                  {o.status === "Delivered" ? (
                    <span className="text-xs text-primary font-semibold">Rate & Reorder →</span>
                  ) : (
                    <span className="text-xs text-primary font-semibold">Track Order →</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PhoneShell>
  );
}
