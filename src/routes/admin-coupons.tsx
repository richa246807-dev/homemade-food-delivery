import { createFileRoute } from "@tanstack/react-router";
import {
    collection,
    addDoc,
    getDocs,
  } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/admin-coupons")({
  component: AdminCoupons,
});

function AdminCoupons() {
    const [code, setCode] = useState("");
const [discount, setDiscount] = useState("");
const [coupons, setCoupons] = useState<any[]>([]);

const addCoupon = async () => {
    await addDoc(
      collection(db, "coupons"),
      {
        code,
        discount: Number(discount),
        active: true,
      }
    );
  
    alert("Coupon Added");
  
    setCode("");
    setDiscount("");
  
    fetchCoupons();
  };

  const fetchCoupons = async () => {
    const snap = await getDocs(
      collection(db, "coupons")
    );
  
    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    setCoupons(data);
  };
  
  useEffect(() => {
    fetchCoupons();
  }, []);


      return (
        <div className="phone-frame p-4">
          <h1 className="text-xl font-bold mb-4">
            Coupon Management
          </h1>
      
          <input
            placeholder="Coupon Code"
            value={code}
            onChange={(e) =>
              setCode(e.target.value)
            }
            className="w-full border p-3 rounded mb-2"
          />
      
          <input
            placeholder="Discount Amount"
            value={discount}
            onChange={(e) =>
              setDiscount(e.target.value)
            }
            className="w-full border p-3 rounded mb-2"
          />
      
          <button
            onClick={addCoupon}
            className="w-full bg-primary text-white p-3 rounded"
          >
            Add Coupon
          </button>
      
          <div className="mt-5 space-y-2">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="border rounded p-3"
              >
                <div className="font-bold">
                  {coupon.code}
                </div>
      
                <div>
                  ₹{coupon.discount}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  
}
