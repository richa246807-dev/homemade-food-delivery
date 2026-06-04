import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <div className="px-6 pt-10 pb-6 text-center">
        <img src={logo} alt="" className="mx-auto h-16 w-16" />
        <h1 className="mt-2 text-2xl font-bold">Create Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join 50,000+ home food lovers</p>
      </div>
      <div className="flex-1 px-6 space-y-3">
        {["Full Name", "Email Address", "Phone Number", "Password", "Confirm Password"].map((p, i) => (
          <input
            key={p}
            placeholder={p}
            defaultValue={i === 0 ? "Rahul Kumar" : i === 2 ? "+91 98765 43210" : ""}
            className="h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none focus:border-primary"
          />
        ))}
        <label className="flex items-start gap-2 pt-1 text-xs text-muted-foreground">
          <input type="checkbox" defaultChecked className="mt-0.5 accent-[var(--primary)]" />
          I agree to Terms & Privacy Policy
        </label>
        <Link to="/otp" className="mt-2 flex h-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)]">
          Send OTP
        </Link>
        <p className="pt-2 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-semibold text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
}
