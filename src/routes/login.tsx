import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <div className="phone-frame flex flex-col bg-background">
      <div className="px-6 pt-12 pb-8 text-center">
        <img src={logo} alt="" className="mx-auto h-20 w-20" />
        <h1 className="mt-3 text-2xl font-bold">Welcome Back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to order homemade goodness</p>
      </div>
      <div className="flex-1 px-6 space-y-4">
        <Field icon={<Mail className="h-4 w-4" />} placeholder="Email or Phone" defaultValue="rahul@gmail.com" />
        <Field icon={<Lock className="h-4 w-4" />} placeholder="Password" type="password" defaultValue="••••••••" />
        <Link to="/otp" className="block text-right text-xs text-primary font-semibold">Forgot password?</Link>
        <Link to="/otp" className="mt-2 flex h-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)]">
          Login
        </Link>

        <div className="flex items-center gap-3 py-2 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or continue with <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="h-11 rounded-xl border border-border bg-card text-sm font-medium">Google</button>
          <button className="h-11 rounded-xl border border-border bg-card text-sm font-medium">Phone</button>
        </div>

        <p className="pt-4 text-center text-sm text-muted-foreground">
          New here? <Link to="/signup" className="font-semibold text-primary">Create account</Link>
        </p>
        <p className="text-center text-[11px] text-muted-foreground">
          Are you a chef or delivery partner? <Link to="/role" className="text-primary font-semibold">Switch role</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ icon, ...p }: any) {
  return (
    <label className="flex h-12 items-center gap-3 rounded-xl border border-input bg-card px-4">
      <span className="text-muted-foreground">{icon}</span>
      <input {...p} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </label>
  );
}
