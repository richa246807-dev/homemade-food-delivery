import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/admin-settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const [commission, setCommission] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportPhone, setSupportPhone] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      const snap = await getDoc(
        doc(db, "settings", "app")
      );

      if (snap.exists()) {
        const data = snap.data();

        setCommission(data.commission || "");
        setDeliveryCharge(data.deliveryCharge || "");
        setSupportEmail(data.supportEmail || "");
        setSupportPhone(data.supportPhone || "");
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    await setDoc(
      doc(db, "settings", "app"),
      {
        commission,
        deliveryCharge,
        supportEmail,
        supportPhone,
      }
    );

    alert("Settings Saved");
  };

  return (
    <div className="phone-frame p-4">
      <h1 className="text-2xl font-bold mb-4">
        Settings
      </h1>

      <div className="space-y-3">
        <input
          placeholder="Commission %"
          value={commission}
          onChange={(e) =>
            setCommission(e.target.value)
          }
          className="w-full border rounded p-3"
        />

        <input
          placeholder="Delivery Charge"
          value={deliveryCharge}
          onChange={(e) =>
            setDeliveryCharge(e.target.value)
          }
          className="w-full border rounded p-3"
        />

        <input
          placeholder="Support Email"
          value={supportEmail}
          onChange={(e) =>
            setSupportEmail(e.target.value)
          }
          className="w-full border rounded p-3"
        />

        <input
          placeholder="Support Phone"
          value={supportPhone}
          onChange={(e) =>
            setSupportPhone(e.target.value)
          }
          className="w-full border rounded p-3"
        />

        <button
          onClick={saveSettings}
          className="w-full bg-primary text-white rounded p-3"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}