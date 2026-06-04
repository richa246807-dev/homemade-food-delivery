import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/otp")({ component: Otp });

function Otp() {
  const [vals, setVals] = useState(["9", "8", "7", "", "", ""]);
  return (
    <div className="phone-frame flex flex-col bg-background">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold">Verify your number</h1>
        <p className="mt-2 text-sm text-muted-foreground">We sent a 6-digit code to <span className="font-semibold text-foreground">+91 98765 43210</span></p>
      </div>
      <div className="flex-1 px-6">
        <div className="flex justify-between gap-2">
          {vals.map((v, i) => (
            <input
              key={i}
              value={v}
              onChange={(e) => {
                const n = [...vals]; n[i] = e.target.value.slice(-1); setVals(n);
              }}
              className="h-14 w-12 rounded-xl border-2 border-input bg-card text-center text-xl font-bold outline-none focus:border-primary"
              maxLength={1}
            />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Didn't receive? <button className="font-semibold text-primary">Resend in 0:24</button>
        </p>
        <Link to="/" className="mt-8 flex h-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)]">
          Verify & Continue
        </Link>
      </div>
    </div>
  );
}
