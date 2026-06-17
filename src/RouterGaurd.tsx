import { useEffect } from "react";
import { RouterProvider, useNavigate } from "@tanstack/react-router";
import { getRouter } from "./router"; // or getRouter()
import { listenAuth } from "@/lib/authListener";

export default function RouterGuard() {
    const router = getRouter();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = listenAuth((user) => {
      if (!user) {
        navigate({ to: "/login" });
      }
    });

    return () => unsub();
  }, []);

  return <RouterProvider router={router} />;
}