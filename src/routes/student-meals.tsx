import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { GraduationCap, Check } from "lucide-react";
import { dishes } from "@/lib/data";

export const Route = createFileRoute("/student-meals")({ component: Student });

function Student() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <TopBar title="Student Meal Plans" />
      <div className="m-4 rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, oklch(0.55 0.18 265), oklch(0.7 0.16 285))" }}>
        <GraduationCap className="h-8 w-8" />
        <h2 className="mt-2 text-2xl font-bold leading-tight">Ghar jaisa khaana,<br />student-budget mein</h2>
        <p className="mt-2 text-sm opacity-90">Flat 20% off on all home-cooked meals · Free delivery to hostels</p>
        <button className="mt-3 rounded-full bg-white text-[oklch(0.55_0.18_265)] px-4 py-2 text-xs font-bold">Verify with student ID</button>
      </div>

      <div className="px-4 space-y-3 pb-6">
        {[
          { d: "Lunch Only Plan", p: 1199, sub: "30 days · ₹40/meal", c: "oklch(0.68 0.21 39)" },
          { d: "Lunch + Dinner Plan", p: 2299, sub: "30 days · 60 meals", c: "oklch(0.62 0.17 145)" },
          { d: "Weekend Cravings", p: 599, sub: "Only Sat & Sun", c: "oklch(0.55 0.18 265)" },
        ].map((x) => (
          <Link key={x.d} to="/checkout" className="block rounded-2xl bg-card border border-border p-4 shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold">{x.d}</h3>
                <p className="text-[11px] text-muted-foreground">{x.sub}</p>
              </div>
              <span className="text-lg font-extrabold" style={{ color: x.c }}>₹{x.p}</span>
            </div>
            <div className="mt-2 flex gap-2">
              {dishes.slice(0, 4).map((d) => (
                <img key={d.id} src={d.img} alt="" className="h-12 w-12 rounded-lg object-cover" />
              ))}
            </div>
          </Link>
        ))}

        <div className="rounded-2xl bg-success/10 border border-success/30 p-3 text-sm space-y-2">
          {["No cooking, no Maggi for the 5th time", "Mom-style home food", "Pause during exams", "Pay weekly"].map((x) => (
            <div key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{x}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
