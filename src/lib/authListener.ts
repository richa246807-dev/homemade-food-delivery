import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * This function listens to Firebase login/logout state
 * and returns user in real-time
 */
export const listenAuth = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};