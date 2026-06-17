import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { LogOut, Settings } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // 🔥 Firebase logout
      navigate({ to: "/login" }); // redirect after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Settings size={22} />
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Account</h2>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}