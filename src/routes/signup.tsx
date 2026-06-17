import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import logo from "@/assets/logo.png";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useNavigate } from "@tanstack/react-router";
// Initialize Firebase - configure with your Firebase project credentials


export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

//  useEffect(() => {
//    const unsubscribe = onAuthStateChanged(auth, (user) => {
//     if (user && window.location.pathname === "/signup") {
//        navigate({ to: "/" });
//      }
//    });
//  
//    return () => unsubscribe();
//  }, [navigate]);
//
  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    console.log("AUTH SUCCESS");

    const user = userCredential.user;

    console.log("About to save user:", user.uid);
    
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      phone: phone,
      role: "role",
      rewardCoins: 0,
      createdAt: serverTimestamp(),
    });

    if (role === "chef") {
      await setDoc(
        doc(db, "chefs", user.uid),
        {
          uid: user.uid,
          name: name,
          kitchenName: name + "'s Kitchen",
          speciality: "Homemade Food",
          avatar: "",
          rating: 4.5,
          orders: 0,
          badge: "New Chef",
          createdAt: serverTimestamp(),
        }
      );
    }
    console.log("FIRESTORE SUCCESS");
    
    alert("Account Created Successfully!");
    navigate({ to: "/" });
    } catch (error: any) {
      console.error("FULL ERROR:", error);
      console.error("ERROR CODE:",error.code);
      console.error("ERROR MESSAGE:",error.message);
      alert(error.code + " : " + error.message);
    }
  };
  return (
    <div className="phone-frame flex flex-col bg-background">
      <div className="px-6 pt-10 pb-6 text-center">
        <img src={logo} alt="" className="mx-auto h-16 w-16" />
        <h1 className="mt-2 text-2xl font-bold">Create Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join 50,000+ home food lovers</p>
      </div>
      <div className="flex-1 px-6 space-y-3">
        <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-12 w-full rounded-xl border border-input bg-card px-4"
      />
      
      <input
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 w-full rounded-xl border border-input bg-card px-4"
      />
      
      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="h-12 w-full rounded-xl border border-input bg-card px-4"
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-12 w-full rounded-xl border border-input bg-card px-4"
      />
      
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="h-12 w-full rounded-xl border border-input bg-card px-4"
      />
      <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="h-12 w-full rounded-xl border border-input bg-card px-4"
>
  <option value="customer">
    Customer
  </option>
  <option value="chef">
    Chef
  </option>
</select>
        <label className="flex items-start gap-2 pt-1 text-xs text-muted-foreground">
          <input type="checkbox" defaultChecked className="mt-0.5 accent-[var(--primary)]" />
          I agree to Terms & Privacy Policy
        </label>
        <button
  onClick={handleSignup}
  className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold"
>
  Create Account
</button>
    
    
        <p className="pt-2 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-semibold text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
}
