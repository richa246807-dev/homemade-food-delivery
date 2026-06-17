import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
export const Route = createFileRoute("/login")({ component: Login });
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) return;
  
        const userDoc = await getDoc(
          doc(db, "users", user.uid)
        );
  
        const userData = userDoc.data();
  
        if (userData?.role === "admin") {
          navigate({ to: "/admin" });
        } else if (userData?.role === "chef"){
          navigate({ to: "/chef-dashboard" });
        } else {
          navigate({ to: "/"});
        }
      }
    );
  
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
  try {
    const userCredential =
  await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

const user = userCredential.user;

const userDoc = await getDoc(
  doc(db, "users", user.uid)
);

const userData = userDoc.data();

alert("Login Successful!");

if (userData?.role === "admin") {
  navigate({ to: "/admin" });
} else if (userData?.role === "chef") {
  navigate({ to: "/chef-dashboard" });
} else {
  navigate({ to: "/" });
}
  } catch (error: any) {
    alert(error.message);
  }
};
  return (
    <div className="phone-frame flex flex-col bg-background">
      <div className="px-6 pt-12 pb-8 text-center">
        <img src={logo} alt="" className="mx-auto h-20 w-20" />
        <h1 className="mt-3 text-2xl font-bold">Welcome Back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to order homemade goodness</p>
      </div>
      <div className="flex-1 px-6 space-y-4">
      <Field
  icon={<Mail className="h-4 w-4" />}
  placeholder="Email"
  value={email}
  onChange={(e: any) => setEmail(e.target.value)}
/>

<Field
  icon={<Lock className="h-4 w-4" />}
  placeholder="Password"
  type="password"
  value={password}
  onChange={(e: any) => setPassword(e.target.value)}
/>
        <Link to="/otp" className="block text-right text-xs text-primary font-semibold">Forgot password?</Link>
        <button
  onClick={handleLogin}
  className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)]"
>
  Login
</button>

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
