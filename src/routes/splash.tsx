import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/splash")({ component: Splash });

function Splash() {
  const nav = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => nav({ to: "/login" }), 2200);
    return () => clearTimeout(t);
  }, [nav]);
  return (
    <div className="phone-frame flex flex-col items-center justify-center" style={{ background: "var(--gradient-warm)" }}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="pulse-ring rounded-full bg-white p-4">
          <img src={logo} alt="GharKaKhana" className="h-28 w-28 object-contain" />
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">GharKaKhana</h1>
        <p className="text-white/90 text-sm font-medium">Ghar Jaisa Khaana, Har Roz 🏡</p>
      </div>
      <Link to="/login" className="absolute bottom-10 text-xs text-white/80 underline">Skip</Link>
    </div>
  );
}
